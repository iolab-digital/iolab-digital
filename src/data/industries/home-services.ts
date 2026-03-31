import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "🏠",
  industry: "Home Services",
  slug: "home-services",
  title: "Custom Apps for",
  highlight: "Home Services",
  description:
    "Cleaning, handyman, painting, moving — we build custom tools that replace expensive field service software and give you a competitive edge.",

  metaTitle: "Custom Apps for Home Service Businesses",
  metaDescription:
    "Custom CRM, scheduling, and AI automation for cleaning, handyman, painting, moving, and general home service businesses.",
  seoKeywords: [
    "home services CRM",
    "cleaning business software",
    "handyman scheduling app",
    "home service management",
    "field service app development",
    "home services AI automation",
    "custom booking system",
  ],

  businessContext: {
    heading: "Home Service Businesses Deserve Custom Tools, Not Generic SaaS",
    paragraphs: [
      "Whether you run a cleaning company, handyman service, painting crew, or moving business, the pattern is the same: you're paying $200-$400 per month for field service software that's 70% features you don't use and missing the 3 things you actually need. The scheduling doesn't match your workflow. The invoicing doesn't support your pricing model. And the customer portal looks like every other company in town.",
      "Your customers expect a modern, professional experience — easy online booking, real-time updates, and transparent pricing. But the generic tools available to you make that nearly impossible without duct-taping five different apps together.",
      "The home service businesses that invest in custom CRM and AI automation now will be the ones that dominate local search, convert more leads, and keep customers coming back. AI-powered scheduling, automated follow-ups, and intelligent routing are no longer enterprise-only features — they're affordable and accessible for businesses of every size.",
    ],
  },

  painPoints: [
    "Paying $200-$400/mo for field service management",
    "Scheduling and dispatch requires constant manual updates",
    "Customers can't easily book or check service status",
    "Invoicing and payments are separate from job management",
    "No good way to track recurring service contracts",
  ],

  solutions: [
    "Custom scheduling and dispatch system",
    "Customer self-service booking portal",
    "Automated invoicing and payment collection",
    "Recurring service contract management",
    "Route optimization for service crews",
    "Before/after photo documentation",
    "Automated follow-up and review requests",
    "Custom reporting and crew performance tracking",
  ],

  crmFeatures: [
    {
      title: "Customer Database & History",
      description:
        "Every customer's service history, preferences, property details, and communication log in one place. Your team knows exactly what to expect before they arrive on site.",
    },
    {
      title: "Online Booking Portal",
      description:
        "Branded booking page where customers select services, choose dates, see pricing, and book instantly. Automated confirmations and reminders reduce no-shows.",
    },
    {
      title: "Scheduling & Dispatch Board",
      description:
        "Visual scheduling with drag-and-drop crew assignment, availability tracking, and travel time awareness. Your team gets push notifications with job details and directions.",
    },
    {
      title: "Recurring Service Management",
      description:
        "Set up weekly, bi-weekly, or monthly service plans. The system auto-schedules recurring visits, sends reminders, and generates invoices without manual intervention.",
    },
    {
      title: "Invoicing & Online Payments",
      description:
        "Generate branded invoices from completed jobs. Customers pay online via credit card or ACH. Automated payment reminders chase outstanding balances for you.",
    },
    {
      title: "Crew Performance Tracking",
      description:
        "Track job completion times, customer ratings, revenue per crew, and on-time arrival rates. Identify your top performers and spots for improvement.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI-Powered Lead Response",
      description:
        "When a new inquiry comes in, AI instantly responds with availability, pricing estimates, and booking links — even at 10pm on a Saturday. No more leads going cold overnight.",
    },
    {
      title: "Smart Route Optimization",
      description:
        "AI maps the most efficient daily routes for your crews based on job locations, durations, and traffic. Less driving means more jobs per day and lower fuel costs.",
    },
    {
      title: "Automated Review Generation",
      description:
        "After every completed job, AI sends a personalized review request. It even adjusts timing and messaging based on the customer's communication preferences and satisfaction signals.",
    },
    {
      title: "Predictive Demand Forecasting",
      description:
        "AI analyzes seasonal patterns, weather data, and local events to predict busy periods. Staff up before the rush, not during it.",
    },
    {
      title: "Conversational Booking Bot",
      description:
        "An AI chatbot on your website that handles booking questions, provides instant quotes for common services, and schedules appointments — reducing phone calls by up to 50%.",
    },
  ],

  integrations: [
    { name: "Twilio SMS & Voice", category: "Communication", description: "Job reminders, on-my-way notifications, and customer updates via text" },
    { name: "SendGrid Email", category: "Communication", description: "Booking confirmations, invoices, and marketing campaigns" },
    { name: "Stripe / Square", category: "Payment", description: "Online payments, recurring billing, and field payment processing" },
    { name: "QuickBooks / Xero", category: "Payment", description: "Automatic sync of invoices, expenses, and payroll data" },
    { name: "Google Maps API", category: "Operations", description: "Route optimization, travel time estimates, and service area mapping" },
    { name: "OpenAI GPT", category: "AI", description: "Lead response automation, review responses, and booking chatbot" },
    { name: "Google Business API", category: "Analytics", description: "Review monitoring, response automation, and local SEO tracking" },
    { name: "Calendly / Custom Booking", category: "Scheduling", description: "Customer self-service scheduling with service type selection" },
  ],

  faqs: [
    {
      question: "Can you build a booking system for my home services business?",
      answer:
        "Yes. We build customer-facing booking portals where clients can schedule services, view available time slots, and receive automated confirmations — all branded to your business.",
    },
    {
      question: "How does recurring service management work?",
      answer:
        "We build systems that track service contracts, automatically schedule recurring visits, send reminders to customers, and generate invoices — eliminating the manual work of managing repeat clients.",
    },
    {
      question: "Can my technicians use it on their phones?",
      answer:
        "Absolutely. We build mobile-first applications so your field team can view schedules, navigate to jobs, capture before/after photos, collect signatures, and process payments from their phones.",
    },
    {
      question: "Will it help us get more reviews?",
      answer:
        "Yes. Our automated review request system sends a personalized SMS or email after each completed job, making it easy for satisfied customers to leave Google or Yelp reviews — which directly boosts your local search rankings.",
    },
    {
      question: "How does AI automation benefit a home services company?",
      answer:
        "AI responds to leads instantly (even after hours), optimizes daily routes to fit more jobs in, predicts busy seasons so you staff appropriately, and handles routine booking through a chatbot. It's the operational efficiency that used to require a full-time office manager.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "Mobile Apps", slug: "mobile-apps" },
    { title: "SEO & Content", slug: "seo" },
  ],

  relatedIndustries: [
    { name: "Pest Control", slug: "pest-control" },
    { name: "HVAC & Plumbing", slug: "hvac-plumbing" },
    { name: "Tree Removal & Landscaping", slug: "landscaping" },
    { name: "Contractors & Construction", slug: "contractors" },
  ],
};
