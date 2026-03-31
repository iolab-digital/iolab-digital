import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import type { LucideIcon } from "lucide-react";

type ServicePageProps = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  slug: string;
  faqs: { question: string; answer: string }[];
  relatedServices?: { title: string; slug: string }[];
  ctaText?: string;
};

export function ServicePageLayout({
  badge,
  title,
  highlight,
  description,
  features,
  icon: Icon,
  slug,
  faqs,
  relatedServices,
  ctaText = "Get Started",
}: ServicePageProps) {
  const fullTitle = `${title} ${highlight}`;

  return (
    <>
      <JsonLd data={serviceSchema(fullTitle, description, slug)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: badge, url: `/services/${slug}` }])} />

      <section className="relative bg-dark text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/navy-topographic.png" alt="" fill className="object-cover opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                <Icon className="h-8 w-8" aria-hidden="true" />
              </div>
            </div>
            <Badge variant="dark" className="mb-4">{badge}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              {title} <span className="text-primary">{highlight}</span>
            </h1>
            <p className="text-gray-400 text-lg">{description}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold font-display mb-8 text-center">What&apos;s Included</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                <Check className="h-5 w-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
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
          <h2 className="text-3xl font-bold font-display mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Let&apos;s discuss your project and show you how a custom solution saves you time and money.
          </p>
          <Button href="/contact" size="lg">{ctaText}</Button>
        </div>
      </Section>
    </>
  );
}
