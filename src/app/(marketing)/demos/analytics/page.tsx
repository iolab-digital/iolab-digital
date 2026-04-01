import type { Metadata } from "next";
import { BarChart3, TrendingUp, Users, PieChart, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { AnalyticsDemoWrapper } from "./AnalyticsDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "Analytics Dashboard Demo",
  "Interactive analytics dashboard demo with revenue charts, team performance, lead source tracking, and KPI cards. Branded for your business.",
  "/demos/analytics",
  ["analytics dashboard demo", "business intelligence demo", "reporting dashboard", "KPI tracking"]
);

const FEATURES = [
  { icon: TrendingUp, title: "Revenue Trends", description: "Monthly revenue chart with 6-month and 12-month toggles. See growth patterns at a glance." },
  { icon: BarChart3, title: "Team Performance", description: "Compare deals, revenue, and conversion rates across your team. Data-driven management." },
  { icon: PieChart, title: "Source Attribution", description: "See which channels drive revenue — website, referrals, ads, social. Know where to invest." },
  { icon: Users, title: "Client Rankings", description: "Top clients by lifetime value with deal count and last activity. Focus on your best relationships." },
];

export default function AnalyticsDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "Analytics Demo", url: "/demos/analytics" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Analytics <span className="text-primary">Dashboard</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Real-time business metrics with revenue charts, team performance, and client rankings. Toggle between 6-month and 12-month views.</p>
        </div>
      </section>
      <Section><div className="max-w-6xl mx-auto"><AnalyticsDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Make Decisions with Data, Not Gut Feeling</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Custom analytics built around YOUR metrics — not generic reports designed for someone else&apos;s business.</p>
          <Button href="/contact" size="lg">Build My Dashboard <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
