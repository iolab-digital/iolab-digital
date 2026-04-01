import type { Metadata } from "next";
import { Receipt, DollarSign, Bell, FileText, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { InvoicingDemoWrapper } from "./InvoicingDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "Invoicing Demo — Custom Billing System",
  "Interactive invoicing demo with invoice creation, payment tracking, overdue reminders, and revenue dashboards. Branded for your business.",
  "/demos/invoicing",
  ["invoicing demo", "billing system demo", "invoice management", "QuickBooks alternative", "custom invoicing"]
);

const FEATURES = [
  { icon: Receipt, title: "Invoice Management", description: "View all invoices with status filters. Click any invoice to see full line items, totals, and payment history." },
  { icon: DollarSign, title: "Revenue Dashboard", description: "Real-time stats showing collected revenue, outstanding balances, and overdue amounts at a glance." },
  { icon: Bell, title: "Payment Reminders", description: "One-click reminder for overdue invoices. Automated follow-ups keep cash flowing without awkward phone calls." },
  { icon: FileText, title: "Professional Invoices", description: "Branded invoices with line items, tax calculation, and online payment links. Your brand, your terms." },
];

export default function InvoicingDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "Invoicing Demo", url: "/demos/invoicing" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Invoicing & <span className="text-primary">Billing</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Revenue tracking, invoice management, and payment reminders. Click any invoice to see the full detail view.</p>
        </div>
      </section>
      <Section><div className="max-w-5xl mx-auto"><InvoicingDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Stop Chasing Payments Manually</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Custom invoicing with automated reminders, online payments, and real-time revenue tracking — built into your CRM.</p>
          <Button href="/contact" size="lg">Build My Billing System <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
