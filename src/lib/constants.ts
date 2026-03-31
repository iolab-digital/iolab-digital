import {
  Monitor,
  Smartphone,
  Bot,
  Mail,
  Search,
  Megaphone,
  Database,
  Headphones,
} from "lucide-react";

export const CDN = "https://iolab.nyc3.digitaloceanspaces.com";

export const SITE = {
  name: "iOLab Digital",
  tagline: "Custom Apps. AI Automation. Zero SaaS Fees.",
  description:
    "Stop renting software. Start owning it. Custom CRM, mobile apps, AI automation & digital marketing — delivered for a fraction of the cost.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://iolab.co",
  email: "hello@iolab.co",
  phone: "(609) 200-1127",
  address: "Medford, New Jersey",
  social: {
    instagram: "https://www.instagram.com/iolab_digital/",
    linkedin: "https://www.linkedin.com/in/rauf-tur/",
    youtube: "https://www.youtube.com/@iolab_digital",
  },
};

export const NAV_LINKS = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Custom CRM", href: "/services/custom-crm" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Web Design & Dev", href: "/services/web-design" },
      { label: "Email Marketing", href: "/services/email-marketing" },
      { label: "SEO & Content", href: "/services/seo" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export const SERVICES = [
  {
    title: "Custom CRM Development",
    slug: "custom-crm",
    description:
      "Replace Salesforce & HubSpot with a CRM built to your exact workflow. Your brand, your features, your data.",
    icon: Database,
  },
  {
    title: "Custom Mobile Apps",
    slug: "mobile-apps",
    description:
      "iOS & Android apps custom-built for your business. Customer-facing or internal — fully branded and owned by you.",
    icon: Smartphone,
  },
  {
    title: "AI Automation",
    slug: "ai-automation",
    description:
      "AI chatbots, workflow automation, smart scheduling & AI-powered customer service that works 24/7.",
    icon: Bot,
  },
  {
    title: "Customer Service Apps",
    slug: "custom-crm",
    description:
      "Custom support portals, ticketing systems, and client dashboards — no more generic SaaS tools.",
    icon: Headphones,
  },
  {
    title: "Web Design & Development",
    slug: "web-design",
    description:
      "High-performance custom websites that convert visitors into customers. No templates, no page builders.",
    icon: Monitor,
  },
  {
    title: "Email Marketing Automation",
    slug: "email-marketing",
    description:
      "Automated email campaigns that nurture leads and drive revenue on autopilot.",
    icon: Mail,
  },
  {
    title: "SEO & Content",
    slug: "seo",
    description:
      "Dominate local search. Get found by customers actively looking for your services.",
    icon: Search,
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Full-funnel digital marketing — PPC, social media, content strategy — all data-driven.",
    icon: Megaphone,
  },
];

export const INDUSTRIES = [
  { name: "Restaurants & Bars", icon: "🍽️", slug: "restaurants" },
  { name: "Contractors & Construction", icon: "🔨", slug: "contractors" },
  { name: "Dental & Medical", icon: "🦷", slug: "dental" },
  { name: "Home Services", icon: "🏠", slug: "home-services" },
  { name: "Pest Control", icon: "🐛", slug: "pest-control" },
  { name: "Tree Removal & Landscaping", icon: "🌳", slug: "landscaping" },
  { name: "HVAC & Plumbing", icon: "🔧", slug: "hvac-plumbing" },
  { name: "Auto Shops", icon: "🚗", slug: "auto-shops" },
  { name: "Salons & Spas", icon: "💈", slug: "salons" },
  { name: "Law Firms", icon: "⚖️", slug: "law-firms" },
  { name: "Florists", icon: "💐", slug: "florists" },
  { name: "Real Estate", icon: "🏢", slug: "real-estate" },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Apps Built" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Clients Served" },
  { value: 500, suffix: "K+", label: "Saved for Clients" },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Discover",
    description:
      "We audit your current tools, map your workflows, and identify exactly what you need — and what you're overpaying for.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "Custom UI/UX designed around your brand and your customers. You approve every pixel before we write a line of code.",
  },
  {
    step: 3,
    title: "Develop",
    description:
      "Our team builds your app with modern, scalable tech. Weekly demos keep you in the loop — no surprises.",
  },
  {
    step: 4,
    title: "Deploy & Support",
    description:
      "We launch, train your team, and provide ongoing support. Your app evolves as your business grows.",
  },
];
