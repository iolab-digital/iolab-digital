import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "⚖️",
  industry: "Law Firms",
  slug: "law-firms",
  title: "Custom Software for",
  highlight: "Law Firms",
  description:
    "Replace Clio, MyCase, and PracticePanther with a custom case management, client intake, and automation platform built for your practice area.",
  heroImage: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/industries/law.png",

  metaTitle: "Custom Apps for Law Firms & Legal",
  metaDescription:
    "Custom case management CRM, client intake automation, and AI tools for law firms. Replace expensive legal software with a platform built for your practice.",
  seoKeywords: [
    "law firm CRM",
    "legal case management software",
    "custom legal app",
    "law firm automation",
    "legal AI tools",
    "client intake automation",
    "law firm management system",
  ],

  businessContext: {
    heading: "Your Practice Area Is Unique. Your Software Should Be Too.",
    paragraphs: [
      "Whether you run a personal injury firm, family law practice, or criminal defense office, your workflows are specific to your practice area. But Clio and MyCase charge $50-$150 per user per month for generic case management that forces every firm into the same template. A 3-attorney PI firm and a 20-attorney corporate firm shouldn't use the same tool — but that's exactly what you're paying for.",
      "Client intake is where firms lose the most money. Leads call after business hours and get voicemail. Intake forms are PDFs that someone re-types into the system. Conflict checks are manual. Follow-ups depend on someone remembering to do them. Every leak in this pipeline is a lost client and lost revenue.",
      "Law firms that adopt custom CRM and AI automation now will capture more leads, move cases faster, and deliver a client experience that makes referrals inevitable. AI-powered intake, document automation, and intelligent case tracking are no longer luxuries — they're competitive necessities.",
    ],
  },

  painPoints: [
    "Clio/MyCase costs $50-$150/user/month and doesn't fit your practice area",
    "Client intake is manual, slow, and loses after-hours leads",
    "Case status updates require constant manual effort",
    "Document generation is repetitive and error-prone",
    "No automated system for client communication milestones",
  ],

  solutions: [
    "Custom case management pipeline by practice area",
    "Automated client intake with e-signatures",
    "Document automation and template generation",
    "Client portal with case status and messaging",
    "Automated billing, trust accounting, and invoicing",
    "Conflict of interest checking system",
    "Statute of limitations and deadline tracking",
    "Client communication logging and compliance",
  ],

  crmFeatures: [
    {
      title: "Case Management Pipeline",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/law-firms/0.png",
      description:
        "Visual case pipeline customized for your practice area — from intake through discovery, negotiation, trial, and settlement. Every case has a clear status and next action.",
    },
    {
      title: "Client Intake Automation",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/law-firms/1.png",
      description:
        "Online intake forms with conditional logic, e-signatures, and automatic conflict checks. New leads get an instant response and a seamless onboarding experience.",
    },
    {
      title: "Document Automation",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/law-firms/2.png",
      description:
        "Generate demand letters, retainer agreements, court filings, and correspondence from templates with case data auto-populated. Minutes instead of hours per document.",
    },
    {
      title: "Client Portal & Communication",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/law-firms/3.png",
      description:
        "Secure client portal where clients check case status, upload documents, view invoices, and message their attorney. Reduce 'what's happening with my case?' calls by 80%.",
    },
    {
      title: "Billing & Trust Accounting",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/law-firms/4.png",
      description:
        "Time tracking, trust account management, IOLTA compliance, automated invoicing, and online payments. Every billable minute captured and accounted for.",
    },
    {
      title: "Deadline & Statute Tracker",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/law-firms/5.png",
      description:
        "Automated deadline tracking with cascading reminders. Never miss a statute of limitations, filing deadline, or court date. Escalation alerts if deadlines approach unacknowledged.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI-Powered Client Intake",
      description:
        "AI chatbot on your website that qualifies leads 24/7 — asks about the case type, captures details, runs a preliminary conflict check, and schedules a consultation. No more lost after-hours leads.",
    },
    {
      title: "AI Document Drafting",
      description:
        "AI generates first drafts of demand letters, client correspondence, and case summaries from case data and notes. Attorneys review and refine instead of writing from scratch.",
    },
    {
      title: "Intelligent Case Updates",
      description:
        "AI monitors case milestones and automatically sends status updates to clients via their preferred channel. Clients stay informed without your team manually crafting every update.",
    },
    {
      title: "AI Phone System (IVR)",
      description:
        "Intelligent phone routing that handles new lead intake, provides case status to existing clients by case number, and routes urgent matters to the right attorney — 24 hours a day.",
    },
    {
      title: "Predictive Case Analytics",
      description:
        "AI analyzes case data to estimate settlement ranges, predict timeline durations, and flag cases that need attention based on activity patterns and deadline proximity.",
    },
  ],

  integrations: [
    { name: "Twilio SMS & IVR", category: "Communication", description: "Appointment reminders, case updates, and AI-powered phone intake" },
    { name: "SendGrid Email", category: "Communication", description: "Client communications, billing notifications, and marketing campaigns" },
    { name: "Stripe / LawPay", category: "Payment", description: "Online invoice payments, retainer deposits, and IOLTA-compliant processing" },
    { name: "QuickBooks / Xero", category: "Payment", description: "Trust accounting integration and financial reporting" },
    { name: "OpenAI GPT", category: "AI", description: "Document drafting, client communications, and intake chatbot" },
    { name: "DocuSign / Custom E-Sign", category: "Operations", description: "Retainer agreements, intake forms, and settlement signatures" },
    { name: "Court Filing APIs", category: "Operations", description: "Deadline calendaring, filing reminders, and court date tracking" },
    { name: "Google Business API", category: "Analytics", description: "Review management and local attorney search optimization" },
  ],

  faqs: [
    {
      question: "Can you replace Clio or MyCase?",
      answer:
        "Yes. We build custom case management platforms tailored to your practice area. Instead of generic features designed for every type of firm, you get a system built around how YOUR firm actually handles cases.",
    },
    {
      question: "Is the platform secure and compliant?",
      answer:
        "Absolutely. We build with attorney-client privilege in mind — encrypted storage, role-based access controls, audit logging, and IOLTA-compliant payment processing. Security is built in from day one.",
    },
    {
      question: "How does AI intake work?",
      answer:
        "An AI chatbot on your website qualifies leads 24/7. It asks about case type, captures key details, checks for conflicts, and schedules consultations. Qualified leads get immediate attention, even at 2am.",
    },
    {
      question: "Can clients check their case status online?",
      answer:
        "Yes. We build a secure client portal where clients log in to view case status, upcoming deadlines, document requests, and invoices. It dramatically reduces 'what's happening with my case?' phone calls.",
    },
    {
      question: "How does document automation save time?",
      answer:
        "Templates auto-populate with case data — client names, dates, case numbers, opposing parties. AI drafts initial versions of demand letters and correspondence. Attorneys review and edit instead of starting from blank. Most firms save 5-10 hours per week.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "AI Automation", slug: "ai-automation" },
    { title: "Web Design", slug: "web-design" },
  ],

  relatedIndustries: [
    { name: "Real Estate", slug: "real-estate" },
    { name: "Dental & Medical", slug: "dental" },
    { name: "Contractors & Construction", slug: "contractors" },
    { name: "Auto Shops", slug: "auto-shops" },
  ],
};
