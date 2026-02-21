import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    q: "Is APS mandatory for Indian students in 2026?",
    a: "Yes, APS is mandatory for most German student visa applications from India and is usually required before or during admission and visa processing."
  },
  {
    q: "How much money do I need in a blocked account?",
    a: "Current requirement is EUR 11,904 total, with monthly withdrawal limit of EUR 992."
  },
  {
    q: "How long does German student visa processing take?",
    a: "National D visa processing commonly takes 4-12 weeks, but timelines vary by season and city."
  },
  {
    q: "Can I work while studying in Germany?",
    a: "Yes. International students are generally allowed 140 full days or 280 half days of work per year."
  },
  {
    q: "What should I do first after landing in Germany?",
    a: "Arrange accommodation and complete Anmeldung within 14 days. Then handle bank account, insurance, and residence permit process."
  }
];

export default function FAQPage() {
  return (
    <div className="page-container py-8">
      <Card className="space-y-4">
        <div>
          <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions from Indian students planning a masters in Germany.</CardDescription>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq) => (
            <AccordionItem value={faq.q} key={faq.q}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
