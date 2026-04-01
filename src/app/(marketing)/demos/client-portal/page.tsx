import type { Metadata } from "next";
import { Monitor, FileText, MessageSquare, CreditCard, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { PortalDemoWrapper } from "./PortalDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "Client Portal Demo",
  "Interactive client portal demo with project tracking, document management, messaging, and billing. See how your clients would experience working with you.",
  "/demos/client-portal",
  ["client portal demo", "customer portal", "project tracking portal", "client management"]
);

const FEATURES = [
  { icon: Monitor, title: "Project Tracking", description: "Progress bar, milestone timeline, and real-time status updates. Clients always know where their project stands." },
  { icon: FileText, title: "Document Hub", description: "Upload, download, and e-sign documents. Proposals, contracts, and deliverables in one place." },
  { icon: MessageSquare, title: "Direct Messaging", description: "Threaded conversations between your team and the client. No more lost emails or missed updates." },
  { icon: CreditCard, title: "Billing & Invoices", description: "Clients view invoices, track payments, and pay online. Transparent billing builds trust." },
];

export default function ClientPortalDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "Client Portal Demo", url: "/demos/client-portal" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Client <span className="text-primary">Portal</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">A branded client portal with project tracking, documents, messaging, and billing. Click &quot;Enter Portal&quot; to explore.</p>
        </div>
      </section>
      <Section><div className="max-w-6xl mx-auto"><PortalDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Give Your Clients a Premium Experience</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">A branded portal reduces &quot;what&apos;s the status?&quot; calls by 80% and makes your business look enterprise-level.</p>
          <Button href="/contact" size="lg">Build My Client Portal <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
