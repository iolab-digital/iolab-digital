import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "🌳",
  industry: "Tree Removal & Landscaping",
  slug: "landscaping",
  title: "Built for",
  highlight: "Landscapers",
  description:
    "Stop overpaying for software that doesn't understand seasonal work, property-level contracts, or crew-based scheduling. We build tools that do.",

  metaTitle: "Custom Apps for Landscaping & Tree Removal",
  metaDescription:
    "Custom CRM, crew scheduling, and AI automation for landscaping, tree removal, and lawn care businesses. Replace generic field service software.",
  seoKeywords: [
    "landscaping CRM",
    "tree removal software",
    "landscaping business management",
    "lawn care scheduling app",
    "landscaping AI automation",
    "tree service software",
    "landscaping route optimization",
  ],

  businessContext: {
    heading: "Landscaping Is Seasonal, Visual, and Property-Based. Your Software Should Be Too.",
    paragraphs: [
      "Landscaping and tree removal businesses don't operate like HVAC companies or plumbers. Your work is seasonal. Your pricing is property-specific. Your crews need photo documentation for every job. And your customers expect a professional experience from the first estimate to the final walkthrough.",
      "But the software available to you — LMN, Jobber, Service Autopilot — treats you like every other field service business. They can't handle property-level service histories, seasonal contract rollover, or the visual before-and-after documentation that wins you new business.",
      "Landscapers who invest in custom CRM and AI automation now will close more estimates, retain more seasonal customers, and run tighter operations. AI-powered estimating, automated seasonal campaigns, and smart crew scheduling are real competitive advantages — and your competitors haven't figured them out yet.",
    ],
  },

  painPoints: [
    "Generic field service software doesn't understand seasonal work cycles",
    "Property-level pricing and service history tracked in spreadsheets",
    "Estimates take too long and aren't professional enough",
    "Seasonal customer churn — clients don't re-sign automatically",
    "Photo documentation scattered across phones and text threads",
  ],

  solutions: [
    "Custom CRM with property-level profiles and service history",
    "Professional estimate builder with photo attachments",
    "Seasonal contract management with auto-renewal workflows",
    "Crew scheduling with skill matching and route optimization",
    "Before/after photo galleries tied to each property",
    "Customer portal with service calendar and billing",
    "Automated seasonal re-engagement campaigns",
    "Job costing and profitability tracking per property",
  ],

  crmFeatures: [
    {
      title: "Property Profiles & Mapping",
      description:
        "Detailed property records with service history, photos, measurements, access notes, and special instructions. Your crew sees the full picture before they arrive on site.",
    },
    {
      title: "Estimate Builder with Photos",
      description:
        "Create professional branded estimates with property photos, line items, and optional service tiers. Customers approve online with a digital signature.",
    },
    {
      title: "Seasonal Contract Manager",
      description:
        "Track seasonal contracts with auto-renewal reminders, pricing adjustments, and service plan rollover. Reduce churn by making re-signing effortless.",
    },
    {
      title: "Crew Scheduling & Dispatch",
      description:
        "Assign crews by skill level, equipment availability, and location. Daily schedules pushed to mobile with job details, property notes, and navigation.",
    },
    {
      title: "Photo Documentation System",
      description:
        "Crews capture before/after photos that auto-attach to the property record. Build visual portfolios that close future deals and protect against liability disputes.",
    },
    {
      title: "Job Costing Dashboard",
      description:
        "Track labor hours, material costs, and subcontractor expenses per property and per contract. Know your margin on every job in real time.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI Estimate Generator",
      description:
        "Upload property photos and AI generates an initial estimate based on property size, service type, and your historical pricing. Refine and send in minutes instead of hours.",
    },
    {
      title: "Seasonal Campaign Automation",
      description:
        "AI triggers re-engagement campaigns as seasons change — spring cleanup offers in March, fall leaf removal in October, snow plowing in November. Targeted by property type and past services.",
    },
    {
      title: "Smart Crew Scheduling",
      description:
        "AI optimizes daily crew assignments based on property locations, job durations, equipment needs, and travel time. Maximize billable hours and minimize windshield time.",
    },
    {
      title: "AI-Drafted Customer Updates",
      description:
        "AI generates professional project update emails and completion reports with before/after photos. Your team reviews and sends in one tap.",
    },
    {
      title: "Weather-Aware Rescheduling",
      description:
        "AI monitors weather forecasts and automatically suggests reschedules for rain days, notifying customers and reorganizing crew assignments without manual intervention.",
    },
  ],

  integrations: [
    { name: "Twilio SMS", category: "Communication", description: "Crew arrival alerts, service reminders, and seasonal campaign texts" },
    { name: "SendGrid Email", category: "Communication", description: "Estimate delivery, contract renewals, and marketing campaigns" },
    { name: "Stripe Payments", category: "Payment", description: "Online estimate approval, progress billing, and recurring contract payments" },
    { name: "QuickBooks / Xero", category: "Payment", description: "Invoice sync, expense tracking, and payroll integration" },
    { name: "Google Maps API", category: "Operations", description: "Property mapping, route optimization, and crew tracking" },
    { name: "OpenAI GPT", category: "AI", description: "Estimate assistance, customer communications, and seasonal marketing copy" },
    { name: "Weather APIs", category: "Analytics", description: "Forecast monitoring for scheduling and seasonal demand prediction" },
    { name: "Cloud Storage (S3)", category: "Operations", description: "Property photo storage, before/after galleries, and document management" },
  ],

  faqs: [
    {
      question: "Can you build software specifically for landscaping businesses?",
      answer:
        "Yes. We build custom platforms with property-level profiles, seasonal contract management, crew scheduling with route optimization, and visual documentation — all designed around how landscaping companies actually work.",
    },
    {
      question: "How does the seasonal contract management work?",
      answer:
        "The system tracks each contract's start and end dates, automatically triggers renewal reminders, adjusts pricing for new seasons, and handles service plan changes. Customers can approve renewals online, and the system auto-generates the new schedule.",
    },
    {
      question: "Can crews use it in the field?",
      answer:
        "Absolutely. Mobile-first design means your crew sees daily schedules, property details, and job notes on their phones. They capture before/after photos, log time, and update job status from the field.",
    },
    {
      question: "How does AI help with estimating?",
      answer:
        "AI analyzes property photos and your historical pricing data to generate initial estimates. You refine the numbers and send a professional branded estimate in minutes instead of spending an hour measuring and calculating manually.",
    },
    {
      question: "How long does it take to build?",
      answer:
        "A core CRM with scheduling and estimating takes 3-4 months. A full platform with AI automation, customer portal, and photo documentation takes 4-6 months. We deliver in phases so you start using features as they're completed.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "Mobile Apps", slug: "mobile-apps" },
    { title: "AI Automation", slug: "ai-automation" },
  ],

  relatedIndustries: [
    { name: "Pest Control", slug: "pest-control" },
    { name: "Home Services", slug: "home-services" },
    { name: "Contractors & Construction", slug: "contractors" },
    { name: "HVAC & Plumbing", slug: "hvac-plumbing" },
  ],
};
