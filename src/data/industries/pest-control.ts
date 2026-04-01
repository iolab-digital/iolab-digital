import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "🐛",
  industry: "Pest Control",
  slug: "pest-control",
  title: "Custom Software for",
  highlight: "Pest Control",
  description:
    "Ditch PestRoutes and FieldRoutes. We build custom CRM, scheduling, and automation tools designed specifically for how pest control companies operate.",
  heroImage: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/industries/pest-control.png",

  metaTitle: "Custom Apps for Pest Control Companies",
  metaDescription:
    "Replace PestRoutes and FieldRoutes with custom CRM, route optimization, and AI automation built for pest control businesses.",
  seoKeywords: [
    "pest control CRM",
    "pest control software",
    "custom pest control app",
    "pest control scheduling",
    "pest control route optimization",
    "pest control AI automation",
    "pest control business management",
  ],

  businessContext: {
    heading: "Pest Control Is a Route Business. Your Software Should Think in Routes.",
    paragraphs: [
      "Pest control companies live and die by route density. The more stops you can fit into a day without wasting windshield time, the more profitable your operation. But the software you're stuck with — PestRoutes, FieldRoutes, GorillaDesk — was built for generic field service, not the specific rhythms of pest control.",
      "You need recurring service tracking by treatment type. You need chemical application logs tied to service addresses. You need seasonal upsell triggers that fire when termite season hits. Generic field service apps don't think about any of this.",
      "Pest control companies that adopt custom CRM and AI tools now will lock in customers with better service, convert more one-time calls into recurring plans, and operate with fewer people in the office. The AI wave is here — the question is whether you ride it or watch your competitors do it first.",
    ],
  },

  painPoints: [
    "Paying $300+/mo for PestRoutes or FieldRoutes",
    "Route planning is manual and wastes hours every week",
    "Chemical application logs tracked on paper or spreadsheets",
    "No automated system to convert one-time calls into recurring plans",
    "Customer communication is reactive instead of proactive",
  ],

  solutions: [
    "Custom CRM with pest-specific service tracking",
    "AI-optimized route planning and scheduling",
    "Digital chemical application logging with compliance reports",
    "Automated recurring service plan management",
    "Customer portal with service history and upcoming visits",
    "Seasonal upsell campaigns triggered automatically",
    "Automated review requests after completed services",
    "Real-time technician tracking and job status updates",
  ],

  crmFeatures: [
    {
      title: "Service Address Profiles",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/pest-control/0.png",
      description:
        "Property-level records with pest history, treatment logs, chemical applications, access instructions, and photos. Your techs know exactly what they're walking into every time.",
    },
    {
      title: "Recurring Plan Management",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/pest-control/1.png",
      description:
        "Set up quarterly, monthly, or seasonal plans. The system auto-schedules visits, sends customer reminders, adjusts for weather delays, and generates invoices on completion.",
    },
    {
      title: "Chemical Application Logging",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/pest-control/2.png",
      description:
        "Digital logs tied to each service address with chemical name, quantity, EPA number, and application method. Generate compliance reports in seconds, not hours.",
    },
    {
      title: "Route Optimization Board",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/pest-control/3.png",
      description:
        "Visual daily routes with drag-and-drop adjustments, travel time estimates, and stop density scoring. Fit more stops into every day with less driving.",
    },
    {
      title: "Lead Conversion Pipeline",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/pest-control/4.png",
      description:
        "Track every inquiry from first call through inspection, quote, and close. Automated follow-ups nudge prospects who haven't booked. See conversion rates by source, service type, and tech.",
    },
    {
      title: "Seasonal Campaign Engine",
      image: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/features/pest-control/5.png",
      description:
        "Automatically trigger marketing campaigns when termite season, mosquito season, or rodent season approaches. Target customers by service history and location.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI Route Optimization",
      description:
        "AI maps the tightest possible routes each morning based on stop locations, time windows, and traffic. Add a same-day call and it recalculates the entire route in seconds.",
    },
    {
      title: "Smart Upsell Recommendations",
      description:
        "AI identifies customers most likely to add services based on property type, pest history, and seasonal trends. Your techs get upsell prompts right on their mobile app.",
    },
    {
      title: "AI-Powered Phone System (IVR)",
      description:
        "An intelligent phone system that handles appointment scheduling, provides service area confirmation, and routes emergency calls — reducing office call volume and capturing after-hours leads.",
    },
    {
      title: "Automated Lead Follow-Up",
      description:
        "When a prospect calls for a quote but doesn't book, AI sends a personalized follow-up sequence — a same-day text, a next-day email with seasonal pest info, and a final nudge with a limited-time offer.",
    },
    {
      title: "Predictive Service Scheduling",
      description:
        "AI analyzes weather patterns, seasonal data, and historical pest activity to predict demand spikes. Schedule extra capacity before the phones start ringing.",
    },
  ],

  integrations: [
    { name: "Twilio SMS & IVR", category: "Communication", description: "Service reminders, on-my-way alerts, and AI-powered phone routing" },
    { name: "SendGrid Email", category: "Communication", description: "Seasonal campaigns, service confirmations, and billing notifications" },
    { name: "Stripe / Square", category: "Payment", description: "Online bill pay, recurring billing, and field payment processing" },
    { name: "QuickBooks / Xero", category: "Payment", description: "Automatic sync of invoices, expenses, and chemical purchase costs" },
    { name: "Google Maps API", category: "Operations", description: "Route optimization, service area mapping, and travel time calculation" },
    { name: "OpenAI GPT", category: "AI", description: "Lead follow-up sequences, review responses, and upsell messaging" },
    { name: "Google Business API", category: "Analytics", description: "Review monitoring and automated response management" },
    { name: "Weather APIs", category: "Analytics", description: "Pest activity correlation and demand forecasting" },
  ],

  faqs: [
    {
      question: "Can you replace PestRoutes or FieldRoutes?",
      answer:
        "Yes. We build custom pest control management systems with route optimization, recurring service plans, chemical logging, and customer portals — all tailored to your exact workflow instead of a generic template.",
    },
    {
      question: "How does route optimization work?",
      answer:
        "Our AI-powered system creates the most efficient daily routes based on stop locations, service time windows, and real-time traffic. It recalculates instantly when you add a same-day stop or a customer cancels.",
    },
    {
      question: "Can it handle chemical application compliance?",
      answer:
        "Absolutely. Technicians log chemical applications digitally for each service — product, quantity, EPA number, and method. You can generate compliance reports for any time period in seconds.",
    },
    {
      question: "How does AI help convert one-time calls to recurring plans?",
      answer:
        "AI identifies one-time customers and triggers a nurture sequence — seasonal pest prevention tips, a recurring plan comparison, and a limited-time offer to upgrade. It turns a $150 one-time call into a $500/year recurring customer.",
    },
    {
      question: "How long does it take to build a custom pest control platform?",
      answer:
        "A core system with CRM, scheduling, and route optimization takes 3-4 months. A full platform with AI automation, customer portal, and chemical logging takes 4-6 months. We deliver in phases so you can start using features immediately.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "AI Automation", slug: "ai-automation" },
    { title: "Mobile Apps", slug: "mobile-apps" },
  ],

  relatedIndustries: [
    { name: "Home Services", slug: "home-services" },
    { name: "Tree Removal & Landscaping", slug: "landscaping" },
    { name: "HVAC & Plumbing", slug: "hvac-plumbing" },
    { name: "Contractors & Construction", slug: "contractors" },
  ],
};
