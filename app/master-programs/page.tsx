import Link from "next/link";
import { ExternalLink, GraduationCap, MapPin, Search } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { type ProgramStream, streamLabels, streamOrder } from "@/lib/daad-programs";
import csProgramsDataset from "@/data/daad-computer-science-masters.json";
import civilProgramsDataset from "@/data/daad-civil-masters.json";
import electricalProgramsDataset from "@/data/daad-electrical-masters.json";
import mechanicalProgramsDataset from "@/data/daad-mechanical-masters.json";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type MasterProgramsPageProps = {
  searchParams?: {
    stream?: string;
    page?: string;
    q?: string;
  };
};

type ProgramCard = {
  id: string;
  title: string;
  university: string;
  degree: string;
  duration: string;
  location: string;
  studyMode: string;
  deadlines: string;
  daadPath: string;
  daadUrl: string;
  universityUrl: string;
  admissionRequirements: string;
  requirementsLink: string;
  mainLanguage: string;
  furtherLanguages: string;
  englishRequirement: string;
  germanRequirement: string;
};

type DatasetProgram = Partial<ProgramCard> & {
  id?: string;
  title?: string;
  university?: string;
  termHits?: string[];
};

type ProgramDataset = {
  meta: {
    generatedAt: string;
    totalPrograms: number;
  };
  programs: DatasetProgram[];
};

const DAAD_API_BASE = "https://api.daad.de";
const DAAD_WEB_BASE = "https://www.daad.de";
const defaultStream: ProgramStream = "computer-science";
const pageSize = 20;
const typedCsDataset = csProgramsDataset as ProgramDataset;
const typedMechanicalDataset = mechanicalProgramsDataset as ProgramDataset;
const typedElectricalDataset = electricalProgramsDataset as ProgramDataset;
const typedCivilDataset = civilProgramsDataset as ProgramDataset;

function isProgramStream(value: string | undefined): value is ProgramStream {
  if (!value) return false;
  return streamOrder.includes(value as ProgramStream);
}

function positiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return parsed;
}

function buildHref(stream: ProgramStream, page: number, q: string) {
  const params = new URLSearchParams();
  params.set("stream", stream);
  if (page > 1) params.set("page", String(page));
  if (q.trim()) params.set("q", q.trim());
  return `/master-programs?${params.toString()}`;
}

function stripHtml(value: string) {
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

function firstHref(html: string) {
  const match = html.match(/href="([^"]+)"/i);
  return match?.[1] ?? "";
}

function extractSnippets(text: string, patterns: RegExp[]) {
  const snippets: string[] = [];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[0]) snippets.push(match[0].trim());
  }
  return [...new Set(snippets)];
}

function inferEnglishRequirement(admissionPlain: string, mainLanguage: string, furtherLanguages: string) {
  const explicit = extractSnippets(admissionPlain, [
    /IELTS[^.]{0,70}/i,
    /TOEFL[^.]{0,70}/i,
    /Cambridge[^.]{0,70}/i,
    /PTE[^.]{0,70}/i,
    /English[^.]{0,120}/i
  ]);
  if (explicit.length > 0) return explicit.join(" | ");

  const combined = `${mainLanguage} ${furtherLanguages}`.toLowerCase();
  if (combined.includes("english")) return "English required (exact score not specified in DAAD summary).";

  return "Not clearly specified in DAAD summary.";
}

function inferGermanRequirement(admissionPlain: string, mainLanguage: string, furtherLanguages: string) {
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
  if (combined.includes("german")) return "German required/expected (exact level not specified in DAAD summary).";

  return "Not clearly specified in DAAD summary.";
}

function toProgramCard(program: DatasetProgram): ProgramCard {
  return {
    id: program.id || "",
    title: program.title || "",
    university: program.university || "",
    degree: program.degree || "Master",
    duration: program.duration || "",
    location: program.location || "",
    studyMode: program.studyMode || "",
    deadlines: program.deadlines || "",
    daadPath: program.daadPath || "",
    daadUrl: program.daadUrl || (program.daadPath ? `${DAAD_WEB_BASE}${program.daadPath}` : ""),
    universityUrl: program.universityUrl || "",
    admissionRequirements: program.admissionRequirements || "",
    requirementsLink: program.requirementsLink || "",
    mainLanguage: program.mainLanguage || "",
    furtherLanguages: program.furtherLanguages || "",
    englishRequirement: program.englishRequirement || "Not clearly specified in DAAD summary.",
    germanRequirement: program.germanRequirement || "Not clearly specified in DAAD summary."
  };
}

function getNonCsDataset(stream: Exclude<ProgramStream, "computer-science">) {
  if (stream === "mechanical") return typedMechanicalDataset;
  if (stream === "electrical") return typedElectricalDataset;
  return typedCivilDataset;
}

function matchesQuery(program: ProgramCard, query: string) {
  if (!query) return true;
  const text = [
    program.title,
    program.university,
    program.location,
    program.studyMode,
    program.mainLanguage,
    program.furtherLanguages,
    program.admissionRequirements,
    program.englishRequirement,
    program.germanRequirement
  ]
    .join(" ")
    .toLowerCase();
  return text.includes(query);
}

function streamSeparationMatch(stream: ProgramStream, title: string) {
  const value = title.toLowerCase();
  if (stream === "computer-science") return true;

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

function isComputerScienceProgram(program: ProgramCard) {
  const title = program.title.toLowerCase();
  const combined = `${program.title} ${program.admissionRequirements}`.toLowerCase();

  const coreCsTitlePatterns = [
    /\bcomputer science\b/,
    /\binformatics?\b/,
    /\bsoftware engineering\b/,
    /\bdata science\b/,
    /\bartificial intelligence\b/,
    /\bmachine learning\b/,
    /\bcyber[\s-]?security\b/,
    /\binformation systems?\b/,
    /\bbioinformatics?\b/,
    /\bmedical informatics?\b/,
    /\bmedia informatics?\b/,
    /\bbusiness informatics?\b/,
    /\bhuman[-\s]?computer interaction\b/
  ];

  const supportingCsPatterns = [
    /\binformation technology\b/,
    /\bit security\b/,
    /\bcomputational\b/,
    /\bdata engineering\b/,
    /\bweb engineering\b/,
    /\bdigital technologies\b/,
    /\bdigital transformation\b/
  ];

  const nonCsStreamPatterns = [
    /\bcivil engineering\b/,
    /\bmechanical engineering\b/,
    /\belectrical engineering\b/,
    /\bpower engineering\b/,
    /\bautomotive\b/,
    /\baerospace\b/,
    /\bmechatronics\b/,
    /\bchemical engineering\b/,
    /\bstructural engineering\b/,
    /\bconstruction\b/,
    /\barchitecture\b/,
    /\bgeotechnical\b/,
    /\bhydraulic\b/,
    /\btransportation engineering\b/
  ];

  const hasCoreCs = coreCsTitlePatterns.some((pattern) => pattern.test(title));
  if (hasCoreCs) return true;

  const hasSupportingCs = supportingCsPatterns.some((pattern) => pattern.test(combined));
  if (!hasSupportingCs) return false;

  const hasNonCsStream = nonCsStreamPatterns.some((pattern) => pattern.test(title));
  if (hasNonCsStream) return false;

  return true;
}

async function fetchDaadJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "hallogermany-daad-view/1.0"
    }
  });
  if (!response.ok) {
    throw new Error(`DAAD request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

function parseDetail(detailJson: {
  page?: {
    sections?: {
      main?: {
        mainContent?: Array<{
          modules?: Array<{
            template?: string;
            data?: {
              content?: Array<{
                blocks?: Array<{
                  data?: {
                    headline?: string;
                    text?: string;
                  };
                }>;
              }>;
              sidebar?: Array<{
                data?: {
                  link?: {
                    url?: string;
                  };
                };
              }>;
            };
          }>;
        }>;
      };
    };
  };
}) {
  const detailModule = detailJson.page?.sections?.main?.mainContent?.[0]?.modules?.find((mod) => mod.template === "db_detail");
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

  const blocks = (detailData.content || []).flatMap((section) => section.blocks || []);
  const admissionRaw = blocks.find((block) => block.data?.headline === "Admission requirements")?.data?.text ?? "";
  const mainLanguage = blocks.find((block) => block.data?.headline === "Main language")?.data?.text ?? "";
  const furtherLanguages = blocks.find((block) => block.data?.headline === "Further languages")?.data?.text ?? "";
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

async function hydrateProgramsWithDetails(programs: ProgramCard[]) {
  return Promise.all(
    programs.map(async (program) => {
      if (!program.daadPath) return program;
      try {
        const detailJson = await fetchDaadJson(`${DAAD_API_BASE}/api/page${program.daadPath}`);
        return {
          ...program,
          ...parseDetail(detailJson as never)
        };
      } catch {
        return program;
      }
    })
  );
}

function ProgramCards({ programs }: { programs: ProgramCard[] }) {
  return (
    <section className="mt-6 grid gap-4">
      {programs.map((program) => (
        <Card key={program.id || `${program.university}-${program.title}`} className="space-y-4 border-black bg-white">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-xl">{program.title}</CardTitle>
              <CardDescription className="text-base text-foreground">{program.university}</CardDescription>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-black bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {program.location || "Germany"}
            </span>
          </div>

          <div className="grid gap-2 text-sm text-foreground sm:grid-cols-2">
            <p>
              <span className="font-semibold">Degree:</span> {program.degree || "Master"}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> {program.duration || "Check DAAD"}
            </p>
            <p>
              <span className="font-semibold">Study Mode:</span> {program.studyMode || "Check DAAD"}
            </p>
            <p>
              <span className="font-semibold">Languages:</span>{" "}
              {[program.mainLanguage, program.furtherLanguages].filter(Boolean).join(" / ") || "Check DAAD"}
            </p>
          </div>

          <div className="rounded-xl border border-black bg-white p-3 text-sm">
            <p className="font-semibold text-foreground">Requirements Snapshot</p>
            <p className="mt-1 text-foreground">
              <span className="font-semibold">English score:</span> {program.englishRequirement}
            </p>
            <p className="mt-1 text-foreground">
              <span className="font-semibold">German equivalent:</span> {program.germanRequirement}
            </p>
            {program.admissionRequirements ? <p className="mt-2 text-black">{program.admissionRequirements}</p> : null}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={program.daadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#ff7a00] bg-[#ff7a00] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#dc2626]"
            >
              View on DAAD
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            {program.universityUrl ? (
              <a
                href={program.universityUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-foreground transition hover:border-[#ff7a00] hover:text-[#dc2626]"
              >
                University Website
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
            {program.requirementsLink ? (
              <a
                href={program.requirementsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-foreground transition hover:border-[#ff7a00] hover:text-[#dc2626]"
              >
                Requirement Details
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </Card>
      ))}
    </section>
  );
}

export default async function MasterProgramsPage({ searchParams }: MasterProgramsPageProps) {
  const selectedStream = isProgramStream(searchParams?.stream) ? searchParams.stream : defaultStream;
  const queryRaw = searchParams?.q?.trim() ?? "";
  const query = queryRaw.toLowerCase();
  const currentPage = positiveInt(searchParams?.page, 1);

  if (selectedStream === "computer-science") {
    const csOnlyPrograms = typedCsDataset.programs.map(toProgramCard).filter(isComputerScienceProgram);
    const filteredPrograms = csOnlyPrograms.filter((program) => matchesQuery(program, query));
    const totalPages = Math.max(1, Math.ceil(filteredPrograms.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);
    const pageStart = (safePage - 1) * pageSize;
    const pageItems = filteredPrograms.slice(pageStart, pageStart + pageSize);
    const generatedDate = new Date(typedCsDataset.meta.generatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    return (
      <div className="page-container py-8 sm:py-10">
        <section className="hero-grid relative overflow-hidden rounded-3xl border border-black bg-white px-5 py-8  sm:px-8">
          <div className="pointer-events-none absolute -left-14 top-5 h-36 w-36 rounded-full border border-[#ff7a00]" />
          <div className="pointer-events-none absolute -right-12 bottom-5 h-28 w-28 rounded-full border border-[#10b981]" />
          <div className="relative z-10 space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00] bg-[#fff4e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#dc2626]">
              <GraduationCap className="h-3.5 w-3.5" />
              DAAD Program Search
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Search Master Degree Programs</h1>
            <p className="max-w-3xl text-sm text-black sm:text-base">
              Computer Science and related master&apos;s programs from DAAD. Large crawl dataset with university links and requirement
              highlights.
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-black">
              {csOnlyPrograms.length.toLocaleString()} CS programs indexed | Last crawl: {generatedDate}
            </p>
          </div>
        </section>

        <section className="mt-6 flex flex-wrap gap-2.5">
          {streamOrder.map((stream) => (
            <Link
              key={stream}
              href={buildHref(stream, 1, stream === "computer-science" ? queryRaw : "")}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                selectedStream === stream
                  ? "border-[#ff7a00] bg-[#fff4e6] text-[#dc2626]"
                  : "border-black bg-white text-foreground hover:border-[#ff7a00] hover:text-[#dc2626]"
              )}
            >
              {streamLabels[stream]}
            </Link>
          ))}
        </section>

        <section className="mt-5">
          <form action="/master-programs" method="get" className="gloss-ring flex flex-wrap items-center gap-2 rounded-2xl border border-black bg-white p-3">
            <input type="hidden" name="stream" value="computer-science" />
            <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-xl border border-black bg-white px-3 py-2">
              <Search className="h-4 w-4 text-black" />
              <input
                name="q"
                defaultValue={queryRaw}
                placeholder="Search program, university, location, requirement..."
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-black"
              />
            </div>
            <button type="submit" className="rounded-md border border-[#ff7a00] bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dc2626]">
              Search
            </button>
            <Link
              href="/master-programs?stream=computer-science"
              className="rounded-md border border-black bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#ff7a00] hover:text-[#dc2626]"
            >
              Clear
            </Link>
          </form>
          <p className="mt-2 text-sm text-black">
            Showing {pageItems.length} of {filteredPrograms.length.toLocaleString()} results
          </p>
        </section>

        <ProgramCards programs={pageItems} />

        {totalPages > 1 ? (
          <section className="mt-8 flex flex-wrap items-center gap-2">
            {safePage > 1 ? (
              <Link
                href={buildHref("computer-science", safePage - 1, queryRaw)}
                className="rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-foreground transition hover:border-[#ff7a00] hover:text-[#dc2626]"
              >
                Previous
              </Link>
            ) : null}
            <span className="rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-foreground">
              Page {safePage} / {totalPages}
            </span>
            {safePage < totalPages ? (
              <Link
                href={buildHref("computer-science", safePage + 1, queryRaw)}
                className="rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-foreground transition hover:border-[#ff7a00] hover:text-[#dc2626]"
              >
                Next
              </Link>
            ) : null}
          </section>
        ) : null}
      </div>
    );
  }

  const selectedDataset = getNonCsDataset(selectedStream);
  const allPrograms = selectedDataset.programs
    .map(toProgramCard)
    .filter((program) => streamSeparationMatch(selectedStream, program.title));
  const filteredPrograms = allPrograms.filter((program) => matchesQuery(program, query));
  const totalPages = Math.max(1, Math.ceil(filteredPrograms.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageItems = filteredPrograms.slice(pageStart, pageStart + pageSize);
  const detailedPageItems = await hydrateProgramsWithDetails(pageItems);
  const generatedDate = new Date(selectedDataset.meta.generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="page-container py-8 sm:py-10">
      <section className="hero-grid relative overflow-hidden rounded-3xl border border-black bg-white px-5 py-8  sm:px-8">
        <div className="pointer-events-none absolute -left-14 top-5 h-36 w-36 rounded-full border border-[#ff7a00]" />
        <div className="pointer-events-none absolute -right-12 bottom-5 h-28 w-28 rounded-full border border-[#10b981]" />
        <div className="relative z-10 space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00] bg-[#fff4e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#dc2626]">
            <GraduationCap className="h-3.5 w-3.5" />
            DAAD Program Search
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Search Master Degree Programs</h1>
          <p className="max-w-3xl text-sm text-black sm:text-base">
            {streamLabels[selectedStream]} programs from DAAD with strict stream-only matching.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-black">
            {allPrograms.length.toLocaleString()} programs indexed | Last crawl: {generatedDate}
          </p>
        </div>
      </section>

      <section className="mt-6 flex flex-wrap gap-2.5">
        {streamOrder.map((stream) => (
          <Link
            key={stream}
            href={buildHref(stream, 1, stream === selectedStream ? queryRaw : "")}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              selectedStream === stream
                ? "border-[#ff7a00] bg-[#fff4e6] text-[#dc2626]"
                : "border-black bg-white text-foreground hover:border-[#ff7a00] hover:text-[#dc2626]"
            )}
          >
            {streamLabels[stream]}
          </Link>
        ))}
      </section>

      <section className="mt-5">
        <form action="/master-programs" method="get" className="gloss-ring flex flex-wrap items-center gap-2 rounded-2xl border border-black bg-white p-3">
          <input type="hidden" name="stream" value={selectedStream} />
          <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-xl border border-black bg-white px-3 py-2">
            <Search className="h-4 w-4 text-black" />
            <input
              name="q"
              defaultValue={queryRaw}
              placeholder={`Search ${streamLabels[selectedStream]} programs...`}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-black"
            />
          </div>
          <button type="submit" className="rounded-md border border-[#ff7a00] bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dc2626]">
            Search
          </button>
          <Link
            href={buildHref(selectedStream, 1, "")}
            className="rounded-md border border-black bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-[#ff7a00] hover:text-[#dc2626]"
          >
            Clear
          </Link>
        </form>
        <p className="mt-2 text-sm text-black">
          Showing {detailedPageItems.length} of {filteredPrograms.length.toLocaleString()} results
        </p>
      </section>

      <ProgramCards programs={detailedPageItems} />

      {totalPages > 1 ? (
        <section className="mt-8 flex flex-wrap items-center gap-2">
          {safePage > 1 ? (
            <Link
              href={buildHref(selectedStream, safePage - 1, queryRaw)}
              className="rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-foreground transition hover:border-[#ff7a00] hover:text-[#dc2626]"
            >
              Previous
            </Link>
          ) : null}
          <span className="rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-foreground">
            Page {safePage} / {totalPages}
          </span>
          {safePage < totalPages ? (
            <Link
              href={buildHref(selectedStream, safePage + 1, queryRaw)}
              className="rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-foreground transition hover:border-[#ff7a00] hover:text-[#dc2626]"
            >
              Next
            </Link>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
