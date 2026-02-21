import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const resources = [
  {
    title: "DAAD International Programs",
    url: "https://www.daad.de/en/studying-in-germany/universities/all-degree-programmes/",
    description: "Search English and German-taught master's programs."
  },
  {
    title: "anabin",
    url: "https://anabin.kmk.org/anabin.html",
    description: "Check recognition status of your previous degree and institution."
  },
  {
    title: "APS India",
    url: "https://aps-india.de/",
    description: "Mandatory academic verification for Indian students."
  },
  {
    title: "uni-assist",
    url: "https://www.uni-assist.de/",
    description: "Application portal used by many German universities."
  },
  {
    title: "German Missions India - Student Visa Checklist",
    url: "https://india.diplo.de/in-en/service/-/2552164",
    description: "Official checklist for student visa documents and funding proof."
  },
  {
    title: "Make it in Germany - Study and Work",
    url: "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work",
    description: "Official federal portal for student work rights and practical guidance."
  },
  {
    title: "DAAD - Cost of Living",
    url: "https://www.daad.de/en/studying-in-germany/plan-your-studies/cost-of-living/",
    description: "Official planning guide for monthly budget and semester contributions."
  },
  {
    title: "Goethe A1 Practice Materials",
    url: "https://www.goethe.de/ins/be/en/spr/prf/gzsd1/ueb.html",
    description: "Official A1 mock tests, speaking examples, and listening practice."
  },
  {
    title: "Make it in Germany - Opportunity Card",
    url: "https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card",
    description: "Official federal guidance for Chancenkarte eligibility and points."
  }
];

export default function ResourcesPage() {
  return (
    <div className="page-container py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-black">Official links for applications, visa process, and settlement steps.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.url} className="space-y-2">
            <CardTitle className="text-base">{resource.title}</CardTitle>
            <CardDescription>{resource.description}</CardDescription>
            <a href={resource.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-black underline-offset-4 hover:underline">
              Open resource
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
