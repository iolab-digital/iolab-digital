export type ComparisonData = {
  slug: string;
  competitor: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  monthlyPrice: string;
  annualPrice5yr: string;
  customBuildRange: string;
  customMonthly: string;
  features: { feature: string; competitor: boolean | string; custom: boolean | string }[];
  competitorPros: string[];
  competitorCons: string[];
  customPros: string[];
  bestFor: { competitor: string; custom: string };
  faqs: { question: string; answer: string }[];
};

export const COMPARISONS: ComparisonData[] = [
  {
    slug: "salesforce",
    competitor: "Salesforce",
    tagline: "Enterprise CRM at enterprise prices — or a custom CRM that actually fits your business.",
    metaTitle: "iOLab Custom CRM vs Salesforce",
    metaDescription: "Compare Salesforce vs a custom-built CRM. See the real cost difference, feature comparison, and which is right for your small business.",
    keywords: ["Salesforce alternative", "Salesforce vs custom CRM", "replace Salesforce", "Salesforce for small business", "Salesforce cost"],
    monthlyPrice: "$75-$300/user/month",
    annualPrice5yr: "$45,000 - $180,000+",
    customBuildRange: "$25,000 - $40,000",
    customMonthly: "$200-$500/mo hosting",
    features: [
      { feature: "Contact & Lead Management", competitor: true, custom: true },
      { feature: "Deal Pipeline", competitor: true, custom: true },
      { feature: "Custom to YOUR Workflow", competitor: "Limited", custom: true },
      { feature: "AI Automation Built-In", competitor: "$50+/user extra", custom: true },
      { feature: "Per-Seat Pricing", competitor: true, custom: false },
      { feature: "You Own the Code", competitor: false, custom: true },
      { feature: "No Annual Price Increases", competitor: false, custom: true },
      { feature: "Custom Integrations", competitor: "Via AppExchange", custom: true },
      { feature: "Mobile App", competitor: true, custom: true },
      { feature: "Dedicated Support", competitor: "Premium tier only", custom: true },
    ],
    competitorPros: ["Massive ecosystem and marketplace", "Works for 50+ person sales teams", "Extensive third-party integrations", "Industry standard — everyone knows it"],
    competitorCons: ["$75-$300/user/month adds up fast", "80% of features go unused by small businesses", "Requires admin/consultant to manage", "AI features cost extra ($50+/user)", "Annual price increases guaranteed", "Data locked in their ecosystem"],
    customPros: ["Built for YOUR exact workflow", "One-time investment — you own it", "AI included from day one", "No per-seat pricing", "Your brand, your data", "Direct support from the team that built it"],
    bestFor: {
      competitor: "Large enterprises (50+ sales reps) with dedicated Salesforce admins, complex multi-department workflows, and budget for ongoing consulting.",
      custom: "Small to mid-size businesses (5-50 people) who want a CRM that matches their actual workflow, includes AI, and costs less over time.",
    },
    faqs: [
      { question: "Can a custom CRM really replace Salesforce?", answer: "For small businesses, absolutely. Most companies use less than 20% of Salesforce's features. A custom CRM gives you the 20% you actually need — built around your workflow, with AI included, at a fraction of the cost." },
      { question: "What about Salesforce's app marketplace?", answer: "Custom CRMs integrate directly with the tools you use (Stripe, QuickBooks, Twilio, etc.) without paying for marketplace connectors. You get exactly the integrations you need, built to work seamlessly." },
      { question: "How long does migration take?", answer: "We handle full data migration from Salesforce — contacts, deals, activities, custom fields. Typical migration takes 2-4 weeks as part of the build process. Your team doesn't skip a beat." },
      { question: "What if I need changes later?", answer: "That's the beauty of custom. Need a new field, workflow, or integration? We build it. No waiting for Salesforce to add a feature or paying for a premium tier to unlock it." },
    ],
  },
  {
    slug: "hubspot",
    competitor: "HubSpot",
    tagline: "Free to start, expensive to scale — or a custom platform that grows with you.",
    metaTitle: "iOLab vs HubSpot for Small Business",
    metaDescription: "Compare HubSpot vs custom-built software. HubSpot's free tier hooks you in, but costs explode as you grow. See the real 5-year comparison.",
    keywords: ["HubSpot alternative", "HubSpot vs custom CRM", "replace HubSpot", "HubSpot cost for small business"],
    monthlyPrice: "$0-$890+/month",
    annualPrice5yr: "$30,000 - $53,000+",
    customBuildRange: "$25,000 - $40,000",
    customMonthly: "$200-$500/mo hosting",
    features: [
      { feature: "CRM & Contacts", competitor: true, custom: true },
      { feature: "Email Marketing", competitor: true, custom: true },
      { feature: "Custom Workflows", competitor: "Pro tier ($890/mo)", custom: true },
      { feature: "AI Features", competitor: "Limited", custom: true },
      { feature: "No Contact Limits", competitor: "Paid tiers only", custom: true },
      { feature: "Custom Branding", competitor: "Pro tier only", custom: true },
      { feature: "You Own Your Data", competitor: false, custom: true },
      { feature: "No Feature Gating", competitor: false, custom: true },
      { feature: "Flat Pricing", competitor: false, custom: true },
      { feature: "Custom Reporting", competitor: "Pro tier", custom: true },
    ],
    competitorPros: ["Free tier to get started", "All-in-one marketing + sales + service", "Large template library", "Good for basic marketing automation"],
    competitorCons: ["Free tier is severely limited", "Pro tier jumps to $890/month", "Contact-based pricing penalizes growth", "Removing HubSpot branding requires paid plan", "Feature-gated — best features locked behind expensive tiers", "Expensive onboarding fees ($3,000+)"],
    customPros: ["All features from day one — no gating", "Flat pricing regardless of contact count", "Custom workflows without tier restrictions", "Your brand everywhere — no third-party logos", "AI automation included", "No onboarding fees"],
    bestFor: {
      competitor: "Early-stage businesses that need free basic tools and don't mind upgrading to expensive tiers as they grow.",
      custom: "Growing businesses that need real automation, custom workflows, and don't want to pay $890/month for features that should be standard.",
    },
    faqs: [
      { question: "Is HubSpot really free?", answer: "The free CRM is genuinely free — but severely limited. No automation, HubSpot branding on everything, 5 email templates, and basic reporting. Most businesses outgrow it within 6 months and face a jump to $890/month for Pro." },
      { question: "Can you migrate from HubSpot?", answer: "Yes. We migrate all your contacts, deals, email templates, and workflows. The transition is seamless — your team keeps working while we build and switch over." },
      { question: "What about HubSpot's marketing tools?", answer: "A custom platform includes email marketing, landing pages, forms, and automation — all built around your specific funnel, not a generic template. Plus AI personalization that HubSpot charges extra for." },
      { question: "Does custom scale better than HubSpot?", answer: "Absolutely. HubSpot charges more as your contact list grows. Custom has flat hosting costs regardless of whether you have 1,000 or 100,000 contacts." },
    ],
  },
  {
    slug: "monday",
    competitor: "Monday.com",
    tagline: "Project management for everyone — or project management built for YOUR team.",
    metaTitle: "iOLab vs Monday.com for Business",
    metaDescription: "Compare Monday.com vs a custom project management platform. Per-seat pricing vs flat-rate ownership. See which makes more sense for your business.",
    keywords: ["Monday.com alternative", "replace Monday.com", "Monday vs custom project management", "Monday.com cost"],
    monthlyPrice: "$9-$19/seat/month",
    annualPrice5yr: "$10,000 - $45,000+",
    customBuildRange: "$20,000 - $35,000",
    customMonthly: "$200-$500/mo hosting",
    features: [
      { feature: "Kanban Boards", competitor: true, custom: true },
      { feature: "Custom Workflows", competitor: "Limited", custom: true },
      { feature: "CRM Integration", competitor: "Add-on", custom: true },
      { feature: "Invoicing Built-In", competitor: false, custom: true },
      { feature: "Client Portal", competitor: false, custom: true },
      { feature: "AI Automation", competitor: "Limited", custom: true },
      { feature: "Per-Seat Pricing", competitor: true, custom: false },
      { feature: "Custom Branding", competitor: false, custom: true },
      { feature: "Offline Access", competitor: false, custom: true },
      { feature: "You Own the Platform", competitor: false, custom: true },
    ],
    competitorPros: ["Visual and intuitive interface", "Lots of templates to start from", "Good collaboration features", "Works across many use cases"],
    competitorCons: ["Per-seat pricing punishes growing teams", "CRM, invoicing, etc. are separate add-ons", "Limited customization beyond templates", "No client-facing portal", "Data locked in their platform", "Gets expensive fast with 10+ seats"],
    customPros: ["PM + CRM + invoicing + portal in one system", "Flat pricing for unlimited users", "Built around your specific project types", "Client portal included", "AI automates task assignment and reminders", "Your data, your code, forever"],
    bestFor: {
      competitor: "Small teams (under 10) with standard project management needs who want a quick, template-based solution.",
      custom: "Growing teams where project management needs to connect with CRM, invoicing, and client communication in one integrated system.",
    },
    faqs: [
      { question: "Can you replace Monday.com?", answer: "Yes. We build custom project management with Kanban boards, task tracking, team workload, and Gantt timelines — plus CRM, invoicing, and client portals that Monday doesn't offer natively." },
      { question: "How does per-seat pricing compare?", answer: "Monday charges $9-$19 per seat per month. A 15-person team pays $135-$285/month ($8,100-$17,100 over 5 years). A custom platform has flat hosting costs regardless of team size." },
      { question: "Can clients see project status?", answer: "Unlike Monday, a custom platform includes a branded client portal where clients check project status, approve deliverables, and communicate with your team — reducing 'what's the status?' calls by 80%." },
      { question: "What about Monday's automations?", answer: "Custom automations go far beyond Monday's recipe builder. We build AI-powered task assignment, predictive deadline alerts, automated client updates, and workflow triggers specific to your process." },
    ],
  },
  {
    slug: "zendesk",
    competitor: "Zendesk",
    tagline: "Help desk software for the masses — or a support system built for YOUR customers.",
    metaTitle: "iOLab vs Zendesk for Customer Support",
    metaDescription: "Compare Zendesk vs a custom support platform. See why small businesses are replacing expensive help desk software with custom-built systems.",
    keywords: ["Zendesk alternative", "replace Zendesk", "Zendesk vs custom support", "Zendesk cost small business"],
    monthlyPrice: "$55-$115/agent/month",
    annualPrice5yr: "$16,500 - $69,000+",
    customBuildRange: "$15,000 - $25,000",
    customMonthly: "$200-$500/mo hosting",
    features: [
      { feature: "Ticket Management", competitor: true, custom: true },
      { feature: "AI Chatbot", competitor: "$50+/mo extra", custom: true },
      { feature: "AI Response Drafts", competitor: "Premium only", custom: true },
      { feature: "IVR Phone System", competitor: "Zendesk Talk add-on", custom: true },
      { feature: "CRM Integration", competitor: "Via marketplace", custom: true },
      { feature: "Custom SLA Rules", competitor: true, custom: true },
      { feature: "Per-Agent Pricing", competitor: true, custom: false },
      { feature: "Branded Portal", competitor: "Limited", custom: true },
      { feature: "You Own the Platform", competitor: false, custom: true },
      { feature: "Custom Workflows", competitor: "Enterprise only", custom: true },
    ],
    competitorPros: ["Industry-standard help desk", "Large integration marketplace", "Proven at scale", "Good knowledge base builder"],
    competitorCons: ["$55-$115 per agent per month", "AI features are expensive add-ons", "Per-agent pricing punishes growth", "Customization limited to Enterprise tier", "Complex setup for full functionality", "Phone support costs extra"],
    customPros: ["AI chatbot + response drafts included", "IVR phone system built in", "Flat pricing — no per-agent fees", "CRM data connected to support tickets", "Fully branded customer portal", "Custom workflows from day one"],
    bestFor: {
      competitor: "Large support teams (20+ agents) with complex multi-channel support needs and budget for per-agent pricing.",
      custom: "Small to mid-size teams (2-15 agents) who want AI-powered support with CRM integration at a fraction of the per-agent cost.",
    },
    faqs: [
      { question: "Can a custom system handle the volume Zendesk handles?", answer: "For small to mid-size businesses, absolutely. Our custom platforms handle thousands of tickets per month with AI automation reducing manual work by 60%+. For 100+ agent operations, Zendesk may still be appropriate." },
      { question: "What about Zendesk's AI features?", answer: "Zendesk charges extra for AI. With a custom system, AI response drafts, chatbots, and smart routing are built in from day one — no per-interaction fees or premium tier requirements." },
      { question: "Can it integrate with our existing CRM?", answer: "Better — it IS your CRM. A custom support system connects directly to your customer database, so agents see full customer history, purchase data, and previous interactions instantly." },
      { question: "How does the AI chatbot compare?", answer: "Our AI chatbot is trained on YOUR business data, speaks in YOUR brand voice, and handles YOUR specific FAQ. Zendesk's bot requires extensive setup and charges per resolution." },
    ],
  },
  {
    slug: "servicetitan",
    competitor: "ServiceTitan",
    tagline: "Enterprise field service software — at enterprise prices. There's a better way.",
    metaTitle: "iOLab vs ServiceTitan for Service Businesses",
    metaDescription: "Compare ServiceTitan vs a custom field service platform. ServiceTitan costs $400+/month. See why contractors and HVAC companies are switching to custom.",
    keywords: ["ServiceTitan alternative", "replace ServiceTitan", "ServiceTitan cost", "ServiceTitan vs custom", "field service software alternative"],
    monthlyPrice: "$300-$500+/month",
    annualPrice5yr: "$18,000 - $30,000+",
    customBuildRange: "$30,000 - $45,000",
    customMonthly: "$200-$500/mo hosting",
    features: [
      { feature: "Dispatch & Scheduling", competitor: true, custom: true },
      { feature: "Estimate & Invoice", competitor: true, custom: true },
      { feature: "Custom Workflows", competitor: "Limited", custom: true },
      { feature: "AI Automation", competitor: "Limited", custom: true },
      { feature: "Route Optimization", competitor: true, custom: true },
      { feature: "Customer Portal", competitor: "Basic", custom: true },
      { feature: "Marketing Tools", competitor: "Add-on", custom: true },
      { feature: "Flat Monthly Pricing", competitor: false, custom: true },
      { feature: "You Own the Platform", competitor: false, custom: true },
      { feature: "Custom Mobile App", competitor: "Their branded app", custom: true },
    ],
    competitorPros: ["Purpose-built for home services", "Strong dispatch and routing", "Large user community", "Comprehensive feature set"],
    competitorCons: ["$400+/month is prohibitive for small shops", "Long-term contracts often required", "Overwhelming feature bloat", "Limited customization", "Their branding, not yours", "Expensive onboarding ($2,000+)"],
    customPros: ["Built for YOUR specific service type", "Own it outright — no monthly license", "AI dispatch and smart routing included", "Your branded mobile app", "Customer portal with your branding", "Integrates with your accounting system"],
    bestFor: {
      competitor: "Large service companies (50+ techs) with big budgets who need an all-in-one platform and can absorb the monthly cost.",
      custom: "Growing service businesses (5-30 techs) who want ServiceTitan-level features without the $400+/month price tag and mandatory contracts.",
    },
    faqs: [
      { question: "Can you really replace ServiceTitan?", answer: "For small to mid-size service businesses, yes. We build custom dispatch, scheduling, invoicing, and route optimization — all the features you actually use, without the $400/month price tag and features you don't need." },
      { question: "What about ServiceTitan's mobile app?", answer: "We build a custom mobile app branded to YOUR company. Techs see your logo, your colors, your workflow — not ServiceTitan's. Works offline, includes GPS tracking, and syncs when back online." },
      { question: "How does pricing compare long-term?", answer: "ServiceTitan: $400+/month × 60 months = $24,000+ (and rising). Custom: $35,000 one-time + $300/month hosting = $53,000 over 5 years. BUT you own it forever and costs flatten. By year 4, custom is significantly cheaper." },
      { question: "Can it handle maintenance agreements?", answer: "Absolutely. We build custom maintenance agreement tracking with auto-scheduling, renewal reminders, and automated billing — features ServiceTitan offers but charges premium for." },
    ],
  },
];

export const ALL_COMPARISON_SLUGS = COMPARISONS.map((c) => c.slug);

export function getComparison(slug: string): ComparisonData | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
