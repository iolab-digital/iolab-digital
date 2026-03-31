import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "🔨",
  industry: "Contractors & Construction",
  slug: "contractors",
  title: "Built for",
  highlight: "Contractors",
  description:
    "Jobber, Housecall Pro, ServiceTitan — they charge $200-$500/mo and barely fit your workflow. We build a custom system that does exactly what you need.",

  metaTitle: "Custom Apps for Contractors & Construction",
  metaDescription:
    "Replace Jobber, Housecall Pro, and ServiceTitan with custom CRM, scheduling, and project management built for YOUR workflow.",
  seoKeywords: [
    "contractor CRM",
    "custom scheduling software",
    "contractor app development",
    "construction project management",
    "field service management",
    "contractor AI automation",
    "construction management app",
  ],

  businessContext: {
    heading: "Contractors Shouldn't Be Paying for Software That Fights Them",
    paragraphs: [
      "You got into contracting because you're good at building things — not because you love wrestling with scheduling software. But somewhere along the way, the admin work exploded. Estimates, invoices, scheduling, customer follow-ups, crew coordination, photo documentation. Each one lives in a different app, and none of them were built for how you actually run your business.",
      "ServiceTitan wants $400/month. Jobber still can't handle your custom estimate format. And every time you try to get a report that actually answers your question, you're three clicks deep in a menu designed for a business nothing like yours.",
      "AI and automation aren't just for tech companies anymore. Contractors who adopt custom tools and intelligent automation now will win more bids, close faster, and run leaner operations than competitors still stuck on generic SaaS platforms.",
    ],
  },

  painPoints: [
    "Paying $300+/mo for scheduling software that's overkill",
    "Estimates and invoices in separate systems",
    "No easy way to track jobs from lead to completion",
    "Customer communication scattered across text, email, phone",
    "Can't customize forms or workflows to your process",
  ],

  solutions: [
    "Custom CRM with job tracking pipeline",
    "Automated estimate and invoice generation",
    "Smart scheduling and crew management",
    "Customer portal for project updates",
    "Automated follow-ups and review requests",
    "Photo documentation and before/after galleries",
    "GPS tracking and route optimization",
    "Financial reporting and job costing",
  ],

  crmFeatures: [
    {
      title: "Lead-to-Job Pipeline",
      description:
        "Track every opportunity from first contact through estimate, approval, scheduling, completion, and payment. Visual Kanban boards show your entire pipeline at a glance.",
    },
    {
      title: "Estimate & Invoice Builder",
      description:
        "Create branded estimates with your templates, labor rates, and material costs. One-click conversion from estimate to invoice. Customers approve and pay online.",
    },
    {
      title: "Crew Scheduling & Dispatch",
      description:
        "Drag-and-drop scheduling with crew availability, skill matching, and travel time awareness. Your team gets their schedule and job details on their phone.",
    },
    {
      title: "Customer Project Portal",
      description:
        "Clients log in to see real-time project status, photo updates, upcoming milestones, and outstanding invoices. Fewer phone calls, happier customers.",
    },
    {
      title: "Job Costing & Profitability",
      description:
        "Track actual labor, materials, and subcontractor costs against estimates in real time. Know which jobs are profitable and which are bleeding money before it's too late.",
    },
    {
      title: "Document & Photo Management",
      description:
        "Before/after photos, permits, contracts, and change orders — all attached to the job record. Your crew uploads from the field, and it's instantly available in the office.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI Estimate Assistant",
      description:
        "Feed in job details and AI drafts an estimate based on your historical pricing, material costs, and labor rates. Review and adjust instead of building from scratch every time.",
    },
    {
      title: "Automated Follow-Up Sequences",
      description:
        "After sending an estimate, AI triggers a follow-up sequence — a check-in text after 3 days, a value-add email after a week, and a final nudge before the estimate expires. No leads slip through the cracks.",
    },
    {
      title: "Smart Scheduling Optimization",
      description:
        "AI analyzes crew locations, job durations, and traffic patterns to suggest the most efficient daily schedules. Less windshield time, more billable hours.",
    },
    {
      title: "AI-Drafted Customer Communications",
      description:
        "AI generates professional project update emails, change order explanations, and review request messages in your voice. Your team reviews and sends with one tap.",
    },
    {
      title: "Predictive Job Costing",
      description:
        "AI flags jobs that are trending over budget based on time and material burn rates, giving you early warning to adjust before margins disappear.",
    },
  ],

  integrations: [
    { name: "QuickBooks / Xero", category: "Payment", description: "Two-way sync of invoices, payments, and expenses with your accounting software" },
    { name: "Stripe Payments", category: "Payment", description: "Online invoice payments, deposits, and progress billing" },
    { name: "Twilio SMS & IVR", category: "Communication", description: "Automated appointment reminders, job updates, and an IVR system for after-hours routing" },
    { name: "Google Maps API", category: "Operations", description: "Route optimization, travel time estimates, and job site mapping" },
    { name: "OpenAI GPT", category: "AI", description: "Estimate drafting, follow-up sequences, and customer communication automation" },
    { name: "Google Business API", category: "Analytics", description: "Automated review requests and response management" },
    { name: "Calendly / Custom Booking", category: "Scheduling", description: "Customer self-service scheduling for estimates and consultations" },
    { name: "Dropbox / S3 Storage", category: "Operations", description: "Cloud storage for job photos, documents, permits, and contracts" },
  ],

  faqs: [
    {
      question: "Can you replace Jobber or ServiceTitan?",
      answer:
        "Yes. We build custom field service management systems that handle scheduling, dispatch, invoicing, and customer management — tailored to your specific workflow instead of forcing you into a generic one.",
    },
    {
      question: "Can my crew use it in the field on their phones?",
      answer:
        "Absolutely. We build mobile-first, so your crew can access schedules, update job status, capture photos, and get customer signatures right from their phones — even with spotty cell service.",
    },
    {
      question: "How do you handle estimates and invoicing?",
      answer:
        "We build custom estimate templates with your branding, automated pricing calculations, and one-click invoice generation. Estimates convert to invoices with a tap, and customers can pay online.",
    },
    {
      question: "Can it integrate with QuickBooks?",
      answer:
        "Yes. We integrate with QuickBooks, Xero, and other accounting platforms so your financial data stays in sync without double-entry.",
    },
    {
      question: "How does AI help contractors specifically?",
      answer:
        "AI drafts estimates from job details, automates follow-up sequences so no lead goes cold, optimizes crew schedules for less drive time, and flags jobs trending over budget in real time. It's like having an extra office manager who never sleeps.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "Mobile Apps", slug: "mobile-apps" },
    { title: "AI Automation", slug: "ai-automation" },
  ],

  relatedIndustries: [
    { name: "HVAC & Plumbing", slug: "hvac-plumbing" },
    { name: "Home Services", slug: "home-services" },
    { name: "Tree Removal & Landscaping", slug: "landscaping" },
    { name: "Real Estate", slug: "real-estate" },
  ],
};
