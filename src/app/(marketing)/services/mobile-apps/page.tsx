import type { Metadata } from "next";
import { Smartphone } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Custom Mobile Apps",
  "iOS & Android apps custom-built for your business. Customer-facing or internal — fully branded and owned by you. No app subscriptions.",
  "/services/mobile-apps",
  ["custom mobile app development", "iOS app development", "Android app development", "business mobile app", "custom branded app"]
);

export default function MobileAppsPage() {
  return (
    <ServicePageLayout
      badge="Mobile Apps"
      title="Custom iOS & Android Apps"
      highlight="Your Brand, Your App"
      description="From customer loyalty apps to internal operations tools — we build mobile apps that your customers and team will actually use."
      icon={Smartphone}
      slug="mobile-apps"
      features={[
        "Native iOS & Android development",
        "Custom UI/UX designed for your brand",
        "Push notifications & real-time updates",
        "Offline-capable functionality",
        "Payment processing integration",
        "User authentication & profiles",
        "Analytics & usage tracking",
        "App Store & Play Store submission",
      ]}
      faqs={[
        { question: "Do you build for both iOS and Android?", answer: "Yes. We build for both platforms, either as native apps or using cross-platform frameworks like React Native, depending on your needs and budget. Both approaches deliver high-quality, performant apps." },
        { question: "How much does a custom mobile app cost?", answer: "Mobile apps typically start at $15,000-$25,000 for a focused app and scale up based on complexity. We provide a fixed-price quote after understanding your requirements — no hourly billing surprises." },
        { question: "Will you publish the app to the App Store and Google Play?", answer: "Yes. We handle the entire submission process for both the Apple App Store and Google Play Store, including meeting all platform requirements, creating store listings, and managing the review process." },
        { question: "Can the app integrate with our existing systems?", answer: "Absolutely. We build APIs and integrations to connect your app with existing tools — CRM, payment processors, inventory systems, booking engines, and more." },
      ]}
      relatedServices={[
        { title: "Custom CRM", slug: "custom-crm" },
        { title: "AI Automation", slug: "ai-automation" },
        { title: "Web Design", slug: "web-design" },
      ]}
    />
  );
}
