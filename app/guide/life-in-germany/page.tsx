import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const costs = [
  { item: "Monthly living estimate (DAAD)", range: "EUR 900-1,200" },
  { item: "Blocked account monthly availability", range: "EUR 992" },
  { item: "Blocked account total", range: "EUR 11,904" },
  { item: "Semester contribution (typical)", range: "EUR 70-430" }
];

const officialSources = [
  {
    label: "DAAD: Cost of living",
    url: "https://www.daad.de/en/studying-in-germany/plan-your-studies/cost-of-living/"
  },
  {
    label: "Make it in Germany: Working while studying",
    url: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work"
  },
  {
    label: "German Missions India: Student Visa Checklist",
    url: "https://india.diplo.de/in-en/service/-/2552164"
  }
];

export default function LifeInGermanyPage() {
  return (
    <div className="page-container py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">Life in Germany</h1>
        <p className="text-black">Costs, work rules, and practical tips for daily student life.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-3">
          <CardTitle>Monthly Cost Snapshot</CardTitle>
          <CardDescription>Budget realistically to avoid financial stress during studies.</CardDescription>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-left">Typical Cost</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost) => (
                  <tr key={cost.item} className="border-t border-border">
                    <td className="px-3 py-2">{cost.item}</td>
                    <td className="px-3 py-2">{cost.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="space-y-3">
          <CardTitle>Work and Settlement Tips</CardTitle>
          <CardDescription>Know legal limits and cultural norms from day one.</CardDescription>
          <ul className="list-disc space-y-2 pl-5 text-sm text-black">
            <li>Students from third countries can work up to 140 full days or 280 half days yearly.</li>
            <li>Equivalent rule: up to 20 hours per week during lecture periods.</li>
            <li>As of 2026, authorities use EUR 992/month as reference for proof of financing.</li>
            <li>Punctuality and appointment discipline matter for offices, classes, and contracts.</li>
            <li>Basic German helps in housing search, part-time jobs, and local administration.</li>
          </ul>
        </Card>

        <Card className="space-y-3 md:col-span-2">
          <CardTitle>Official Sources Used</CardTitle>
          <CardDescription>Use these links to verify latest legal or financial values.</CardDescription>
          <ul className="list-disc space-y-2 pl-5 text-sm text-black">
            {officialSources.map((source) => (
              <li key={source.url}>
                {source.label} -{" "}
                <a href={source.url} target="_blank" rel="noreferrer" className="text-black underline-offset-4 hover:underline">
                  Open
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
