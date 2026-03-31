import type { Metadata } from "next";
import { IndustryPageLayout } from "@/components/services/IndustryPageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Custom Apps for Contractors & Construction",
  "Replace Jobber, Housecall Pro, and ServiceTitan with custom CRM, scheduling, and project management built for YOUR workflow.",
  "/industries/contractors",
  ["contractor CRM", "custom scheduling software", "contractor app development", "construction project management", "field service management"]
);

export default function ContractorsPage() {
  return (
    <IndustryPageLayout
      icon="🔨" industry="Contractors" slug="contractors"
      title="Built for" highlight="Contractors"
      description="Jobber, Housecall Pro, ServiceTitan — they charge $200-$500/mo and barely fit your workflow. We build a custom system that does exactly what you need."
      painPoints={[
        "Paying $300+/mo for scheduling software that's overkill",
        "Estimates and invoices in separate systems",
        "No easy way to track jobs from lead to completion",
        "Customer communication scattered across text, email, phone",
        "Can't customize forms or workflows to your process",
      ]}
      solutions={[
        "Custom CRM with job tracking pipeline",
        "Automated estimate and invoice generation",
        "Smart scheduling and crew management",
        "Customer portal for project updates",
        "Automated follow-ups and review requests",
        "Photo documentation and before/after galleries",
        "GPS tracking and route optimization",
        "Financial reporting and job costing",
      ]}
      faqs={[
        { question: "Can you replace Jobber or ServiceTitan?", answer: "Yes. We build custom field service management systems that handle scheduling, dispatch, invoicing, and customer management — tailored to your specific workflow instead of forcing you into a generic one." },
        { question: "Can my crew use it in the field on their phones?", answer: "Absolutely. We build mobile-first, so your crew can access schedules, update job status, capture photos, and get customer signatures right from their phones — even with spotty cell service." },
        { question: "How do you handle estimates and invoicing?", answer: "We build custom estimate templates with your branding, automated pricing calculations, and one-click invoice generation. Estimates convert to invoices with a tap, and customers can pay online." },
        { question: "Can it integrate with QuickBooks?", answer: "Yes. We integrate with QuickBooks, Xero, and other accounting platforms so your financial data stays in sync without double-entry." },
      ]}
      relatedServices={[
        { title: "Custom CRM", slug: "custom-crm" },
        { title: "Mobile Apps", slug: "mobile-apps" },
        { title: "AI Automation", slug: "ai-automation" },
      ]}
    />
  );
}
