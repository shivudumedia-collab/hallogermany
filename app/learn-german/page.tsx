import Link from "next/link";
import { BookOpenCheck, CircleCheck, Download, ExternalLink, Languages, PlayCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const officialA1ExamTracks = [
  {
    name: "Goethe-Zertifikat A1: Start Deutsch 1",
    examSections: "Listening (20m), Reading (25m), Writing (20m), Speaking (15m)",
    suitableFor: "Widely accepted proof for basic German at A1 level.",
    examUrl: "https://www.goethe.de/ins/in/en/sta/mum/prf/gzsd1.cfm",
    prepUrl: "https://www.goethe.de/ins/be/en/spr/prf/gzsd1/ueb.html"
  },
  {
    name: "Start Deutsch 1 / telc Deutsch A1",
    examSections: "Listening (~20m), Reading + Writing (45m), Speaking (~15m)",
    suitableFor: "General A1 exam with free mock examination and audio.",
    examUrl: "https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/",
    prepUrl: "https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/"
  },
  {
    name: "telc Deutsch A1 fur Zuwanderer",
    examSections: "Language elements, listening, reading, writing + speaking (~15m)",
    suitableFor: "Immigration-focused A1 format with free mock materials.",
    examUrl: "https://www.telc.net/en/language-examinations/certificate-exams/german/telc-german-a1-for-migrants/",
    prepUrl: "https://www.telc.net/en/language-examinations/certificate-exams/german/telc-german-a1-for-migrants/"
  }
];

const coreLearningResources = [
  {
    title: "Goethe A1 Practice Materials",
    description: "Model papers, speaking video samples, listening audio and downloadable exercises.",
    url: "https://www.goethe.de/ins/be/en/spr/prf/gzsd1/ueb.html"
  },
  {
    title: "Goethe Deutschtrainer A1 App",
    description: "Free A1 vocabulary and structure app with short daily practice modules.",
    url: "https://www.goethe.de/en/m/spr/ueb/kuj/dt1.html"
  },
  {
    title: "Deutsch fur dich (Goethe)",
    description: "Free grammar, reading and listening exercises from A1 to C2.",
    url: "https://www.goethe.de/prj/dfd/en/home.cfm"
  },
  {
    title: "DW Nicos Weg (A1-B1)",
    description: "Video-based German course with story format and interactive exercises.",
    url: "https://learngerman.dw.com/en/nicos-weg/c-36519789"
  },
  {
    title: "vhs-Lernportal A1",
    description: "Free structured A1 online course with exercises and tutor support.",
    url: "https://a1.vhs-lernportal.de/"
  }
];

const videoResources = [
  {
    title: "Goethe A1 speaking sample videos",
    url: "https://www.goethe.de/ins/be/en/spr/prf/gzsd1/ueb.html"
  },
  {
    title: "Nicos Weg A1 video lessons",
    url: "https://learngerman.dw.com/en/nicos-weg/c-36519789"
  },
  {
    title: "Goethe + telc A1 speaking mock videos on YouTube",
    url: "https://www.youtube.com/results?search_query=Goethe+telc+A1+speaking+mock+exam"
  }
];

const indianLanguageVideoLinks = [
  {
    language: "Hindi",
    url: "https://www.youtube.com/results?search_query=German+A1+course+in+Hindi"
  },
  {
    language: "Tamil",
    url: "https://www.youtube.com/results?search_query=German+A1+course+in+Tamil"
  },
  {
    language: "Telugu",
    url: "https://www.youtube.com/results?search_query=German+A1+course+in+Telugu"
  },
  {
    language: "Kannada",
    url: "https://www.youtube.com/results?search_query=German+A1+course+in+Kannada"
  },
  {
    language: "Malayalam",
    url: "https://www.youtube.com/results?search_query=German+A1+course+in+Malayalam"
  }
];

const weeklyChecklist = [
  "Week 1-2: alphabet, pronunciation, greetings, numbers, family, daily words.",
  "Week 3-4: grammar basics (verb position, articles, question words, accusative).",
  "Week 5-6: complete Goethe/telc listening + reading drills and writing templates.",
  "Week 7: daily speaking simulation (self-introduction, asking/answering questions).",
  "Week 8: full timed mock tests and weak-topic revision."
];

type LearnGermanPageProps = {
  searchParams?: {
    section?: string;
  };
};

export default function LearnGermanPage({ searchParams }: LearnGermanPageProps) {
  const defaultSection = searchParams?.section === "learn-german" ? "learn-german" : "a1-exam";
  return <LearnGermanPageContent defaultSection={defaultSection} />;
}

function LearnGermanPageContent({ defaultSection }: { defaultSection: "a1-exam" | "learn-german" }) {
  return (
    <div className="page-container py-8 sm:py-10">
      <section className="hero-grid relative overflow-hidden rounded-3xl border border-black bg-white px-5 py-8 sm:px-8">
        <div className="pointer-events-none absolute -left-14 top-5 h-36 w-36 rounded-full border border-[#ff7a00]" />
        <div className="pointer-events-none absolute -right-12 bottom-5 h-28 w-28 rounded-full border border-[#16a34a]" />
        <div className="relative z-10 space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00] bg-[#fff4e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#dc2626]">
            <Languages className="h-3.5 w-3.5" />
            Learning German
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">A1 German Learning Hub</h1>
          <p className="max-w-3xl text-sm text-black sm:text-base">
            One place for A1 exam preparation (Goethe + telc), structured study roadmap, video resources, and Hindi + South
            Indian language support links.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="/a1-german-8-week-plan.txt"
              download
              className="inline-flex items-center gap-2 rounded-md border border-[#ff7a00] bg-[#ff7a00] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#dc2626]"
            >
              <Download className="h-4 w-4" />
              Download 8-Week Plan
            </a>
            <a
              href="https://www.goethe.de/ins/be/en/spr/prf/gzsd1/ueb.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-black bg-white px-4 py-2 text-sm font-semibold text-black transition hover:border-[#ff7a00] hover:text-[#dc2626]"
            >
              Official A1 Practice Set
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <Accordion type="single" collapsible defaultValue={defaultSection} className="space-y-3">
          <AccordionItem value="a1-exam" id="a1-exam">
            <AccordionTrigger className="text-base font-semibold">A1 Exam</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {officialA1ExamTracks.map((track) => (
                  <Card key={track.name} className="space-y-3">
                    <CardTitle className="text-base">{track.name}</CardTitle>
                    <CardDescription>{track.suitableFor}</CardDescription>
                    <p className="text-sm text-black">
                      <span className="font-semibold">Exam format:</span> {track.examSections}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={track.examUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-[#ff7a00] bg-[#ff7a00] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#dc2626]"
                      >
                        Exam details
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={track.prepUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-black bg-white px-3 py-1.5 text-xs font-semibold text-black transition hover:border-[#ff7a00] hover:text-[#dc2626]"
                      >
                        Practice material
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="space-y-3">
                <CardTitle className="text-base">Exam-day readiness checklist</CardTitle>
                <ul className="space-y-2 text-sm text-black">
                  <li className="flex items-start gap-2">
                    <CircleCheck className="mt-0.5 h-4 w-4 text-[#16a34a]" />
                    Complete at least two full mock tests under real timing before booking your slot.
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="mt-0.5 h-4 w-4 text-[#16a34a]" />
                    Prepare a fixed speaking script for self-introduction, daily routine, and simple requests.
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheck className="mt-0.5 h-4 w-4 text-[#16a34a]" />
                    Practice writing short personal messages and form-filling every day.
                  </li>
                </ul>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="learn-german" id="learn-german">
            <AccordionTrigger className="text-base font-semibold">Learn German</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {coreLearningResources.map((resource) => (
                  <Card key={resource.url} className="space-y-2">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-black underline-offset-4 hover:text-[#dc2626] hover:underline"
                    >
                      Open resource
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Card>
                ))}
              </div>

              <Card className="space-y-3">
                <CardTitle className="text-base">Video lessons and exam simulation</CardTitle>
                <div className="grid gap-2">
                  {videoResources.map((item) => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-md border border-black bg-white px-3 py-2 text-sm font-medium text-black transition hover:border-[#ff7a00] hover:text-[#dc2626]"
                    >
                      <span className="inline-flex items-center gap-2">
                        <PlayCircle className="h-4 w-4" />
                        {item.title}
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </Card>

              <Card className="space-y-3">
                <CardTitle className="text-base">Hindi + South Indian language support</CardTitle>
                <CardDescription>
                  Use these language-wise video indexes. For any video, enable subtitles and use auto-translate if needed.
                </CardDescription>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {indianLanguageVideoLinks.map((entry) => (
                    <a
                      key={entry.language}
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-md border border-black bg-white px-3 py-2 text-sm font-semibold text-black transition hover:border-[#ff7a00] hover:text-[#dc2626]"
                    >
                      {entry.language}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </Card>

              <Card className="space-y-3">
                <CardTitle className="text-base">8-week pass strategy</CardTitle>
                <ul className="space-y-2 text-sm text-black">
                  {weeklyChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <BookOpenCheck className="mt-0.5 h-4 w-4 text-[#16a34a]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-black">
                  Minimum pass target: Keep mock scores stable above 70%, and complete daily speaking practice in short, consistent
                  sessions.
                </p>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mt-8 rounded-2xl border border-black bg-white p-5 text-sm text-black">
        <p className="font-semibold">Need a guided start?</p>
        <p className="mt-1">
          Begin with <Link href="#learn-german" className="font-semibold text-[#dc2626] underline">Learn German</Link>, follow the
          weekly plan, then move to <Link href="#a1-exam" className="font-semibold text-[#dc2626] underline">A1 Exam</Link> for final
          mocks and exam registration.
        </p>
      </section>
    </div>
  );
}
