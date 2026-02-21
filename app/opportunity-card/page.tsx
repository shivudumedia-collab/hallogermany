import { AlertTriangle, BadgeCheck, BriefcaseBusiness, ExternalLink, FileCheck2, WalletCards } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const officialLinks = [
  {
    title: "Make it in Germany: Opportunity Card",
    description: "Official federal overview of eligibility, points and rights.",
    url: "https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card"
  },
  {
    title: "Opportunity Card Points Calculator",
    description: "Official self-check tool to estimate your score.",
    url: "https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card"
  },
  {
    title: "German Missions in India: Chancenkarte",
    description: "India-specific application flow and required document list.",
    url: "https://india.diplo.de/in-en/service/-/2653326"
  },
  {
    title: "Consular Services Portal (Digital Application)",
    description: "Start and submit your visa application online.",
    url: "https://digital.diplo.de/chancenkarte"
  },
  {
    title: "anabin (Degree Recognition)",
    description: "Check if your university degree is recognized in Germany.",
    url: "https://anabin.kmk.org/anabin.html"
  },
  {
    title: "Recognition in Germany",
    description: "Official portal for professional qualification recognition.",
    url: "https://www.anerkennung-in-deutschland.de/html/en/index.php"
  }
];

const pointsSnapshot = [
  "German language: A1 (1), A2 (2), B1 (3), B2 or higher (4)",
  "English language: C1 or higher (1)",
  "Work experience: 2 years in last 5 years (2), or 5 years in last 7 years (3)",
  "Age: up to 35 years (2), up to 40 years (1)",
  "Previous stay in Germany (at least 6 months) (1)",
  "Spouse also eligible and applying together (1)",
  "Qualification in a shortage occupation (1)"
];

const proofChecklist = [
  "Valid passport, completed visa form, recent biometric photos",
  "Updated CV, motivation letter for German job search plan",
  "Degree documents + recognition proof (anabin printout or authority decision)",
  "Language certificates (German/English) used for points",
  "Proof of work experience (reference letters, contracts, salary documents)",
  "Proof of funds (blocked account or declaration of commitment)",
  "Travel/health insurance covering initial stay",
  "Accommodation and travel plan basics for first entry"
];

const workflow = [
  "Check eligibility path: full recognition OR points route (minimum 6 points).",
  "Prepare recognition, language and experience documents first.",
  "Submit digital application through the Consular Services Portal.",
  "Attend biometrics/interview at your German mission when called.",
  "After approval, enter Germany and use Opportunity Card for job search and trial work."
];

export default function OpportunityCardPage() {
  return (
    <div className="page-container py-8 sm:py-10">
      <section className="hero-grid relative overflow-hidden rounded-3xl border border-black bg-white px-5 py-8 sm:px-8">
        <div className="pointer-events-none absolute -left-14 top-5 h-36 w-36 rounded-full border border-[#ff7a00]" />
        <div className="pointer-events-none absolute -right-12 bottom-5 h-28 w-28 rounded-full border border-[#16a34a]" />
        <div className="relative z-10 space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ff7a00] bg-[#fff4e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#dc2626]">
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            Opportunity Card (Chancenkarte)
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">What to add and prepare for Opportunity Card</h1>
          <p className="max-w-3xl text-sm text-black sm:text-base">
            This section gives you a practical evidence checklist for Chancenkarte with official links, points snapshot and India
            application flow.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black">Last verified on February 21, 2026</p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="space-y-3">
          <CardTitle className="text-base">Eligibility routes</CardTitle>
          <div className="space-y-2 text-sm text-black">
            <p className="flex items-start gap-2">
              <BadgeCheck className="mt-0.5 h-4 w-4 text-[#16a34a]" />
              Route 1: Full recognition of your foreign qualification in Germany.
            </p>
            <p className="flex items-start gap-2">
              <BadgeCheck className="mt-0.5 h-4 w-4 text-[#16a34a]" />
              Route 2: Points system route with at least 6 points.
            </p>
          </div>
          <p className="text-sm text-black">
            The official portal also states trial work and part-time work rights while searching for a full-time job.
          </p>
        </Card>

        <Card className="space-y-3">
          <CardTitle className="text-base">Financial proof target</CardTitle>
          <p className="text-sm text-black">
            Current reference amount published on official portals is <span className="font-semibold">EUR 1,091 net per month</span>
            for your stay funding proof.
          </p>
          <p className="text-sm text-black">
            Acceptable proof options include blocked account or a formal declaration of commitment (subject to mission rules).
          </p>
          <p className="text-xs text-black">
            Always re-check the exact amount on the date you submit because this value can change.
          </p>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="space-y-3">
          <CardTitle className="text-base">Points snapshot (what you should document)</CardTitle>
          <ul className="space-y-2 text-sm text-black">
            {pointsSnapshot.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <FileCheck2 className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-3">
          <CardTitle className="text-base">Document checklist to prove your case</CardTitle>
          <ul className="space-y-2 text-sm text-black">
            {proofChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <WalletCards className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mt-6">
        <Card className="space-y-3">
          <CardTitle className="text-base">Application workflow</CardTitle>
          <ol className="space-y-2 text-sm text-black">
            {workflow.map((step, index) => (
              <li key={step} className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-black text-[11px] font-bold">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {officialLinks.map((resource) => (
          <Card key={resource.url} className="space-y-2">
            <CardTitle className="text-base">{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-black underline-offset-4 hover:text-[#dc2626] hover:underline"
            >
              Open official resource
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Card>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-black bg-white p-5 text-sm text-black">
        <p className="inline-flex items-start gap-2 font-semibold">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-[#dc2626]" />
          Final check before submission
        </p>
        <p className="mt-2">
          Visa rules, required documents and financial thresholds may change. Validate every document against your local German mission
          checklist immediately before appointment.
        </p>
      </section>
    </div>
  );
}
