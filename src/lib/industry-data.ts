export type CRMFeature = {
  title: string;
  description: string;
  image?: string;
};

export type AICapability = {
  title: string;
  description: string;
};

export type Integration = {
  name: string;
  category: "Communication" | "Payment" | "Scheduling" | "AI" | "Analytics" | "Operations";
  description: string;
};

export type IndustryPageData = {
  // Hero
  icon: string;
  industry: string;
  slug: string;
  title: string;
  highlight: string;
  description: string;
  heroImage?: string;

  // Business Context
  businessContext: {
    heading: string;
    paragraphs: string[];
  };

  // Pain Points & Solutions
  painPoints: string[];
  solutions: string[];

  // CRM Features
  crmFeatures: CRMFeature[];

  // AI Automation
  aiCapabilities: AICapability[];

  // Industry-specific integrations
  integrations: Integration[];

  // FAQ
  faqs: { question: string; answer: string }[];

  // Related
  relatedServices: { title: string; slug: string }[];
  relatedIndustries: { name: string; slug: string }[];

  // SEO
  metaTitle: string;
  metaDescription: string;
  seoKeywords: string[];
};

// --- Shared Constants (rendered on every industry page) ---

export const CASE_STUDY = {
  industry: "luxury gift packaging",
  challenge:
    "A luxury gift packaging company was juggling customer inquiries across email and phone, managing complex custom orders on spreadsheets, and losing track of project timelines across disconnected tools. Their team spent hours each day on tasks that should have been automatic.",
  modules: [
    {
      title: "Customer Support Module",
      description:
        "AI-drafted response suggestions, ticket tracking with SLA timers, full conversation history per client, and automated escalation workflows.",
    },
    {
      title: "Project Management",
      description:
        "Visual order pipeline from quote to delivery, team task assignment with deadlines, real-time progress tracking, and automated status notifications.",
    },
    {
      title: "Order Tracking Portal",
      description:
        "Customer-facing portal with real-time order status, automated milestone updates via email and SMS, and branded tracking pages.",
    },
  ],
  outcome:
    "Consolidated 4 separate tools into one custom platform, cut average response time by 60%, and gave customers real-time visibility into every order — all for less than they were paying in annual SaaS subscriptions.",
};

export const TECH_STACK = [
  { name: "Next.js", category: "Frontend", description: "React framework for fast, SEO-optimized web apps" },
  { name: "React Native", category: "Mobile", description: "Cross-platform iOS and Android apps from one codebase" },
  { name: "PostgreSQL", category: "Database", description: "Enterprise-grade relational database that scales with you" },
  { name: "Node.js", category: "Backend", description: "High-performance server runtime for real-time applications" },
  { name: "Stripe", category: "Payments", description: "Payment processing, invoicing, and subscription billing" },
  { name: "Twilio", category: "Communication", description: "SMS, voice calls, IVR systems, and WhatsApp integration" },
  { name: "OpenAI", category: "AI", description: "GPT-powered automation, chat, drafts, and intelligent routing" },
  { name: "Docker", category: "Infrastructure", description: "Containerized deployment with zero-downtime updates" },
];
