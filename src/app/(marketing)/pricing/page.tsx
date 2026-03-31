import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Pricing",
  "Transparent pricing for custom apps, CRM, web design, and digital marketing. Enterprise quality at small business prices. No hidden fees.",
  "/pricing",
  ["custom app pricing", "CRM development cost", "web design pricing", "AI automation pricing", "small business software pricing"]
);

const PRICING_FAQS = [
  { question: "Are there any monthly subscription fees?", answer: "No. Unlike SaaS tools, our custom solutions are built and delivered with no ongoing subscription fees. You own everything. We offer optional monthly support plans, but they're not required." },
  { question: "What's included in the support period?", answer: "Every project includes a support period (3-12 months depending on tier) that covers bug fixes, minor adjustments, and technical support. This gives you peace of mind during and after launch." },
  { question: "Can I pay in installments?", answer: "Yes. We offer flexible payment plans — typically split across project milestones (kickoff, design approval, development, launch). We'll work out a plan that fits your budget." },
  { question: "What if I need features added later?", answer: "Since we built your system, we can extend it any time. Additional features are quoted separately at fair, transparent rates. There's no vendor lock-in — you own the code." },
];

const TIERS = [
  {
    name: "Starter",
    price: "Starting at $5K",
    description: "Perfect for small businesses needing a custom website or landing pages.",
    features: ["Custom website design & development", "Mobile responsive", "SEO foundation", "Contact forms & lead capture", "3 months support included"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "Starting at $15K",
    description: "For businesses ready to replace SaaS tools with custom solutions.",
    features: ["Everything in Starter", "Custom CRM or business app", "AI-powered automation", "Third-party integrations", "Email marketing setup", "6 months support included"],
    cta: "Book a Call",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale custom apps, mobile apps, and comprehensive digital transformation.",
    features: ["Everything in Growth", "iOS & Android mobile apps", "Custom API development", "Advanced AI features", "Dedicated project manager", "12 months support included", "Priority response time"],
    cta: "Contact Us",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqSchema(PRICING_FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Pricing", url: "/pricing" }])} />
      <Section>
        <div className="text-center mb-16">
          <Badge className="mb-4">Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Enterprise Quality.{" "}
            <span className="text-primary">Small Business Prices.</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            No hidden fees. No monthly SaaS subscriptions. You own everything we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-8 ${tier.popular ? "border-primary bg-primary/5 ring-2 ring-primary shadow-xl scale-105" : "border-gray-200 bg-white"}`}
            >
              {tier.popular && <Badge className="mb-4">Most Popular</Badge>}
              <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
              <div className="text-3xl font-bold font-display text-primary mb-2">{tier.price}</div>
              <p className="text-sm text-gray-500 mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-success shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant={tier.popular ? "primary" : "outline"} className="w-full">
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <FAQ items={PRICING_FAQS} />

      <Section className="bg-gray-50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Every project is unique.</h2>
          <p className="text-gray-600 mb-6">
            These are starting points. We&apos;ll scope your exact needs in a free
            consultation and give you a transparent, fixed-price quote — no surprises.
          </p>
          <Button href="/contact">Get Your Custom Quote</Button>
        </div>
      </Section>
    </>
  );
}
