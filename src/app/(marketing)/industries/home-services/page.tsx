import type { Metadata } from "next";
import { IndustryPageLayout } from "@/components/services/IndustryPageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Custom Apps for Home Services",
  "Custom CRM, scheduling, and automation for tree removal, pest control, HVAC, plumbing, and landscaping businesses.",
  "/industries/home-services",
  ["home services CRM", "pest control software", "HVAC scheduling app", "plumbing business management", "tree removal app", "landscaping software"]
);

export default function HomeServicesPage() {
  return (
    <IndustryPageLayout
      icon="🏠" industry="Home Services" slug="home-services"
      title="Custom Apps for" highlight="Home Services"
      description="Tree removal, pest control, HVAC, plumbing, landscaping — we build custom tools that replace expensive field service software."
      painPoints={[
        "Paying $200-$400/mo for field service management",
        "Scheduling and dispatch requires constant manual updates",
        "Customers can't easily book or check service status",
        "Invoicing and payments are separate from job management",
        "No good way to track recurring service contracts",
      ]}
      solutions={[
        "Custom scheduling and dispatch system",
        "Customer self-service booking portal",
        "Automated invoicing and payment collection",
        "Recurring service contract management",
        "Route optimization for service crews",
        "Before/after photo documentation",
        "Automated follow-up and review requests",
        "Custom reporting and crew performance tracking",
      ]}
      faqs={[
        { question: "Can you build a booking system for my home services business?", answer: "Yes. We build customer-facing booking portals where clients can schedule services, view available time slots, and receive automated confirmations — all branded to your business." },
        { question: "How does recurring service management work?", answer: "We build systems that track service contracts, automatically schedule recurring visits, send reminders to customers, and generate invoices — eliminating the manual work of managing repeat clients." },
        { question: "Can my technicians use it on their phones?", answer: "Absolutely. We build mobile-first applications so your field team can view schedules, navigate to jobs, capture before/after photos, collect signatures, and process payments from their phones." },
        { question: "Will it help us get more reviews?", answer: "Yes. Our automated review request system sends a personalized SMS or email after each completed job, making it easy for satisfied customers to leave Google or Yelp reviews — which directly boosts your local search rankings." },
      ]}
      relatedServices={[
        { title: "Custom CRM", slug: "custom-crm" },
        { title: "Mobile Apps", slug: "mobile-apps" },
        { title: "SEO & Content", slug: "seo" },
      ]}
    />
  );
}
