import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { COMPARISONS } from "@/data/comparisons";

export const metadata: Metadata = pageMetadata(
  "Compare — iOLab Custom vs SaaS Platforms",
  "See how custom-built software compares to Salesforce, HubSpot, Monday.com, Zendesk, and ServiceTitan. Feature comparisons, pricing, and honest assessments.",
  "/compare",
  ["SaaS alternative", "Salesforce alternative", "HubSpot alternative", "custom software comparison"]
);

export default function ComparePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Compare", url: "/compare" }])} />

      <section className="bg-dark text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Honest Comparisons</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Custom Software vs <span className="text-primary">Popular SaaS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Side-by-side feature and pricing comparisons. We tell you when SaaS makes
            sense AND when custom is the better choice.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {COMPARISONS.map((comp) => (
            <Link key={comp.slug} href={`/compare/${comp.slug}`} className="group">
              <Card hover className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold group-hover:text-primary transition-colors">
                    vs {comp.competitor}
                  </h2>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary" />
                </div>
                <p className="text-gray-500 text-sm flex-1 mb-4">{comp.tagline}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-500 font-medium">{comp.monthlyPrice}</span>
                  <span className="text-green-600 font-medium">{comp.customBuildRange}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>{comp.competitor}/mo</span>
                  <span>Custom one-time</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Not Sure Which Route to Take?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Try our free SaaS Cost Calculator to see exactly how much you&apos;re
            spending — and how much you could save.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/tools/saas-calculator" size="lg">
              Calculate Your SaaS Costs
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
