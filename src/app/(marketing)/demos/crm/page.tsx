import type { Metadata } from "next";
import {
  Database,
  Users,
  BarChart3,
  Search,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { CRMDemoWrapper } from "./CRMDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "CRM Demo — Interactive Custom CRM",
  "Try a fully interactive CRM demo branded for YOUR business. Contact management, deal pipeline, search, and activity tracking. See what a custom CRM looks like.",
  "/demos/crm",
  ["CRM demo", "custom CRM", "CRM software demo", "Salesforce alternative", "contact management demo"]
);

const FEATURES = [
  {
    icon: Users,
    title: "Contact Management",
    description: "Search, filter, and click into any contact to see their full profile, deal history, and communication log.",
  },
  {
    icon: BarChart3,
    title: "Deal Pipeline",
    description: "Drag and drop deals between stages. Track value per stage and total pipeline at a glance.",
  },
  {
    icon: Search,
    title: "Smart Search & Filters",
    description: "Find any contact by name, company, or email. Filter by status to focus on leads, active clients, or win-backs.",
  },
  {
    icon: Database,
    title: "Activity Feed",
    description: "See every call, email, meeting, and note across all contacts in real time. Nothing gets lost.",
  },
];

export default function CRMDemoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Demos", url: "/demos" },
          { name: "CRM Demo", url: "/demos/crm" },
        ])}
      />

      {/* Hero */}
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Custom <span className="text-primary">CRM</span> Demo
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A fully interactive CRM with contact management, deal pipeline, and
            activity tracking. Enter your website to see it branded for your business.
          </p>
        </div>
      </section>

      {/* Demo */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <CRMDemoWrapper />
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold font-display mb-3">
            What This CRM Demo Shows
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every feature you see is something we can build for your business — customized to your workflow, your data, and your brand.
          </p>
        </div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Love What You See?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            This is just a preview. The real thing is built around YOUR exact workflow,
            with YOUR integrations, and YOUR data. Let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">
              Build My CRM <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/services/custom-crm" variant="outline" size="lg">
              Learn About Custom CRM
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
