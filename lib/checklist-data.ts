import { ChecklistStep } from "@/types/checklist";

export const checklistSteps: ChecklistStep[] = [
  {
    key: "research_programs",
    title: "Research Master's Programs",
    description:
      "Use DAAD and university websites to compare curriculum, language of instruction, and admission requirements. Check recognition status in anabin.",
    category: "Pre-Application"
  },
  {
    key: "shortlist_public_unis",
    title: "Shortlist Public Universities",
    description:
      "Build a shortlist based on program fit, language requirements, and deadlines.",
    category: "Pre-Application"
  },
  {
    key: "check_eligibility",
    title: "Check Eligibility",
    description:
      "Validate your degree pathway and subject prerequisites on each university page. For applicants from India, APS is required in most student visa cases.",
    category: "Pre-Application"
  },
  {
    key: "aps_certificate",
    title: "Obtain APS Certificate",
    description:
      "Apply via aps-india.de early, then courier required documents. APS issues a digitally signed certificate used for university and visa processes.",
    category: "Pre-Application"
  },
  {
    key: "language_test",
    title: "Language Tests",
    description:
      "Take language tests required by your target program. Common proofs include TestDaF/DSH/Goethe for German and IELTS/TOEFL/Cambridge for English.",
    category: "Pre-Application"
  },
  {
    key: "prepare_docs",
    title: "Prepare Documents",
    description:
      "Collect transcripts, CV, motivation letter, and letters of recommendation.",
    category: "Pre-Application"
  },
  {
    key: "uni_assist_application",
    title: "Apply via uni-assist or Direct",
    description:
      "For uni-assist applications, plan fees of EUR 75 for the first course and EUR 30 for each additional course in the same semester. Deadlines vary by university.",
    category: "Pre-Application"
  },
  {
    key: "track_admits",
    title: "Track Application Decisions",
    description:
      "Track portal updates, respond to missing documents quickly, and prepare backup options.",
    category: "Pre-Application"
  },
  {
    key: "secure_admission",
    title: "Secure Admission Letter",
    description:
      "Accept your offer and keep official admission documents ready for visa processing.",
    category: "Visa & Financial"
  },
  {
    key: "blocked_account",
    title: "Open Blocked Account",
    description:
      "For student visa proof, blocked account funding is EUR 11,904 with monthly withdrawal capped at EUR 992 (German Missions India checklist, from 01 Sep 2024). Keep extra liquid funds for move-in costs.",
    category: "Visa & Financial"
  },
  {
    key: "health_travel_insurance",
    title: "Arrange Travel Health Insurance",
    description:
      "Carry visa-compliant travel health insurance from arrival date until university enrollment date (commonly around the first 3 months).",
    category: "Visa & Financial"
  },
  {
    key: "book_vfs_slot",
    title: "Book VFS Appointment",
    description:
      "Book your national visa appointment through the official German Missions India process. Appointment availability varies by city, so start early.",
    category: "Visa & Financial"
  },
  {
    key: "visa_application",
    title: "Submit National D Visa Application",
    description:
      "Submit passport, APS certificate, admission proof, financial proof, travel health insurance, and the visa fee (EUR 75).",
    category: "Visa & Financial"
  },
  {
    key: "visa_processing",
    title: "Track Visa Processing",
    description:
      "Processing times vary by mission and season. Use this period to plan housing, arrival funds, and document copies for post-arrival formalities.",
    category: "Visa & Financial"
  },
  {
    key: "arrive_and_stay",
    title: "Arrive and Arrange Temporary Accommodation",
    description:
      "Reach Germany and move into temporary or long-term housing.",
    category: "Post-Arrival"
  },
  {
    key: "anmeldung",
    title: "Complete Anmeldung (Within 14 Days)",
    description:
      "Register at your local Meldebehorde within two weeks of moving in. Carry passport/ID and landlord move-in confirmation (Wohnungsgeberbestatigung).",
    category: "Post-Arrival"
  },
  {
    key: "open_bank_account",
    title: "Open German Bank Account",
    description:
      "Open an account with Sparkasse, Deutsche Bank, etc. Anmeldung is usually required.",
    category: "Post-Arrival"
  },
  {
    key: "public_health_insurance",
    title: "Enroll in Public Health Insurance",
    description:
      "Enroll with a statutory insurer (for example TK or AOK). Student rates are often around EUR 120-150 depending on age and provider settings.",
    category: "Post-Arrival"
  },
  {
    key: "residence_permit",
    title: "Apply for Residence Permit",
    description:
      "After entry, book your Auslanderbehorde appointment soon and apply before your entry visa expires.",
    category: "Post-Arrival"
  },
  {
    key: "university_enrollment",
    title: "University Enrollment",
    description:
      "Complete enrollment quickly and pay semester contribution. DAAD reports contributions typically range from EUR 70 to EUR 430 per semester.",
    category: "Post-Arrival"
  },
  {
    key: "tax_id_sim",
    title: "Get Tax ID, SIM, and Local Essentials",
    description:
      "Set up your tax ID, phone SIM, and city transport/student services.",
    category: "Post-Arrival"
  },
  {
    key: "budget_planning",
    title: "Plan Monthly Budget",
    description:
      "DAAD estimates student living costs at roughly EUR 900-1,200 per month depending on city, with rent as the largest component.",
    category: "Life in Germany"
  },
  {
    key: "student_work_rules",
    title: "Understand Student Work Rules",
    description:
      "Students from third countries may work up to 140 full days or 280 half days per year, or up to 20 hours/week during lecture periods.",
    category: "Life in Germany"
  },
  {
    key: "settlement_tips",
    title: "Settle into German Life",
    description:
      "Prioritize German basics, keep copies of all registration and insurance records, and book city-office appointments early in high-demand cities.",
    category: "Life in Germany"
  }
];

export const checklistCategories = [
  "Pre-Application",
  "Visa & Financial",
  "Post-Arrival",
  "Life in Germany"
] as const;
