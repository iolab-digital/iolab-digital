import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "🦷",
  industry: "Dental & Medical",
  slug: "dental",
  title: "Custom Tools for",
  highlight: "Healthcare",
  description:
    "Dentrix, Weave, and RevenueWell are expensive and inflexible. We build patient management tools tailored to your practice.",
  heroImage: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/industries/dental.png",

  metaTitle: "Custom Apps for Dental & Medical Practices",
  metaDescription:
    "Replace Dentrix, Weave, and RevenueWell with custom patient management, booking, and communication systems for your practice.",
  seoKeywords: [
    "dental practice management",
    "custom patient portal",
    "dental CRM",
    "medical appointment booking",
    "healthcare software development",
    "dental AI automation",
    "patient engagement platform",
  ],

  businessContext: {
    heading: "Your Practice Runs on Relationships. Your Software Should Too.",
    paragraphs: [
      "Dental and medical practices are built on trust and patient relationships. But the tools you're forced to use — Dentrix, Eaglesoft, Weave, RevenueWell — treat patients like records in a database. Generic reminders, clunky portals, and workflows designed for the 'average' practice that doesn't actually exist.",
      "You're paying $500+ per month for software that can't even send a personalized birthday message or automatically route a nervous first-time patient to your most experienced hygienist. Meanwhile, your front desk is drowning in phone calls, manual data entry, and chasing down insurance verifications.",
      "The practices that embrace AI and custom tools now will deliver a patient experience that generic-software practices simply cannot match. From AI-powered scheduling to automated treatment follow-ups, the technology exists today — you just need someone to build it for YOUR workflow.",
    ],
  },

  painPoints: [
    "Paying $500+/mo for practice management software",
    "Patient reminders and follow-ups require manual work",
    "Can't customize intake forms or workflows",
    "Review generation is manual and inconsistent",
    "Marketing tools don't integrate with your patient database",
  ],

  solutions: [
    "Custom patient management and scheduling",
    "Automated appointment reminders via SMS and email",
    "Digital intake forms with e-signatures",
    "Automated review request system",
    "Patient portal for records and billing",
    "Treatment plan tracking and follow-ups",
    "Insurance verification automation",
    "Marketing automation tied to patient lifecycle",
  ],

  crmFeatures: [
    {
      title: "Patient Profiles & History",
      description:
        "Complete patient records with visit history, treatment plans, communication log, insurance details, and preferences — all in one place. Know every patient before they sit in the chair.",
    },
    {
      title: "Smart Scheduling System",
      description:
        "Online booking with real-time availability, appointment type routing, automated confirmations, and intelligent waitlist management that fills cancellations automatically.",
    },
    {
      title: "Digital Intake & Forms",
      description:
        "Patients complete custom intake forms, medical history, and consent documents online before their visit. E-signatures included. Zero clipboard paperwork.",
    },
    {
      title: "Treatment Plan Tracker",
      description:
        "Track recommended treatments, completion status, and follow-up schedules. Automatically remind patients about pending treatment plans they haven't scheduled.",
    },
    {
      title: "Billing & Insurance Module",
      description:
        "Patient-facing billing portal with payment plans, insurance claim tracking, and automated statements. Reduce accounts receivable without chasing patients.",
    },
    {
      title: "Reputation Management",
      description:
        "Automated post-visit review requests via SMS. Happy patients go to Google; unhappy patients get routed to internal feedback. Protect and build your online reputation on autopilot.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI Appointment Optimization",
      description:
        "AI analyzes appointment durations, no-show patterns, and provider schedules to maximize chair time and minimize gaps. Suggests optimal booking slots for each procedure type.",
    },
    {
      title: "Automated Patient Re-activation",
      description:
        "AI identifies patients overdue for cleanings or follow-ups and sends personalized outreach — not generic reminders, but messages referencing their specific treatment history and last visit.",
    },
    {
      title: "AI-Drafted Communications",
      description:
        "AI generates treatment plan explanations, post-procedure care instructions, and follow-up messages in your practice's voice. Your team reviews and sends in seconds.",
    },
    {
      title: "Intelligent Call Routing (IVR)",
      description:
        "AI-powered phone system that handles appointment scheduling, answers common questions about hours and insurance, and routes urgent calls to the right person — reducing front desk call volume by up to 40%.",
    },
    {
      title: "Predictive No-Show Prevention",
      description:
        "AI identifies high-risk no-show appointments based on patient history and sends targeted confirmation sequences — an extra reminder, a text the morning of, or a pre-visit checklist.",
    },
  ],

  integrations: [
    { name: "Twilio SMS & IVR", category: "Communication", description: "Appointment reminders, confirmations, and AI-powered phone routing" },
    { name: "SendGrid Email", category: "Communication", description: "Patient newsletters, treatment reminders, and recall campaigns" },
    { name: "Stripe / Square Payments", category: "Payment", description: "Online bill pay, payment plans, and copay collection" },
    { name: "Google Business API", category: "Analytics", description: "Automated review requests and reputation monitoring" },
    { name: "OpenAI GPT", category: "AI", description: "Patient communication drafts, treatment plan explanations, and FAQ chatbot" },
    { name: "Calendly / Custom Booking", category: "Scheduling", description: "Patient self-service scheduling with provider preference matching" },
    { name: "Dental Insurance APIs", category: "Operations", description: "Real-time eligibility verification and benefits breakdown" },
    { name: "HIPAA-Compliant Storage", category: "Operations", description: "Encrypted document storage for patient records and imaging" },
  ],

  faqs: [
    {
      question: "Is custom healthcare software HIPAA compliant?",
      answer:
        "Yes. We build with HIPAA compliance requirements from the start — encrypted data storage, secure access controls, audit logging, and BAA-compliant hosting. Your patient data is protected.",
    },
    {
      question: "Can patients book appointments online?",
      answer:
        "Yes. We build custom booking systems integrated with your schedule, including real-time availability, automated confirmations, and reminder sequences via SMS and email.",
    },
    {
      question: "Can it integrate with our existing practice management system?",
      answer:
        "Yes. We can integrate with or fully replace existing systems. We handle data migration and ensure a smooth transition so your practice never skips a beat.",
    },
    {
      question: "How do automated review requests work?",
      answer:
        "After each appointment, the system automatically sends a review request via SMS or email. Happy patients are directed to Google/Yelp. Unhappy patients are routed to internal feedback — protecting your online reputation.",
    },
    {
      question: "How can AI help my dental practice specifically?",
      answer:
        "AI optimizes your schedule to maximize chair time, drafts patient communications, powers an IVR phone system that handles routine calls, and re-activates overdue patients with personalized outreach. Your front desk spends less time on admin and more time on patient care.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "AI Automation", slug: "ai-automation" },
    { title: "Web Design", slug: "web-design" },
  ],

  relatedIndustries: [
    { name: "Salons & Spas", slug: "salons" },
    { name: "Law Firms", slug: "law-firms" },
    { name: "Home Services", slug: "home-services" },
    { name: "Real Estate", slug: "real-estate" },
  ],
};
