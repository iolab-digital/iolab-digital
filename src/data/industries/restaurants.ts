import type { IndustryPageData } from "@/lib/industry-data";

export const data: IndustryPageData = {
  icon: "🍽️",
  industry: "Restaurants & Bars",
  slug: "restaurants",
  title: "Custom Tech for",
  highlight: "Restaurants",
  description:
    "Stop paying Toast, Square, Yelp, and Mailchimp separately. We build one custom platform that handles it all — branded to your restaurant.",

  metaTitle: "Custom Apps for Restaurants & Bars",
  metaDescription:
    "Replace Toast, Square, and Mailchimp with ONE custom platform. Custom POS, ordering apps, CRM, and marketing automation for restaurants.",
  seoKeywords: [
    "restaurant app development",
    "custom restaurant POS",
    "restaurant CRM",
    "restaurant marketing automation",
    "custom ordering app",
    "restaurant AI automation",
    "restaurant management software",
  ],

  businessContext: {
    heading: "Your Restaurant Deserves Better Than Generic Software",
    paragraphs: [
      "Running a restaurant means juggling reservations, online orders, staff schedules, customer loyalty, marketing, and a dozen other moving parts. Most owners end up cobbling together five or six different apps — Toast for POS, OpenTable for reservations, Mailchimp for emails, Yelp for reviews — each with its own monthly bill and none of them talking to each other.",
      "The result? Customer data lives in silos. A regular who orders online every Friday night looks like a stranger when they walk in the door. Your marketing blasts go to everyone instead of targeting your best customers. And you're paying $500+ per month for tools that were never designed for how YOUR restaurant actually operates.",
      "There's a better way. A single custom platform — built around your menu, your service style, and your brand — that replaces the patchwork and gives you a real competitive edge. And with AI now accessible to businesses of every size, the restaurants that move first will own their market.",
    ],
  },

  painPoints: [
    "Paying $200+/mo for POS, $100/mo for email, $50/mo for reservations",
    "Customer data spread across 5 different platforms",
    "Generic loyalty programs that don't match your brand",
    "No way to track customer preferences across visits",
    "Menu updates require calling support or logging into 3 systems",
  ],

  solutions: [
    "Custom ordering and menu management system",
    "Branded loyalty and rewards app",
    "Automated email and SMS marketing",
    "Unified customer database with visit history",
    "Online reservation and waitlist system",
    "Kitchen display and order management",
    "Review management and reputation monitoring",
    "Custom analytics dashboard with real-time revenue tracking",
  ],

  crmFeatures: [
    {
      title: "Guest Profiles & Preferences",
      description:
        "Automatically build rich guest profiles from every touchpoint — online orders, reservations, loyalty check-ins. Know their favorite dishes, dietary restrictions, and visit frequency without asking.",
    },
    {
      title: "Reservation & Waitlist Management",
      description:
        "Custom booking system with real-time table availability, automated confirmation texts, waitlist management, and no-show tracking — all branded to your restaurant.",
    },
    {
      title: "Order Pipeline & Kitchen Display",
      description:
        "Track every order from placement to plating. Kitchen display integration shows your team exactly what to prepare, with timing coordinated across courses.",
    },
    {
      title: "Loyalty & Rewards Engine",
      description:
        "Design your own rewards program — points per visit, birthday perks, VIP tiers. Customers engage with YOUR brand, not a third-party app, and you own every data point.",
    },
    {
      title: "Marketing Automation Hub",
      description:
        "Send targeted campaigns based on actual behavior — re-engage lapsed customers, promote slow nights to regulars, trigger birthday offers automatically. No more spray-and-pray.",
    },
    {
      title: "Revenue & Performance Dashboard",
      description:
        "Real-time sales by day, item, server, and channel. See what's working, what's not, and make decisions with data instead of gut feeling.",
    },
  ],

  aiCapabilities: [
    {
      title: "AI-Powered Review Responses",
      description:
        "AI drafts personalized responses to Google and Yelp reviews in your brand voice. Your manager reviews and sends in seconds instead of spending 30 minutes writing from scratch.",
    },
    {
      title: "Smart Menu Optimization",
      description:
        "AI analyzes ordering patterns, seasonality, and margins to recommend menu changes — which items to promote, which to retire, and optimal pricing strategies.",
    },
    {
      title: "Automated Customer Re-engagement",
      description:
        "When a regular hasn't visited in 3 weeks, AI triggers a personalized offer via text. Not a generic coupon — a message referencing their usual order and a reason to come back.",
    },
    {
      title: "Intelligent Staffing Suggestions",
      description:
        "AI predicts busy and slow periods based on historical data, local events, and weather to recommend optimal staffing levels for each shift.",
    },
    {
      title: "Conversational Ordering Assistant",
      description:
        "An AI chatbot on your website or app that handles takeout orders, answers menu questions, and processes reservations 24/7 — without tying up your phone line.",
    },
  ],

  integrations: [
    { name: "Twilio SMS & Voice", category: "Communication", description: "Automated reservation confirmations, order updates, and promotional texts" },
    { name: "SendGrid Email", category: "Communication", description: "Transactional emails and marketing campaigns at scale" },
    { name: "Stripe Payments", category: "Payment", description: "Online ordering payments, deposits, and gift card processing" },
    { name: "Square POS", category: "Payment", description: "Sync with existing Square hardware or build a custom POS layer" },
    { name: "Google Business API", category: "Analytics", description: "Automated review monitoring and response publishing" },
    { name: "OpenAI GPT", category: "AI", description: "Review response drafts, menu descriptions, and customer communication" },
    { name: "Google Analytics", category: "Analytics", description: "Website and ordering funnel tracking with custom events" },
    { name: "DoorDash Drive API", category: "Operations", description: "Offer delivery through your own platform without marketplace fees" },
  ],

  faqs: [
    {
      question: "Can you replace our current POS system?",
      answer:
        "Yes. We build custom ordering and menu management systems that can replace or integrate with existing POS hardware. We handle the full transition, including data migration and staff training.",
    },
    {
      question: "How do custom loyalty apps compare to third-party programs?",
      answer:
        "Custom loyalty apps are branded 100% to your restaurant — your logo, your colors, your rewards structure. Unlike generic programs, customers engage directly with YOUR brand, and you own all the customer data.",
    },
    {
      question: "Can you build an online ordering system?",
      answer:
        "Absolutely. We build custom online ordering with your branding, your menu structure, and direct integration with your kitchen workflow. No third-party commission fees like DoorDash or UberEats.",
    },
    {
      question: "How long does a restaurant app take to build?",
      answer:
        "A focused restaurant app (ordering + loyalty) takes about 3-4 months. A comprehensive platform with CRM, marketing, and analytics takes 4-6 months. We deliver in phases so you can start using features as they're completed.",
    },
    {
      question: "How does AI automation help my restaurant specifically?",
      answer:
        "AI handles the repetitive work — drafting review responses, sending personalized re-engagement texts, optimizing your menu based on real data, and answering customer questions 24/7 through a chatbot. Your team focuses on hospitality while AI handles the admin.",
    },
  ],

  relatedServices: [
    { title: "Custom Mobile Apps", slug: "mobile-apps" },
    { title: "Email Marketing", slug: "email-marketing" },
    { title: "AI Automation", slug: "ai-automation" },
  ],

  relatedIndustries: [
    { name: "Salons & Spas", slug: "salons" },
    { name: "Florists", slug: "florists" },
    { name: "Home Services", slug: "home-services" },
    { name: "Dental & Medical", slug: "dental" },
  ],
};
