import type { Metadata } from "next";
import { Search } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "SEO & Content Marketing",
  "Dominate local search. Get found by customers actively looking for your services. Local SEO, content strategy, and Google Business optimization.",
  "/services/seo",
  ["SEO services", "local SEO", "content marketing", "Google Business Profile", "SEO for small business", "search engine optimization NJ"]
);

export default function SEOPage() {
  return (
    <ServicePageLayout
      badge="SEO & Content"
      title="Get Found on"
      highlight="Google"
      description="When customers search for your services, you should be the first thing they see. We make that happen with data-driven SEO."
      icon={Search}
      slug="seo"
      features={[
        "Local SEO & Google Business Profile optimization",
        "Keyword research & content strategy",
        "On-page SEO optimization",
        "Technical SEO audits & fixes",
        "Content creation & blog management",
        "Link building & authority development",
        "Monthly performance reporting",
        "Competitor analysis & gap identification",
      ]}
      faqs={[
        { question: "How long does SEO take to show results?", answer: "SEO is a long-term investment. Most clients see noticeable improvements in 3-6 months, with significant results by 6-12 months. Local SEO for Google Maps tends to show faster results — often within 4-8 weeks." },
        { question: "Do you guarantee first-page rankings?", answer: "No ethical SEO provider can guarantee specific rankings because Google's algorithm is constantly changing. What we DO guarantee is a data-driven strategy, consistent execution, and transparent reporting so you can see exactly what we're doing and the results we're achieving." },
        { question: "What's included in your SEO service?", answer: "Our SEO service includes technical audits, keyword research, on-page optimization, content creation, Google Business Profile management, link building, and monthly reporting. Everything is tailored to your industry and local market." },
        { question: "Do I need SEO if I'm already running ads?", answer: "Yes. Ads stop working the moment you stop paying. SEO builds long-term organic traffic that compounds over time. The best strategy combines both — ads for immediate results and SEO for sustainable growth." },
      ]}
      relatedServices={[
        { title: "Web Design", slug: "web-design" },
        { title: "Digital Marketing", slug: "digital-marketing" },
        { title: "Email Marketing", slug: "email-marketing" },
      ]}
    />
  );
}
