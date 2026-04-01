import type { Metadata } from "next";
import Link from "next/link";
import {
  Database,
  Headphones,
  FolderKanban,
  Bot,
  Receipt,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Interactive Demos — Try Our Custom Modules",
  "See what a custom CRM, support system, project manager, AI chatbot, and invoicing tool look like — branded for YOUR business. No signup required.",
  "/demos",
  [
    "CRM demo",
    "custom software demo",
    "project management demo",
    "AI chatbot demo",
    "invoicing demo",
    "customer support demo",
  ]
);

const DEMOS = [
  {
    title: "CRM",
    description:
      "Contact management, deal pipeline, search, filters, and activity tracking. See how a custom CRM replaces Salesforce.",
    href: "/demos/crm",
    icon: Database,
    color: "text-blue-500 bg-blue-50",
  },
  {
    title: "Customer Support",
    description:
      "Ticket inbox, conversation threads, AI-drafted responses, priority tagging, and SLA timers. Replace Zendesk.",
    href: "/demos/customer-support",
    icon: Headphones,
    color: "text-green-500 bg-green-50",
  },
  {
    title: "Project Management",
    description:
      "Kanban boards, task modals, team workload, progress tracking, and timeline views. Replace Monday.com.",
    href: "/demos/project-management",
    icon: FolderKanban,
    color: "text-purple-500 bg-purple-50",
  },
  {
    title: "AI Chatbot",
    description:
      "Live chat interface with branching conversations, appointment booking, FAQ handling, and behind-the-scenes AI panel.",
    href: "/demos/ai-chatbot",
    icon: Bot,
    color: "text-orange-500 bg-orange-50",
  },
  {
    title: "Invoicing & Billing",
    description:
      "Invoice creation, line items, payment tracking, overdue reminders, and revenue dashboards. Replace QuickBooks.",
    href: "/demos/invoicing",
    icon: Receipt,
    color: "text-emerald-500 bg-emerald-50",
  },
];

export default function DemosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Demos", url: "/demos" },
        ])}
      />

      {/* Hero */}
      <section className="bg-dark text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">
            Interactive Demos
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Try Before You <span className="text-primary">Buy</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Click into any module below to see a fully interactive demo. Enter
            your website URL and we&apos;ll brand it with your logo and
            colors — in seconds.
          </p>
        </div>
      </section>

      {/* Demo Grid */}
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {DEMOS.map((demo) => (
            <Link key={demo.href} href={demo.href} className="group">
              <Card hover className="h-full flex flex-col">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${demo.color} mb-4`}
                >
                  <demo.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {demo.title}
                </h2>
                <p className="text-gray-500 text-sm flex-1">{demo.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  Try Demo <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Like What You See?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Every demo is a real module we can build for your business — customized
            to your workflow, your brand, and your budget.
          </p>
          <Button href="/contact" size="lg">
            Book a Free Consultation
          </Button>
        </div>
      </Section>
    </>
  );
}
