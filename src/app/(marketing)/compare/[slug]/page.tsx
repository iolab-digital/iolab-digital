import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X as XIcon, ArrowRight, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { getComparison, ALL_COMPARISON_SLUGS } from "@/data/comparisons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ALL_COMPARISON_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) return {};
  return pageMetadata(data.metaTitle, data.metaDescription, `/compare/${slug}`, data.keywords);
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const data = getComparison(slug);
  if (!data) notFound();

  return (
    <>
      <JsonLd data={faqSchema(data.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Compare", url: "/compare" }, { name: `vs ${data.competitor}`, url: `/compare/${slug}` }])} />

      {/* Hero */}
      <section className="bg-dark text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Comparison</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
            iOLab Custom vs <span className="text-primary">{data.competitor}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{data.tagline}</p>
        </div>
      </section>

      {/* Pricing comparison */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
            <h2 className="font-bold text-lg mb-1">{data.competitor}</h2>
            <div className="text-3xl font-bold text-red-600 mb-1">{data.monthlyPrice}</div>
            <div className="text-sm text-red-500 mb-4">5-year total: {data.annualPrice5yr}</div>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li className="flex items-center gap-2"><XIcon className="h-4 w-4 text-red-400 shrink-0" /> Per-seat pricing that scales with headcount</li>
              <li className="flex items-center gap-2"><XIcon className="h-4 w-4 text-red-400 shrink-0" /> Annual price increases (10-20%/yr typical)</li>
              <li className="flex items-center gap-2"><XIcon className="h-4 w-4 text-red-400 shrink-0" /> You never own anything</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 ring-2 ring-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-lg">iOLab Custom</h2>
              <Badge variant="primary">Recommended</Badge>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">{data.customBuildRange}</div>
            <div className="text-sm text-green-500 mb-4">One-time + {data.customMonthly}</div>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500 shrink-0" /> Flat pricing — unlimited users</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500 shrink-0" /> No price increases — you own the code</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500 shrink-0" /> AI automation included from day one</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/tools/saas-calculator" className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
            Calculate your exact savings <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* Feature comparison table */}
      <Section className="bg-gray-50">
        <h2 className="text-2xl font-bold font-display text-center mb-8">Feature-by-Feature Comparison</h2>
        <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left p-4 font-medium text-gray-500">Feature</th>
                <th className="text-center p-4 font-medium text-red-500 w-32">{data.competitor}</th>
                <th className="text-center p-4 font-medium text-primary w-32">iOLab Custom</th>
              </tr>
            </thead>
            <tbody>
              {data.features.map((f, i) => (
                <tr key={f.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="p-4 font-medium">{f.feature}</td>
                  <td className="p-4 text-center">
                    {f.competitor === true ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : f.competitor === false ? (
                      <XIcon className="h-5 w-5 text-red-400 mx-auto" />
                    ) : (
                      <span className="text-xs text-amber-600 flex items-center justify-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" /> {f.competitor}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {f.custom === true ? (
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    ) : f.custom === false ? (
                      <XIcon className="h-5 w-5 text-red-400 mx-auto" />
                    ) : (
                      <span className="text-xs text-green-600">{f.custom}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Who should use what */}
      <Section>
        <h2 className="text-2xl font-bold font-display text-center mb-8">Which Is Right for You?</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold mb-3">Choose {data.competitor} if...</h3>
            <p className="text-gray-600 text-sm">{data.bestFor.competitor}</p>
          </div>
          <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-bold mb-3 text-primary">Choose iOLab Custom if...</h3>
            <p className="text-gray-600 text-sm">{data.bestFor.custom}</p>
          </div>
        </div>
      </Section>

      <FAQ items={data.faqs} />

      {/* CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Ready to Replace {data.competitor}?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Book a free consultation and we&apos;ll show you exactly what a custom
            replacement would look like — and cost — for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/contact" size="lg">
              Book a Free Consultation <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="/tools/saas-calculator" variant="outline" size="lg">
              Calculate Your Savings
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
