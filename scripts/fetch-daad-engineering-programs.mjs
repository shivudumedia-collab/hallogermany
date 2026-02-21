#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const DAAD_API_BASE = "https://api.daad.de";
const DAAD_WEB_BASE = "https://www.daad.de";
const PAGE_SIZE = 100;

const STREAMS = {
  mechanical: {
    terms: [
      "mechanical engineering",
      "mechatronics",
      "automotive engineering",
      "production engineering",
      "manufacturing engineering",
      "materials engineering",
      "industrial engineering",
      "thermal engineering"
    ],
    outputFile: "daad-mechanical-masters.json"
  },
  electrical: {
    terms: [
      "electrical engineering",
      "electronic engineering",
      "power engineering",
      "communication engineering",
      "embedded systems",
      "automation engineering",
      "control engineering",
      "microelectronics"
    ],
    outputFile: "daad-electrical-masters.json"
  },
  civil: {
    terms: [
      "civil engineering",
      "construction engineering",
      "structural engineering",
      "geotechnical engineering",
      "transportation engineering",
      "water engineering",
      "hydraulic engineering",
      "infrastructure engineering"
    ],
    outputFile: "daad-civil-masters.json"
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, retries = 3) {
  let lastError = null;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "hallogermany-daad-crawler/1.0"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await sleep(500 * attempt);
      }
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}

function stripHtml(value) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\\;/g, ";")
    .replace(/\s+/g, " ")
    .trim();
}

function getItemText(item, iconName) {
  const entry = item.items?.find((it) => it.icon === iconName);
  if (!entry) return "";
  if (Array.isArray(entry.text)) {
    return entry.text
      .map((value) => stripHtml(String(value)))
      .map((value) => value.trim())
      .filter(Boolean)
      .join(" | ");
  }
  return stripHtml(String(entry.text || "")).trim();
}

function streamSeparationMatch(stream, title) {
  const value = title.toLowerCase();

  if (stream === "mechanical") {
    const positive =
      /\b(mechanical|mechatronics|automotive|production engineering|manufacturing|thermal|materials engineering|industrial engineering)\b/i;
    const negative = /\b(civil engineering|electrical engineering|computer science|informatics)\b/i;
    return positive.test(value) && !negative.test(value);
  }

  if (stream === "electrical") {
    const positive =
      /\b(electrical|electronic|microelectronic|power engineering|communications engineering|embedded systems|automation engineering|control engineering)\b/i;
    const negative = /\b(civil engineering|mechanical engineering|computer science|informatics)\b/i;
    return positive.test(value) && !negative.test(value);
  }

  const positive =
    /\b(civil engineering|construction engineering|structural engineering|geotechnical|transportation engineering|water engineering|hydraulic engineering|infrastructure)\b/i;
  const negative = /\b(computer science|informatics|electrical engineering|mechanical engineering)\b/i;
  return positive.test(value) && !negative.test(value);
}

async function fetchSearchResults(term) {
  const encodedTerm = encodeURIComponent(term);
  const baseUrl =
    `${DAAD_API_BASE}/api/ajax/hsk/list/en?` +
    `hec-q=${encodedTerm}&hec-degreeType=37&hec-degreeProgrammeType=w&hec-limit=${PAGE_SIZE}`;

  const firstPage = await fetchJson(`${baseUrl}&hec-p=1`);
  const count = Number(firstPage?.results?.count || 0);
  const pages = Math.ceil(count / PAGE_SIZE);
  const items = [...(firstPage?.results?.items || [])];

  for (let page = 2; page <= pages; page += 1) {
    const result = await fetchJson(`${baseUrl}&hec-p=${page}`);
    items.push(...(result?.results?.items || []));
  }

  return { count, pages, items };
}

async function buildStreamDataset(stream) {
  const streamConfig = STREAMS[stream];
  if (!streamConfig) {
    throw new Error(`Unsupported stream: ${stream}`);
  }

  const byId = new Map();

  for (const term of streamConfig.terms) {
    const { count, pages, items } = await fetchSearchResults(term);
    console.log(`[${stream}] term "${term}" -> ${count} results across ${pages} pages`);

    for (const item of items) {
      const id = item.id;
      if (!id) continue;

      const existing = byId.get(id);
      const base = {
        id,
        title: item.headline || "",
        university: item.subline || "",
        degree: getItemText(item, "degree"),
        duration: getItemText(item, "duration"),
        location: getItemText(item, "location"),
        studyMode: getItemText(item, "studyType"),
        deadlines: getItemText(item, "deadline"),
        daadPath: item.link?.url || "",
        daadUrl: item.link?.url ? `${DAAD_WEB_BASE}${item.link.url}` : "",
        termHits: [term]
      };

      if (!existing) {
        byId.set(id, base);
      } else if (!existing.termHits.includes(term)) {
        existing.termHits.push(term);
      }
    }
  }

  const programs = [...byId.values()].filter((program) => streamSeparationMatch(stream, program.title));
  programs.sort((a, b) => {
    const uni = a.university.localeCompare(b.university, "en", { sensitivity: "base" });
    if (uni !== 0) return uni;
    return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
  });

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      source: "DAAD Hochschulkompass via api.daad.de",
      degreeFilter: "Master (hec-degreeType=37, graduate programmes)",
      stream,
      terms: streamConfig.terms,
      totalPrograms: programs.length
    },
    programs
  };
}

async function main() {
  const arg = process.argv[2];
  const streams = arg && arg !== "all" ? [arg] : Object.keys(STREAMS);
  const outputDir = path.join(process.cwd(), "data");
  await fs.mkdir(outputDir, { recursive: true });

  for (const stream of streams) {
    if (!STREAMS[stream]) {
      throw new Error(`Unknown stream "${stream}". Use one of: ${Object.keys(STREAMS).join(", ")}, all`);
    }
    const dataset = await buildStreamDataset(stream);
    const outputPath = path.join(outputDir, STREAMS[stream].outputFile);
    await fs.writeFile(outputPath, JSON.stringify(dataset, null, 2), "utf8");
    console.log(`[${stream}] saved ${dataset.meta.totalPrograms} programs to ${outputPath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
