import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

type IndustryPageProps = {
  icon: string;
  industry: string;
  slug: string;
  title: string;
  highlight: string;
  description: string;
  painPoints: string[];
  solutions: string[];
  faqs: { question: string; answer: string }[];
  relatedServices?: { title: string; slug: string }[];
};

export function IndustryPageLayout({
  icon,
  industry,
  slug,
  title,
  highlight,
  description,
  painPoints,
  solutions,
  faqs,
  relatedServices,
}: IndustryPageProps) {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Industries", url: "/industries" }, { name: industry, url: `/industries/${slug}` }])} />

      <section className="relative bg-dark text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/navy-topographic.png" alt="" fill className="object-cover opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-5xl mb-6 block" role="img" aria-label={industry}>{icon}</span>
            <Badge variant="dark" className="mb-4">{industry}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              {title} <span className="text-primary">{highlight}</span>
            </h1>
            <p className="text-gray-400 text-lg">{description}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-6">Sound Familiar?</h2>
            <ul className="space-y-4">
              {painPoints.map((p) => (
                <li key={p} className="flex gap-3 text-gray-600">
                  <span className="text-error font-bold" aria-hidden="true">-</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">What We Build for You</h2>
            <ul className="space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex gap-3 text-gray-600">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <FAQ items={faqs} />

      {relatedServices && relatedServices.length > 0 && (
        <Section className="bg-gray-50">
          <h2 className="text-2xl font-bold font-display mb-8 text-center">Related Services</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <span className="font-medium text-gray-700 group-hover:text-primary">{s.title}</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Ready to Ditch the SaaS?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Let&apos;s build custom tools that fit your {industry.toLowerCase()} business
            perfectly — and save you thousands per year.
          </p>
          <Button href="/contact" size="lg">Book a Free Consultation</Button>
        </div>
      </Section>
    </>
  );
}
