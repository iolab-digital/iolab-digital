import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "🚗",
  industry: "Auto Shops",
  slug: "auto-shops",
  title: "Custom Software for",
  highlight: "Auto Shops",
  description:
    "Replace Shop-Ware, Mitchell, and Tekmetric with a custom platform built around your bays, your techs, and your customers.",

  metaTitle: "Custom Apps for Auto Repair Shops",
  metaDescription:
    "Custom CRM, digital vehicle inspections, and AI automation for auto repair shops. Replace expensive shop management software.",
  seoKeywords: [
    "auto shop CRM",
    "auto repair software",
    "custom auto shop app",
    "digital vehicle inspection",
    "auto shop AI automation",
    "auto repair scheduling",
    "auto shop management system",
  ],

  businessContext: {
    heading: "Auto Shops Need Vehicle-Centric Software, Not Generic CRM",
    paragraphs: [
      "An auto repair shop doesn't manage 'contacts' — you manage vehicles. Every car that rolls into your bay has a history: past repairs, known issues, upcoming maintenance, tire specs, and warranty status. But Shop-Ware and Tekmetric charge premium prices for systems that still treat vehicle data as an afterthought.",
      "Your customers expect transparency now more than ever. They want digital inspections with photos, upfront pricing, text updates when their car is ready, and the ability to approve repairs from their phone. If your shop can't deliver that experience, the one down the street will.",
      "Auto shops that adopt custom CRM and AI now will build deeper customer trust, sell more recommended services, and run their bays at higher efficiency. Digital inspections, AI-powered service recommendations, and automated follow-ups are the new standard — early adopters win.",
    ],
  },

  painPoints: [
    "Shop management software costs $200-$500/mo and doesn't fit your workflow",
    "Vehicle history scattered across paper files and legacy systems",
    "Digital inspections require expensive third-party add-ons",
    "Customers don't understand what's wrong or why repairs cost what they do",
    "No automated system for declined service follow-ups",
  ],

  solutions: [
    "Custom CRM with vehicle-centric profiles and full service history",
    "Digital vehicle inspections with photos and videos",
    "Automated text updates on repair status",
    "Online appointment booking with service menu",
    "Declined service tracking with automated follow-ups",
    "Bay management board with real-time job status",
    "Branded customer portal with vehicle records",
    "Parts ordering integration and inventory tracking",
  ],

  crmFeatures: [
    {
      title: "Vehicle Profiles & Service History",
      description:
        "Complete vehicle records with VIN, mileage, past services, parts used, and manufacturer maintenance schedules. Your techs see the full picture before popping the hood.",
    },
    {
      title: "Digital Vehicle Inspection (DVI)",
      description:
        "Techs capture photos and videos during inspections. Customers see exactly what's going on with red/yellow/green condition indicators and approve repairs from their phone.",
    },
    {
      title: "Bay Management Board",
      description:
        "Visual board showing every bay, current job status, tech assignment, and estimated completion. Your service advisors know exactly where every vehicle stands.",
    },
    {
      title: "Declined Service Tracker",
      description:
        "When a customer declines a recommended repair, the system tracks it and triggers follow-up reminders at the right interval. Recover lost revenue without being pushy.",
    },
    {
      title: "Customer Communication Hub",
      description:
        "Automated text updates at each stage — vehicle received, inspection complete, repairs in progress, ready for pickup. Customers never have to call and ask 'is it done yet?'",
    },
    {
      title: "Revenue & Tech Performance",
      description:
        "Track hours flagged vs. hours billed, average repair order value, service type breakdown, and customer retention rates. Data-driven management for your shop.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI Service Recommendations",
      description:
        "Based on vehicle age, mileage, service history, and manufacturer schedules, AI generates personalized maintenance recommendations. Your service advisors present data-backed suggestions, not guesses.",
    },
    {
      title: "AI-Powered Inspection Reports",
      description:
        "AI turns technician inspection notes into professional, customer-friendly reports with plain-English explanations. Customers understand the 'why' behind every recommendation.",
    },
    {
      title: "Automated Declined Service Recovery",
      description:
        "AI sends personalized follow-ups on declined services — timed based on urgency and the customer's communication preferences. Includes a reminder of what was found and why it matters.",
    },
    {
      title: "Smart Scheduling & Bay Optimization",
      description:
        "AI estimates job durations based on vehicle type and repair complexity, then optimizes bay assignments to maximize throughput and minimize tech idle time.",
    },
    {
      title: "AI Review Response & Reputation",
      description:
        "AI drafts professional responses to Google and Yelp reviews in your shop's voice. Positive reviews get a thank-you. Negative reviews get a thoughtful response that shows you care.",
    },
  ],

  integrations: [
    { name: "Twilio SMS", category: "Communication", description: "Repair status updates, appointment reminders, and pickup notifications" },
    { name: "SendGrid Email", category: "Communication", description: "Digital inspection reports, maintenance reminders, and marketing campaigns" },
    { name: "Stripe / Square", category: "Payment", description: "Online payment approval, financing applications, and invoicing" },
    { name: "QuickBooks / Xero", category: "Payment", description: "Invoice sync, parts expense tracking, and financial reporting" },
    { name: "VIN Decoder APIs", category: "Operations", description: "Automatic vehicle info lookup, recall checking, and maintenance schedules" },
    { name: "OpenAI GPT", category: "AI", description: "Inspection report generation, service recommendations, and customer communications" },
    { name: "Parts Supplier APIs", category: "Operations", description: "Real-time parts pricing, availability checking, and ordering" },
    { name: "Google Business API", category: "Analytics", description: "Review monitoring, response management, and local SEO tracking" },
  ],

  faqs: [
    {
      question: "Can you replace our current shop management software?",
      answer:
        "Yes. We build custom platforms with vehicle-centric CRM, digital inspections, bay management, and automated customer communication — all tailored to your shop's workflow instead of a one-size-fits-all template.",
    },
    {
      question: "How do digital vehicle inspections work?",
      answer:
        "Your tech performs the inspection and captures photos/videos on their phone or tablet. The system generates a visual report with red/yellow/green indicators that's texted to the customer. They can approve repairs right from the link.",
    },
    {
      question: "Can it look up vehicle information by VIN?",
      answer:
        "Absolutely. Enter a VIN and the system auto-populates year, make, model, engine, and manufacturer maintenance schedule. It also checks for open recalls and known issues.",
    },
    {
      question: "How does declined service follow-up work?",
      answer:
        "When a customer declines a repair, the system tracks it and triggers follow-ups — a reminder text after 30 days, a seasonal safety check email, or a notification when mileage hits a threshold. It's persistent but not pushy.",
    },
    {
      question: "How long does it take to build a custom auto shop platform?",
      answer:
        "A core system with CRM, digital inspections, and scheduling takes 3-4 months. A full platform with AI recommendations, customer portal, and parts integration takes 5-6 months. We deliver in phases so your shop starts benefiting immediately.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "Mobile Apps", slug: "mobile-apps" },
    { title: "AI Automation", slug: "ai-automation" },
  ],

  relatedIndustries: [
    { name: "Contractors & Construction", slug: "contractors" },
    { name: "HVAC & Plumbing", slug: "hvac-plumbing" },
    { name: "Home Services", slug: "home-services" },
    { name: "Real Estate", slug: "real-estate" },
  ],
};
