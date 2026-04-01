import type { MetadataRoute } from "next";
import { ALL_INDUSTRY_SLUGS } from "@/data/industries";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://iolab.co";

const PORTFOLIO_SLUGS = [
  "tappd", "allenberry-resort", "sand-hills-casino", "hen-houses",
  "johnny-ds", "south-beach-casino", "homeland", "the-milestone",
  "villa-buena-onda", "dilks-development", "alpk", "spark-meraki", "pro-pools", "maven",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services/custom-crm`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services/mobile-apps`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services/ai-automation`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services/web-design`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services/email-marketing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services/seo`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services/digital-marketing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/portfolio`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/industries`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/demos`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/crm`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/customer-support`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/project-management`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/ai-chatbot`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/invoicing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/booking`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/client-portal`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/analytics`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/loyalty`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/demos/documents`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/pricing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/why-custom`, priority: 0.8, changeFrequency: "monthly" as const },
  ];

  const industryPages = ALL_INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
    priority: 0.7 as const,
    changeFrequency: "monthly" as const,
  }));

  const portfolioPages = PORTFOLIO_SLUGS.map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    priority: 0.6 as const,
    changeFrequency: "monthly" as const,
  }));

  const blogPages = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    priority: 0.7 as const,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...industryPages, ...blogPages, ...portfolioPages];
}
