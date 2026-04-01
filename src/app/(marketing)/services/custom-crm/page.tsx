import type { Metadata } from "next";
import { Database } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Custom CRM Development",
  "Replace Salesforce & HubSpot with a CRM built to your exact workflow. Custom-built, branded, AI-enhanced — owned by you, not rented.",
  "/services/custom-crm",
  ["custom CRM", "CRM development", "replace Salesforce", "replace HubSpot", "custom CRM for small business", "CRM software development"]
);

export default function CustomCRMPage() {
  return (
    <ServicePageLayout
      badge="Custom CRM"
      title="Your Business Deserves a CRM"
      highlight="Built for You"
      description="Stop paying $300/mo for a CRM that forces you into their workflow. We build custom CRM systems tailored to how YOUR business actually operates."
      icon={Database}
      slug="custom-crm"
      features={[
        "Custom fields, workflows, and pipelines",
        "Contact & lead management built for your process",
        "Automated follow-ups and task assignments",
        "Custom dashboards and reporting",
        "Email & SMS integration",
        "Role-based access control",
        "Third-party integrations (Stripe, QuickBooks, etc.)",
        "Mobile-friendly responsive design",
      ]}
      faqs={[
        { question: "How is a custom CRM different from Salesforce or HubSpot?", answer: "Salesforce and HubSpot are built for millions of businesses with generic features. A custom CRM is built specifically for YOUR workflow, YOUR team, and YOUR data — no unused features, no per-seat pricing, no monthly subscription fees. You own the code and data outright." },
        { question: "How long does it take to build a custom CRM?", answer: "A typical custom CRM takes 3-5 months from kickoff to launch. We start with discovery, design mockups for your approval, then build in iterative sprints with weekly demos so you see progress every week." },
        { question: "Can you migrate our data from our current CRM?", answer: "Yes. We handle full data migration from Salesforce, HubSpot, Zoho, Pipedrive, or any other CRM. We map your existing data to the new system and verify everything transfers correctly before going live." },
        { question: "What happens if we need changes after launch?", answer: "Every project includes a support period. After that, we offer affordable monthly support plans. Since we built it, we can modify, extend, or add features quickly — unlike SaaS tools where you're stuck with what they give you." },
      ]}
      heroImage="https://iolab.nyc3.digitaloceanspaces.com/images/generated/services/crm-hero.png"
      showcaseImage="https://iolab.nyc3.digitaloceanspaces.com/images/generated/services/crm-showcase.png"
      relatedServices={[
        { title: "AI Automation", slug: "ai-automation" },
        { title: "Mobile Apps", slug: "mobile-apps" },
        { title: "Web Design", slug: "web-design" },
      ]}
    />
  );
}
