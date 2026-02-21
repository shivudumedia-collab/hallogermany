import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const postArrivalSteps = [
  "10. Move into temporary accommodation and secure a written landlord confirmation (Wohnungsgeberbestatigung).",
  "11. Complete Anmeldung within two weeks of moving in at your local Meldebehorde.",
  "12. Keep your Meldebescheinigung safe; you will need it for banking and many contracts.",
  "13. Open a German bank account after registration and activate online banking.",
  "14. Enroll in statutory health insurance before finishing university enrollment.",
  "15. Book Auslanderbehorde appointment early and apply for residence permit before visa expiry.",
  "16. Finish university enrollment, pay semester contribution, and set up SIM/transport/student services."
];

const officialSources = [
  {
    label: "Make it in Germany: Registering your residence",
    url: "https://www.make-it-in-germany.com/en/living-in-germany/discover-germany/registering-your-residence"
  },
  {
    label: "DAAD: Studying in Germany - Finances",
    url: "https://www.daad.de/en/studying-in-germany/plan-your-studies/cost-of-living/"
  },
  {
    label: "German Missions India: Student Visa Checklist",
    url: "https://india.diplo.de/in-en/service/-/2552164"
  }
];

export default function PostArrivalPage() {
  return (
    <div className="page-container py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">Post-Arrival Checklist (Germany)</h1>
        <p className="text-black">What to finish after landing so your legal and university status stays on track.</p>
      </div>

      <div className="grid gap-4">
        <Card className="space-y-3">
          <CardTitle>First 14 days</CardTitle>
          <CardDescription>Prioritize housing proof and city registration immediately.</CardDescription>
          <ul className="list-disc space-y-2 pl-5 text-sm text-black">
            <li>{postArrivalSteps[0]}</li>
            <li>{postArrivalSteps[1]}</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <CardTitle>First month</CardTitle>
          <CardDescription>Set up banking and health insurance.</CardDescription>
          <ul className="list-disc space-y-2 pl-5 text-sm text-black">
            <li>{postArrivalSteps[2]}</li>
            <li>{postArrivalSteps[3]}</li>
            <li>{postArrivalSteps[4]}</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <CardTitle>First 90 days</CardTitle>
          <CardDescription>Complete legal residence process and finish university formalities.</CardDescription>
          <ul className="list-disc space-y-2 pl-5 text-sm text-black">
            <li>{postArrivalSteps[5]}</li>
            <li>{postArrivalSteps[6]}</li>
          </ul>
        </Card>

        <Card className="space-y-3">
          <CardTitle>Official Sources Used</CardTitle>
          <CardDescription>Rules may differ by city, so verify on city portals too.</CardDescription>
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
