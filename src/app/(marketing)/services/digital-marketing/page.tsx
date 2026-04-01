import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Digital Marketing",
  "Full-funnel digital marketing — Google Ads, social media, PPC, content strategy — all data-driven for real ROI, not vanity metrics.",
  "/services/digital-marketing",
  ["digital marketing agency", "Google Ads management", "social media marketing", "PPC management", "digital marketing NJ", "small business marketing"]
);

export default function DigitalMarketingPage() {
  return (
    <ServicePageLayout
      badge="Digital Marketing"
      title="Full-Funnel Marketing"
      highlight="That Delivers"
      description="From awareness to conversion — we run data-driven digital marketing campaigns that get real results, not vanity metrics."
      icon={Megaphone}
      slug="digital-marketing"
      features={[
        "Google Ads & Microsoft Ads management",
        "Social media advertising (Meta, Instagram, TikTok)",
        "Landing page design & optimization",
        "Conversion rate optimization",
        "Retargeting & remarketing campaigns",
        "Social media content & management",
        "Monthly reporting & strategy calls",
        "Budget optimization & ROI tracking",
      ]}
      faqs={[
        { question: "What's your minimum ad budget recommendation?", answer: "We recommend a minimum of $1,000-$2,000/month in ad spend for Google Ads and $500-$1,000/month for social media ads. This gives us enough data to optimize campaigns effectively. Our management fee is separate from ad spend." },
        { question: "How do you measure success?", answer: "We focus on metrics that matter to your business — leads, phone calls, form submissions, sales, and ROI. Not impressions or clicks. Every month we report on what we spent, what it generated, and how we're optimizing for better results." },
        { question: "Do you manage social media content too?", answer: "Yes. We offer social media content creation and management as part of our digital marketing service. This includes content strategy, post creation, scheduling, and community management." },
        { question: "Are you a Google Partner?", answer: "We're a Microsoft Advertising Partner and Semrush Certified Agency Partner. We manage Google Ads, Microsoft Ads, and social media advertising across all major platforms." },
      ]}
      heroImage="https://iolab.nyc3.digitaloceanspaces.com/images/generated/services/dm-hero.png"
      showcaseImage="https://iolab.nyc3.digitaloceanspaces.com/images/generated/services/dm-showcase.png"
      relatedServices={[
        { title: "SEO & Content", slug: "seo" },
        { title: "Email Marketing", slug: "email-marketing" },
        { title: "Web Design", slug: "web-design" },
      ]}
    />
  );
}
