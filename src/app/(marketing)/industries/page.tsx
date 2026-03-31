import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INDUSTRIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industries",
  description: "Custom apps, CRM, and AI automation for restaurants, contractors, dental, home services, and more.",
};

export default function IndustriesPage() {
  return (
    <>
      <Section>
        <div className="text-center mb-12">
          <Badge className="mb-4">Industries We Serve</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Built for <span className="text-primary">Any Business</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From restaurants to law firms — if you run a business, we can build the
            custom tools you need to grow. No more paying for software that doesn&apos;t fit.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.name}
              href={`/industries/${industry.slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-8 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="text-4xl">{industry.icon}</span>
              <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
                {industry.name}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Don&apos;t See Your Industry?</h2>
          <p className="text-gray-400 mb-8">We build custom solutions for any business. Tell us what you need.</p>
          <Button href="/contact" size="lg">Let&apos;s Talk</Button>
        </div>
      </Section>
    </>
  );
}
