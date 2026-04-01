import type { Metadata } from "next";
import { Headphones, Bot, Clock, Shield, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { SupportDemoWrapper } from "./SupportDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "Customer Support Demo — AI Ticket System",
  "Try an interactive customer support demo with AI-drafted responses, ticket management, SLA tracking, and priority tagging. Branded for your business.",
  "/demos/customer-support",
  ["customer support demo", "AI support system", "ticket management demo", "Zendesk alternative", "helpdesk demo"]
);

const FEATURES = [
  { icon: Headphones, title: "Ticket Management", description: "Inbox with status filters, priority tags, and full conversation threads for every customer issue." },
  { icon: Bot, title: "AI-Drafted Responses", description: "Click 'AI Draft' and watch the system generate a contextual response. Review, edit, and send in seconds." },
  { icon: Clock, title: "SLA Tracking", description: "Every ticket shows time remaining to first response. Automatic escalation when SLAs are at risk." },
  { icon: Shield, title: "Priority Routing", description: "Urgent issues surface automatically. Low, medium, high, and urgent tags keep your team focused." },
];

export default function CustomerSupportDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "Customer Support Demo", url: "/demos/customer-support" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Customer <span className="text-primary">Support</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">AI-powered ticket management with smart drafted responses. Click a ticket, then try the AI Draft button.</p>
        </div>
      </section>
      <Section><div className="max-w-6xl mx-auto"><SupportDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Replace Zendesk with Something Better</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Custom support tools with AI built in — for a fraction of what Zendesk charges per agent.</p>
          <Button href="/contact" size="lg">Build My Support System <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
