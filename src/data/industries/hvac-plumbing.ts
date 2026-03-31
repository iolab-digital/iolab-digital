import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "🔧",
  industry: "HVAC & Plumbing",
  slug: "hvac-plumbing",
  title: "Custom Tools for",
  highlight: "HVAC & Plumbing",
  description:
    "ServiceTitan charges you $400/month for features you don't use. We build a custom system around YOUR dispatch, maintenance plans, and service workflows.",

  metaTitle: "Custom Apps for HVAC & Plumbing Companies",
  metaDescription:
    "Replace ServiceTitan and Housecall Pro with custom dispatch, maintenance plan management, and AI automation for HVAC and plumbing businesses.",
  seoKeywords: [
    "HVAC CRM",
    "plumbing software",
    "HVAC dispatch system",
    "plumbing business management",
    "HVAC AI automation",
    "plumbing scheduling app",
    "HVAC maintenance plan software",
  ],

  businessContext: {
    heading: "HVAC and Plumbing Businesses Need Dispatch-First Software",
    paragraphs: [
      "HVAC and plumbing companies are dispatch operations at their core. Every minute a tech sits idle, every callback that could've been prevented, every maintenance plan that lapses — it's money left on the table. But the big-name software vendors like ServiceTitan charge $400+ per month and force you into workflows designed for their biggest customers, not yours.",
      "Your business has unique needs: equipment-level service histories, maintenance agreement tracking, warranty management, seasonal demand spikes, and emergency dispatch that can't wait for a scheduler to log in. Generic tools bolt these on as afterthoughts.",
      "HVAC and plumbing companies that build custom platforms with AI-powered dispatch, predictive maintenance reminders, and intelligent customer communication will dominate their service areas. The technology is ready — the only question is who moves first.",
    ],
  },

  painPoints: [
    "ServiceTitan or Housecall Pro costs $300-$500/mo per tech",
    "Emergency dispatch requires manual coordination every time",
    "Maintenance agreements tracked in spreadsheets or forgotten entirely",
    "Equipment service history lives in a tech's memory, not the system",
    "No automated way to upsell replacements when equipment ages out",
  ],

  solutions: [
    "Custom dispatch board with priority-based routing",
    "Equipment-level service history and warranty tracking",
    "Maintenance agreement management with auto-scheduling",
    "Flat-rate pricing book integrated into mobile app",
    "Customer portal with service history and booking",
    "Automated seasonal tune-up campaigns",
    "Real-time technician tracking and ETAs",
    "Financial reporting with job costing and revenue by service type",
  ],

  crmFeatures: [
    {
      title: "Equipment & Asset Tracking",
      description:
        "Track every unit by model, serial number, install date, warranty status, and full service history. When a tech arrives, they see the equipment's complete story.",
    },
    {
      title: "Priority Dispatch Board",
      description:
        "Visual dispatch with emergency flags, tech availability, skill matching, and proximity-based assignment. Drag and drop to reassign. Techs get instant push notifications.",
    },
    {
      title: "Maintenance Agreement Manager",
      description:
        "Track all active agreements, auto-schedule seasonal visits, send renewal reminders, and bill automatically. Never let a maintenance plan lapse again.",
    },
    {
      title: "Flat-Rate Price Book",
      description:
        "Mobile-accessible pricing guide with parts, labor, and markup calculated automatically. Techs present professional options on-site and close on the spot.",
    },
    {
      title: "Customer & Property Records",
      description:
        "Full customer profiles with every property, every unit, every service call, and every invoice. Your team has complete context before they knock on the door.",
    },
    {
      title: "Revenue & Performance Dashboard",
      description:
        "Track revenue by tech, by service type, by time period. See close rates on recommended repairs, average ticket values, and maintenance agreement metrics.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI-Powered Dispatch",
      description:
        "AI assigns the right tech to the right job based on skill set, proximity, current workload, and job priority. Emergency calls get routed instantly without waiting for a human dispatcher.",
    },
    {
      title: "Predictive Maintenance Alerts",
      description:
        "AI analyzes equipment age, service history, and manufacturer data to predict when units are likely to fail. Trigger proactive outreach before the customer's AC dies in July.",
    },
    {
      title: "AI Phone System (IVR)",
      description:
        "Intelligent phone routing that handles appointment scheduling, provides ETAs for dispatched techs, and triages emergency vs. routine calls — reducing office phone volume and capturing every after-hours lead.",
    },
    {
      title: "Automated Replacement Proposals",
      description:
        "When equipment reaches end-of-life, AI generates a personalized replacement proposal with financing options and efficiency comparisons. Your techs present it on-site with confidence.",
    },
    {
      title: "Smart Seasonal Campaigns",
      description:
        "AI triggers tune-up campaigns before peak seasons — AC checks in spring, furnace inspections in fall — targeting customers by equipment type, last service date, and agreement status.",
    },
  ],

  integrations: [
    { name: "Twilio SMS & IVR", category: "Communication", description: "Appointment reminders, tech ETA notifications, and AI phone system" },
    { name: "SendGrid Email", category: "Communication", description: "Maintenance reminders, seasonal campaigns, and invoice delivery" },
    { name: "Stripe / Square", category: "Payment", description: "On-site payments, financing applications, and recurring billing" },
    { name: "QuickBooks / Xero", category: "Payment", description: "Invoice sync, expense tracking, and payroll integration" },
    { name: "Google Maps API", category: "Operations", description: "Tech tracking, proximity-based dispatch, and route optimization" },
    { name: "OpenAI GPT", category: "AI", description: "Replacement proposals, customer communications, and review response drafts" },
    { name: "Equipment Manufacturer APIs", category: "Operations", description: "Warranty verification, parts lookup, and technical documentation" },
    { name: "Google Business API", category: "Analytics", description: "Review monitoring, response automation, and local ranking tracking" },
  ],

  faqs: [
    {
      question: "Can you replace ServiceTitan?",
      answer:
        "Yes. We build custom dispatch, CRM, and field service platforms for HVAC and plumbing companies. You get the features you actually need — equipment tracking, maintenance agreements, flat-rate pricing — without the $400+/mo price tag and unused bloat.",
    },
    {
      question: "How does AI dispatch work?",
      answer:
        "AI evaluates technician skills, current location, workload, and job priority to make instant dispatch decisions. Emergency calls get the nearest qualified tech automatically. Routine work gets optimized for route efficiency.",
    },
    {
      question: "Can it manage maintenance agreements?",
      answer:
        "Absolutely. The system tracks every agreement, auto-schedules seasonal visits, sends renewal reminders before expiration, and handles recurring billing. You'll see agreement revenue, renewal rates, and expiring contracts at a glance.",
    },
    {
      question: "Does the mobile app work offline?",
      answer:
        "Yes. Techs can view job details, access the price book, capture photos, and collect signatures even without cell service. Data syncs automatically when they're back online.",
    },
    {
      question: "How does predictive maintenance help my business?",
      answer:
        "AI tracks equipment age and service patterns to predict failures before they happen. You reach out to customers proactively — before their AC dies in a heatwave — positioning your company as the trusted expert and closing high-ticket replacements with less resistance.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "AI Automation", slug: "ai-automation" },
    { title: "Mobile Apps", slug: "mobile-apps" },
  ],

  relatedIndustries: [
    { name: "Contractors & Construction", slug: "contractors" },
    { name: "Pest Control", slug: "pest-control" },
    { name: "Home Services", slug: "home-services" },
    { name: "Tree Removal & Landscaping", slug: "landscaping" },
  ],
};
