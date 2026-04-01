import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { SaaSCalculator } from "@/components/tools/SaaSCalculator";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = pageMetadata(
  "SaaS Cost Calculator — See Your 5-Year Spend",
  "Calculate the true 5-year cost of your SaaS subscriptions and compare to a custom-built alternative. Free calculator — no signup required.",
  "/tools/saas-calculator",
  [
    "SaaS cost calculator",
    "software subscription cost",
    "SaaS vs custom software cost",
    "SaaS total cost of ownership",
    "replace SaaS subscriptions",
    "custom software ROI calculator",
  ]
);

const FAQS = [
  { question: "How accurate is this calculator?", answer: "The calculator uses real-world SaaS pricing and a conservative 10% annual price increase (most SaaS tools raise prices 10-20% annually). Custom build estimates are based on 12+ years of project experience at iOLab Digital. For a precise quote, book a free consultation." },
  { question: "Does custom software really cost less than SaaS over 5 years?", answer: "For most businesses spending $500+/month on SaaS tools, yes. The breakeven point is typically 2-3 years. After that, you're saving money every month — and you own the software outright with no recurring license fees." },
  { question: "What's included in the custom build estimate?", answer: "Our estimates include UI/UX design, full-stack development, AI automation, data migration from your current tools, deployment, team training, and 3 months of post-launch support. Monthly hosting covers infrastructure, security updates, and ongoing support." },
  { question: "Can you really replace multiple SaaS tools with one platform?", answer: "Yes. That's exactly what we do. A custom CRM can replace your separate CRM, email marketing, scheduling, invoicing, and project management tools — all in one unified system built for your specific workflow." },
  { question: "What if I only need to replace one or two tools?", answer: "That works too. Many clients start by replacing their most expensive or most frustrating SaaS tool, then expand over time. We build modular systems that grow with your business." },
];

export default function SaaSCalculatorPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools/saas-calculator" }, { name: "SaaS Cost Calculator", url: "/tools/saas-calculator" }])} />
      <JsonLd data={faqSchema(FAQS)} />

      {/* Hero */}
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Free Tool</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            How Much Are Your SaaS Subscriptions{" "}
            <span className="text-primary">Really</span> Costing You?
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select your tools, see the 5-year total, and compare to what a
            custom-built alternative would cost. Most businesses are shocked by the
            numbers.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <Section>
        <SaaSCalculator />
      </Section>

      {/* FAQ */}
      <FAQ items={FAQS} />

      {/* Related links */}
      <Section className="bg-gray-50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-display mb-4">
            Want to Dive Deeper?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/blog/how-much-does-custom-app-cost" variant="outline">
              Read: Custom App Costs <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/why-custom">
              Why Custom vs SaaS? <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Ready to Stop Renting Software?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Book a free consultation and we&apos;ll give you an exact quote for
            replacing your SaaS stack with custom software you own.
          </p>
          <Button href="/contact" size="lg">
            Book a Free Consultation <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
