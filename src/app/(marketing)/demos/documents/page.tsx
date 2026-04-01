import type { Metadata } from "next";
import { FileText, PenLine, Download, FolderOpen, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { DocumentsDemoWrapper } from "./DocumentsDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "Document Automation Demo",
  "Interactive document automation demo with template library, auto-populated fields, inline editing, and e-signature. Branded for your business.",
  "/demos/documents",
  ["document automation demo", "contract generator", "proposal template", "document management"]
);

const FEATURES = [
  { icon: FolderOpen, title: "Template Library", description: "Proposals, contracts, estimates, invoices — choose a template and it auto-fills with CRM data." },
  { icon: PenLine, title: "Auto-Populated Fields", description: "Client name, company, dates, and amounts pulled from your CRM. Purple-highlighted fields show what's auto-filled." },
  { icon: Download, title: "Generate & Send", description: "One click to generate a PDF. Send for e-signature directly from the platform." },
  { icon: FileText, title: "Document History", description: "Track every document: draft, sent, or signed. Full audit trail of who signed what and when." },
];

export default function DocumentsDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "Documents Demo", url: "/demos/documents" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Document <span className="text-primary">Automation</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Templates that auto-fill from your CRM. Click any template to see the editor with auto-populated fields and e-signature.</p>
        </div>
      </section>
      <Section><div className="max-w-6xl mx-auto"><DocumentsDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Stop Writing Documents from Scratch</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Templates + CRM data + e-signatures = documents generated in minutes, not hours.</p>
          <Button href="/contact" size="lg">Build My Document System <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
