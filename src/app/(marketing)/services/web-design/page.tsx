import type { Metadata } from "next";
import { Monitor } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Web Design & Development",
  "High-performance custom websites that convert visitors into customers. No templates, no page builders. Custom-coded for speed and SEO.",
  "/services/web-design",
  ["custom web design", "web development", "custom website", "small business website", "web design NJ", "SEO website development"]
);

export default function WebDesignPage() {
  return (
    <ServicePageLayout
      badge="Web Design & Dev"
      title="Websites That"
      highlight="Convert"
      description="No templates. No page builders. We design and develop custom websites that load fast, rank well, and turn visitors into customers."
      icon={Monitor}
      slug="web-design"
      features={[
        "Custom design — no templates or themes",
        "Mobile-first responsive development",
        "Lightning-fast performance (95+ Lighthouse)",
        "SEO-optimized architecture",
        "Content management system",
        "Contact forms & lead capture",
        "Analytics & conversion tracking",
        "Hosting & maintenance plans available",
      ]}
      faqs={[
        { question: "Why custom instead of WordPress or Squarespace?", answer: "Template-based sites are slow, bloated, and look like everyone else's. Custom sites load 3-5x faster, rank better on Google, and are designed specifically for YOUR business goals. Plus, no monthly platform fees." },
        { question: "How long does a custom website take to build?", answer: "Most custom websites take 4-8 weeks from design approval to launch. We start with wireframes and mockups, get your approval on the design, then build and launch." },
        { question: "Will my website be optimized for SEO?", answer: "Absolutely. Every website we build includes SEO-optimized architecture, proper meta tags, structured data markup, fast load times, mobile optimization, and clean URLs — everything Google looks for to rank your site." },
        { question: "Can I update the content myself?", answer: "Yes. We build in a content management system so you can easily update text, images, and pages yourself. We also offer monthly maintenance plans if you'd rather have us handle updates." },
      ]}
      relatedServices={[
        { title: "SEO & Content", slug: "seo" },
        { title: "Digital Marketing", slug: "digital-marketing" },
        { title: "Email Marketing", slug: "email-marketing" },
      ]}
    />
  );
}
