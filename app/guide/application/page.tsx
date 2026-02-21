import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const preApplicationSteps = [
  {
    title: "1. Research master's programs",
    description:
      "Use DAAD and university program pages to compare modules, language of instruction, intake, and admission format. Verify degree recognition in anabin."
  },
  {
    title: "2. Build a realistic shortlist",
    description:
      "Keep a balanced shortlist: ambitious, target, and safer options. Public universities often charge no tuition, but semester contribution is usually required."
  },
  {
    title: "3. Check eligibility",
    description:
      "Read each university admissions page carefully for subject credits, grade requirements, and required documents. Do not assume one university rule applies to all."
  },
  {
    title: "4. Obtain APS certificate",
    description:
      "For applicants from India, APS is required in most student visa cases. Apply early on aps-india.de and dispatch required documents by courier."
  },
  {
    title: "5. Prepare language tests",
    description:
      "Take the language test required by each course. Common accepted proofs include TestDaF/DSH/Goethe for German and IELTS/TOEFL/Cambridge for English."
  },
  {
    title: "6. Prepare documents",
    description:
      "Prepare transcripts, degree certificates, CV, motivation letter, letters of recommendation, and certified translations if required by the university."
  },
  {
    title: "7. Apply via uni-assist or direct university portals",
    description:
      "For uni-assist, fees are EUR 75 for the first course and EUR 30 for each additional course in the same semester. Deadlines vary by university."
  },
  {
    title: "8. Track responses and close gaps fast",
    description:
      "Monitor status portals and email daily. If a university requests missing documents, respond quickly to avoid disqualification."
  }
];

const visaAndFinancialSteps = [
  {
    title: "9. Secure admission letter",
    description:
      "Accept your university offer and keep the official admission letter ready for visa processing."
  },
  {
    title: "10. Open blocked account",
    description:
      "Per German Missions India checklist (effective 01 Sep 2024), blocked amount is EUR 11,904 with monthly availability of EUR 992."
  },
  {
    title: "11. Arrange travel health insurance",
    description:
      "Carry visa-compliant travel health insurance from entry date until enrollment date (typically first 3 months after arrival)."
  },
  {
    title: "12. Submit national visa application",
    description:
      "Submit passport, APS certificate, admission proof, funding proof, travel health insurance, and visa fee (EUR 75)."
  },
  {
    title: "13. Keep fallback plans during processing",
    description:
      "Processing time depends on city and season. Keep temporary accommodation options and arrival budget ready in advance."
  }
];

const officialSources = [
  {
    label: "German Missions India: Student Visa Checklist",
    url: "https://india.diplo.de/in-en/service/-/2552164"
  },
  {
    label: "DAAD: 5 Steps to Germany",
    url: "https://www.daad.de/en/studying-in-germany/plan-your-studies/5-steps-to-germany/"
  },
  {
    label: "uni-assist: Costs of application",
    url: "https://www.uni-assist.de/en/how-to-apply/general-information/costs-of-processing/"
  },
  {
    label: "APS India: Process and FAQ",
    url: "https://aps-india.de/"
  }
];

export default function ApplicationGuidePage() {
  return (
    <div className="page-container py-8">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold">Application Guide (India to Admission)</h1>
        <p className="text-black">A practical timeline for Indian students applying to German masters programs in 2026.</p>
      </div>

      <Card className="space-y-4">
        <CardTitle>Pre-Application Steps (India)</CardTitle>
        <CardDescription>Complete these before your visa stage begins.</CardDescription>
        <Accordion type="single" collapsible className="space-y-2">
          {preApplicationSteps.map((step) => (
            <AccordionItem key={step.title} value={step.title}>
              <AccordionTrigger>{step.title}</AccordionTrigger>
              <AccordionContent>{step.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="mt-4 space-y-4">
        <CardTitle>Visa & Financial Steps</CardTitle>
        <CardDescription>Do these after admission and before departure.</CardDescription>
        <Accordion type="single" collapsible className="space-y-2">
          {visaAndFinancialSteps.map((step) => (
            <AccordionItem key={step.title} value={step.title}>
              <AccordionTrigger>{step.title}</AccordionTrigger>
              <AccordionContent>{step.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="mt-4 space-y-3">
        <CardTitle>Official Sources Used</CardTitle>
        <CardDescription>Always re-check the latest values before payment or submission.</CardDescription>
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
  );
}
