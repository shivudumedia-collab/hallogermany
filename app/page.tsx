import Link from "next/link";
import { ArrowRight, CheckCircle2, Landmark, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Indian students in Germany (2025/26)", value: "60,000+" },
  { label: "Blocked amount required", value: "EUR 11,904" },
  { label: "Typical visa processing", value: "4-12 weeks" }
];

export default function HomePage() {
  return (
    <div className="hero-grid relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full border border-[#ff7a00]" />
      <div className="pointer-events-none absolute -right-16 bottom-12 h-56 w-56 rounded-full border border-[#10b981]" />
      <section className="page-container py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-[#ff7a00] bg-[#fff4e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#dc2626]">
              India to Germany MS roadmap
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
              A premium study roadmap for Indian students building their Germany journey.
            </h1>
            <p className="max-w-xl text-base text-black sm:text-lg">
              From APS and uni-assist to blocked account, visa, Anmeldung, and residence permit. Track progress and add notes
              in one dashboard.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/signup">
                <Button size="lg" variant="saffron" className="gap-2">
                  Start Tracking
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/guide/application">
                <Button size="lg" variant="outline">
                  Explore Guide
                </Button>
              </Link>
            </div>
          </div>

          <Card className="space-y-4 border-black bg-white">
            <CardTitle>Your 2026-ready Checklist</CardTitle>
            <CardDescription>
              Structured around pre-application, visa, post-arrival, and daily life in Germany.
            </CardDescription>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                APS, IELTS/TestDaF, transcripts, SOP/LOR tracking
              </li>
              <li className="flex items-start gap-2">
                <Landmark className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                Blocked account EUR 11,904 and visa paperwork
              </li>
              <li className="flex items-start gap-2">
                <Plane className="mt-0.5 h-4 w-4 text-[#dc2626]" />
                Anmeldung, insurance, bank, residence permit deadlines
              </li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="page-container pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white">
              <p className="text-2xl font-bold text-[#dc2626]">{stat.value}</p>
              <p className="mt-2 text-sm text-black">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="space-y-3 bg-white">
            <CardTitle className="text-base">Learning German (A1)</CardTitle>
            <CardDescription>
              Complete A1 path with Goethe and telc exam tracks, weekly plan, videos and language-support links.
            </CardDescription>
            <Link href="/learn-german">
              <Button variant="outline" className="gap-2">
                Open A1 Hub
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
          <Card className="space-y-3 bg-white">
            <CardTitle className="text-base">Opportunity Card</CardTitle>
            <CardDescription>
              Research-backed checklist of points, required documents and official links for Chancenkarte.
            </CardDescription>
            <Link href="/opportunity-card">
              <Button variant="outline" className="gap-2">
                Open Opportunity Card
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
