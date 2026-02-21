#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const DAAD_API_BASE = "https://api.daad.de";
const DAAD_WEB_BASE = "https://www.daad.de";
const PAGE_SIZE = 100;
const DETAIL_CONCURRENCY = 6;

const SEARCH_TERMS = [
  "computer",
  "informatics",
  "software engineering",
  "data science",
  "artificial intelligence",
  "information systems",
  "cyber security",
  "machine learning"
];

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "daad-computer-science-masters.json");

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

function firstHref(html) {
  const match = html.match(/href="([^"]+)"/i);
  return match?.[1] ?? "";
}

function admissionHeadlineValue(blocks, headline) {
  return blocks.find((block) => block?.data?.headline === headline)?.data?.text ?? "";
}

function extractSnippets(text, patterns) {
  const snippets = [];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[0]) {
      snippets.push(match[0].trim());
    }
  }
  return [...new Set(snippets)];
}

function inferEnglishRequirement(admissionPlain, mainLanguage, furtherLanguages) {
  const explicit = extractSnippets(admissionPlain, [
    /IELTS[^.]{0,70}/i,
    /TOEFL[^.]{0,70}/i,
    /Cambridge[^.]{0,70}/i,
    /PTE[^.]{0,70}/i,
    /English[^.]{0,120}/i
  ]);
  if (explicit.length > 0) return explicit.join(" | ");

  const combined = `${mainLanguage} ${furtherLanguages}`.toLowerCase();
  if (combined.includes("english")) {
    return "English required (exact score not specified in DAAD summary).";
  }

  return "Not clearly specified in DAAD summary.";
}

function inferGermanRequirement(admissionPlain, mainLanguage, furtherLanguages) {
  const explicit = extractSnippets(admissionPlain, [
    /TestDaF[^.]{0,70}/i,
    /DSH[^.]{0,70}/i,
    /Goethe[^.]{0,70}/i,
    /telc[^.]{0,70}/i,
    /German[^.]{0,120}/i,
    /Deutsch[^.]{0,120}/i
  ]);
  if (explicit.length > 0) return explicit.join(" | ");

  const combined = `${mainLanguage} ${furtherLanguages}`.toLowerCase();
  if (combined.includes("german")) {
    return "German required/expected (exact level not specified in DAAD summary).";
  }

  return "Not clearly specified in DAAD summary.";
}

function parseDetail(detailJson) {
  const detailModule = detailJson?.page?.sections?.main?.mainContent?.[0]?.modules?.find((mod) => mod.template === "db_detail");
  const detailData = detailModule?.data;
  if (!detailData) {
    return {
      universityUrl: "",
      mainLanguage: "",
      furtherLanguages: "",
      admissionRequirements: "",
      requirementsLink: "",
      englishRequirement: "Not clearly specified in DAAD summary.",
      germanRequirement: "Not clearly specified in DAAD summary."
    };
  }

  const contentBlocks = (detailData.content || []).flatMap((section) => section.blocks || []);
  const admissionRaw = admissionHeadlineValue(contentBlocks, "Admission requirements");
  const mainLanguage = admissionHeadlineValue(contentBlocks, "Main language");
  const furtherLanguages = admissionHeadlineValue(contentBlocks, "Further languages");
  const admissionRequirements = stripHtml(admissionRaw);
  const requirementsLink = firstHref(admissionRaw);
  const universityUrl = detailData.sidebar?.[0]?.data?.link?.url ?? "";

  return {
    universityUrl,
    mainLanguage,
    furtherLanguages,
    admissionRequirements,
    requirementsLink,
    englishRequirement: inferEnglishRequirement(admissionRequirements, mainLanguage, furtherLanguages),
    germanRequirement: inferGermanRequirement(admissionRequirements, mainLanguage, furtherLanguages)
  };
}

async function fetchSearchResults(term) {
  const encoded = encodeURIComponent(term);
  const baseUrl = `${DAAD_API_BASE}/api/ajax/hsk/list/en?hec-q=${encoded}&hec-degreeType=37&hec-degreeProgrammeType=w&hec-limit=${PAGE_SIZE}`;
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

async function buildProgramDataset() {
  const byId = new Map();

  for (const term of SEARCH_TERMS) {
    const { count, pages, items } = await fetchSearchResults(term);
    console.log(`Term "${term}" -> ${count} results across ${pages} pages`);

    for (const item of items) {
      const existing = byId.get(item.id);
      const base = {
        id: item.id,
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
        byId.set(item.id, base);
      } else if (!existing.termHits.includes(term)) {
        existing.termHits.push(term);
      }
    }
  }

  const programs = [...byId.values()];
  console.log(`Unique programs after dedupe: ${programs.length}`);

  let pointer = 0;
  let completed = 0;

  async function worker() {
    while (pointer < programs.length) {
      const current = programs[pointer];
      pointer += 1;

      try {
        if (current.daadPath) {
          const detailJson = await fetchJson(`${DAAD_API_BASE}/api/page${current.daadPath}`);
          const detail = parseDetail(detailJson);
          Object.assign(current, detail);
        } else {
          Object.assign(current, {
            universityUrl: "",
            mainLanguage: "",
            furtherLanguages: "",
            admissionRequirements: "",
            requirementsLink: "",
            englishRequirement: "Not clearly specified in DAAD summary.",
            germanRequirement: "Not clearly specified in DAAD summary."
          });
        }
      } catch (error) {
        current.universityUrl = "";
        current.mainLanguage = "";
        current.furtherLanguages = "";
        current.admissionRequirements = "";
        current.requirementsLink = "";
        current.englishRequirement = "Not clearly specified in DAAD summary.";
        current.germanRequirement = "Not clearly specified in DAAD summary.";
        current.crawlError = error instanceof Error ? error.message : String(error);
      }

      completed += 1;
      if (completed % 100 === 0 || completed === programs.length) {
        console.log(`Detail crawl progress: ${completed}/${programs.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: DETAIL_CONCURRENCY }, () => worker()));

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
      terms: SEARCH_TERMS,
      totalPrograms: programs.length
    },
    programs
  };
}

async function main() {
  const dataset = await buildProgramDataset();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(dataset, null, 2), "utf8");
  console.log(`Saved ${dataset.meta.totalPrograms} programs to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
