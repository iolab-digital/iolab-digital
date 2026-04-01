import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "💐",
  industry: "Florists",
  slug: "florists",
  title: "Custom Software for",
  highlight: "Florists",
  description:
    "Replace bloated POS systems and wire services with a custom platform that handles orders, delivery, events, and customer relationships — your way.",
  heroImage: "https://iolab.nyc3.digitaloceanspaces.com/images/generated/industries/florists.png",

  metaTitle: "Custom Apps for Florists & Flower Shops",
  metaDescription:
    "Custom CRM, order management, and AI automation for florists. Replace wire services and generic POS with tools built for flower shops.",
  seoKeywords: [
    "florist CRM",
    "florist software",
    "custom florist app",
    "flower shop management",
    "florist order management",
    "florist AI automation",
    "florist delivery tracking",
  ],

  businessContext: {
    heading: "Florists Deserve Tools That Understand Seasonal, Event-Driven Business",
    paragraphs: [
      "Running a flower shop means managing perishable inventory, high-stakes event timelines, seasonal demand swings, and delivery logistics — all at once. Wire services like FTD and Teleflora take a massive cut of every order and barely give you tools to manage your own business. Meanwhile, generic POS systems don't understand that your 'inventory' wilts in 5 days.",
      "Your customers expect a premium, personal experience. They want custom arrangements for weddings, sympathy pieces with the right tone, and subscription deliveries that actually arrive fresh. But the tools you're using make it nearly impossible to track client preferences, manage event calendars, or automate the things that eat up your day.",
      "Florists who build custom platforms now — with AI-powered order management, event coordination tools, and intelligent customer outreach — will stand out in a market where most competitors are still relying on wire services and handwritten order slips.",
    ],
  },

  painPoints: [
    "Wire services take 20-30% of every order for minimal value",
    "Perishable inventory tracking is done mentally or on paper",
    "Event orders (weddings, funerals) managed through email threads",
    "No way to track customer preferences or occasion history",
    "Seasonal demand spikes overwhelm your ordering process",
  ],

  solutions: [
    "Custom order management with arrangement builder",
    "Perishable inventory tracking with shelf-life alerts",
    "Event and wedding coordination portal",
    "Customer profiles with occasion history and preferences",
    "Delivery route management and tracking",
    "Subscription and recurring arrangement plans",
    "Automated occasion reminders (birthdays, anniversaries)",
    "Custom e-commerce storefront with real-time availability",
  ],

  crmFeatures: [
    {
      title: "Customer Occasion Database",
      description:
        "Track every customer's important dates — birthdays, anniversaries, memorials. Automated reminders trigger before each occasion so they never forget (and neither do you).",
    },
    {
      title: "Order & Arrangement Manager",
      description:
        "Custom order flow with arrangement type, size, budget, delivery details, and card messages. Visual pipeline from order to design to delivery.",
    },
    {
      title: "Event Coordination Portal",
      description:
        "Manage wedding and event orders with timelines, consultations, mood boards, itemized quotes, and delivery schedules. Clients approve arrangements online.",
    },
    {
      title: "Perishable Inventory System",
      description:
        "Track flower stock by type, quantity, freshness date, and supplier. Get alerts when inventory is aging and needs to be used or discounted.",
    },
    {
      title: "Delivery Management",
      description:
        "Route-optimized delivery scheduling with driver tracking, delivery confirmation photos, and automatic customer notifications on dispatch and delivery.",
    },
    {
      title: "Subscription & Recurring Orders",
      description:
        "Set up weekly, bi-weekly, or monthly flower subscriptions. The system auto-generates orders, schedules deliveries, and bills automatically.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI Occasion Reminders",
      description:
        "AI identifies customers approaching important dates and sends personalized outreach — not generic blasts, but messages referencing what they ordered last year and suggesting similar or upgraded arrangements.",
    },
    {
      title: "Smart Inventory Suggestions",
      description:
        "AI analyzes sales patterns, upcoming orders, and seasonal trends to recommend purchase quantities from suppliers. Reduce waste and ensure you have the right blooms in stock.",
    },
    {
      title: "AI-Powered Upsell Recommendations",
      description:
        "When a customer places an order, AI suggests add-ons based on the occasion, past orders, and budget range — a vase upgrade, chocolates, or a card. Increase average order value naturally.",
    },
    {
      title: "Conversational Order Bot",
      description:
        "An AI chatbot on your website that helps customers describe what they want, suggests arrangements within their budget, and places orders — even outside business hours.",
    },
    {
      title: "Automated Review & Thank-You",
      description:
        "After each delivery, AI sends a thank-you message and review request. For event orders, it sends a follow-up survey about the experience with photos of the arrangements in place.",
    },
  ],

  integrations: [
    { name: "Twilio SMS", category: "Communication", description: "Delivery notifications, occasion reminders, and order confirmations" },
    { name: "SendGrid Email", category: "Communication", description: "Event proposals, occasion campaigns, and subscription confirmations" },
    { name: "Stripe Payments", category: "Payment", description: "Online ordering, subscription billing, and event deposits" },
    { name: "Square POS", category: "Payment", description: "In-store checkout synced with your order management system" },
    { name: "Google Maps API", category: "Operations", description: "Delivery route optimization and real-time driver tracking" },
    { name: "OpenAI GPT", category: "AI", description: "Occasion messaging, upsell suggestions, and conversational ordering" },
    { name: "Shopify / Custom Storefront", category: "Operations", description: "E-commerce integration with real-time inventory availability" },
    { name: "Google Business API", category: "Analytics", description: "Review management and local search optimization" },
  ],

  faqs: [
    {
      question: "Can you replace wire services like FTD and Teleflora?",
      answer:
        "Yes. We build custom e-commerce and order management platforms that let you take orders directly — no wire service commissions, no shared branding, no restrictions on your pricing or product range.",
    },
    {
      question: "How does perishable inventory tracking work?",
      answer:
        "The system tracks each flower type by quantity, freshness date, and supplier. You get alerts when stock needs to be used, discounted, or reordered. AI predicts demand based on upcoming orders and seasonal patterns to optimize your purchasing.",
    },
    {
      question: "Can it manage wedding and event orders?",
      answer:
        "Absolutely. Our event portal handles consultations, mood boards, itemized quotes, production timelines, and delivery logistics. Clients approve everything online, and your team gets a clear production schedule.",
    },
    {
      question: "How do automated occasion reminders work?",
      answer:
        "The system tracks customer occasions (birthdays, anniversaries, memorials) and triggers personalized outreach before each date. AI references their past orders and suggests arrangements — making reordering effortless.",
    },
    {
      question: "How long does it take to build a custom florist platform?",
      answer:
        "A core system with order management, CRM, and delivery tracking takes 3-4 months. A full platform with e-commerce, events, and AI automation takes 4-6 months. We deliver in phases so you start benefiting immediately.",
    },
  ],

  relatedServices: [
    { title: "Custom CRM", slug: "custom-crm" },
    { title: "Web Design", slug: "web-design" },
    { title: "Email Marketing", slug: "email-marketing" },
  ],

  relatedIndustries: [
    { name: "Restaurants & Bars", slug: "restaurants" },
    { name: "Salons & Spas", slug: "salons" },
    { name: "Real Estate", slug: "real-estate" },
    { name: "Dental & Medical", slug: "dental" },
  ],
};
