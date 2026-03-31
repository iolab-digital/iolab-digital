import type { Metadata } from "next";
import { IndustryPageLayout } from "@/components/services/IndustryPageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Custom Apps for Restaurants & Bars",
  "Replace Toast, Square, and Mailchimp with ONE custom platform. Custom POS, ordering apps, CRM, and marketing automation for restaurants.",
  "/industries/restaurants",
  ["restaurant app development", "custom restaurant POS", "restaurant CRM", "restaurant marketing automation", "custom ordering app"]
);

export default function RestaurantsPage() {
  return (
    <IndustryPageLayout
      icon="🍽️" industry="Restaurants & Bars" slug="restaurants"
      title="Custom Tech for" highlight="Restaurants"
      description="Stop paying Toast, Square, Yelp, and Mailchimp separately. We build one custom platform that handles it all — branded to your restaurant."
      painPoints={[
        "Paying $200+/mo for POS, $100/mo for email, $50/mo for reservations",
        "Customer data spread across 5 different platforms",
        "Generic loyalty programs that don't match your brand",
        "No way to track customer preferences across visits",
        "Menu updates require calling support or logging into 3 systems",
      ]}
      solutions={[
        "Custom ordering and menu management system",
        "Branded loyalty and rewards app",
        "Automated email & SMS marketing",
        "Unified customer database with visit history",
        "Online reservation and waitlist system",
        "Kitchen display and order management",
        "Review management and reputation monitoring",
        "Custom analytics dashboard",
      ]}
      faqs={[
        { question: "Can you replace our current POS system?", answer: "Yes. We build custom ordering and menu management systems that can replace or integrate with existing POS hardware. We handle the full transition, including data migration and staff training." },
        { question: "How do custom loyalty apps compare to third-party programs?", answer: "Custom loyalty apps are branded 100% to your restaurant — your logo, your colors, your rewards structure. Unlike generic programs, customers engage directly with YOUR brand, and you own all the customer data." },
        { question: "Can you build an online ordering system?", answer: "Absolutely. We build custom online ordering with your branding, your menu structure, and direct integration with your kitchen workflow. No third-party commission fees like DoorDash or UberEats." },
        { question: "How long does a restaurant app take to build?", answer: "A focused restaurant app (ordering + loyalty) takes about 3-4 months. A comprehensive platform with CRM, marketing, and analytics takes 4-6 months. We deliver in phases so you can start using features as they're completed." },
      ]}
      relatedServices={[
        { title: "Custom Mobile Apps", slug: "mobile-apps" },
        { title: "Email Marketing", slug: "email-marketing" },
        { title: "Web Design", slug: "web-design" },
      ]}
    />
  );
}
