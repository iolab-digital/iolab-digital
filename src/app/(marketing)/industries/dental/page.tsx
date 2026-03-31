import type { Metadata } from "next";
import { IndustryPageLayout } from "@/components/services/IndustryPageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Custom Apps for Dental & Medical Practices",
  "Replace Dentrix, Weave, and RevenueWell with custom patient management, booking, and communication systems for your practice.",
  "/industries/dental",
  ["dental practice management", "custom patient portal", "dental CRM", "medical appointment booking", "healthcare software development"]
);

export default function DentalPage() {
  return (
    <IndustryPageLayout
      icon="🦷" industry="Dental & Medical" slug="dental"
      title="Custom Tools for" highlight="Healthcare"
      description="Dentrix, Weave, and RevenueWell are expensive and inflexible. We build patient management tools tailored to your practice."
      painPoints={[
        "Paying $500+/mo for practice management software",
        "Patient reminders and follow-ups require manual work",
        "Can't customize intake forms or workflows",
        "Review generation is manual and inconsistent",
        "Marketing tools don't integrate with your patient database",
      ]}
      solutions={[
        "Custom patient management and scheduling",
        "Automated appointment reminders (SMS, email)",
        "Digital intake forms with e-signatures",
        "Automated review request system",
        "Patient portal for records and billing",
        "Treatment plan tracking and follow-ups",
        "Insurance verification automation",
        "Marketing automation tied to patient lifecycle",
      ]}
      faqs={[
        { question: "Is custom healthcare software HIPAA compliant?", answer: "Yes. We build with HIPAA compliance requirements from the start — encrypted data storage, secure access controls, audit logging, and BAA-compliant hosting. Your patient data is protected." },
        { question: "Can patients book appointments online?", answer: "Yes. We build custom booking systems integrated with your schedule, including real-time availability, automated confirmations, and reminder sequences via SMS and email." },
        { question: "Can it integrate with our existing practice management system?", answer: "Yes. We can integrate with or fully replace existing systems. We handle data migration and ensure a smooth transition so your practice never skips a beat." },
        { question: "How do automated review requests work?", answer: "After each appointment, the system automatically sends a review request via SMS or email. Happy patients are directed to Google/Yelp. Unhappy patients are routed to internal feedback — protecting your online reputation." },
      ]}
      relatedServices={[
        { title: "Custom CRM", slug: "custom-crm" },
        { title: "AI Automation", slug: "ai-automation" },
        { title: "Web Design", slug: "web-design" },
      ]}
    />
  );
}
