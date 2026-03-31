import type { Metadata } from "next";
import { X, Check, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Why Custom vs SaaS",
  "See why custom-built software saves you money and gives you more control than paying for SaaS subscriptions forever. The math is simple.",
  "/why-custom",
  ["custom vs SaaS", "replace SaaS subscriptions", "custom software benefits", "SaaS alternative", "own your software"]
);

const WHY_CUSTOM_FAQS = [
  { question: "Is custom software really cheaper than SaaS?", answer: "Over time, absolutely. If you're paying $300/mo for 3 SaaS tools, that's $10,800/year or $54,000 over 5 years — and you own nothing. A custom solution costs a fraction of that upfront and you own it forever with no recurring fees." },
  { question: "What if my business needs change?", answer: "That's the beauty of custom — since we built it, we can modify it. Need a new feature? We add it. Need to change a workflow? We update it. Unlike SaaS where you're stuck with their roadmap, custom adapts to YOU." },
  { question: "Is custom software harder to maintain?", answer: "No. We build with modern, well-documented code and include a support period with every project. We also offer ongoing maintenance plans. It's no harder than managing SaaS subscriptions — and you have direct access to the team who built it." },
  { question: "What about security and updates?", answer: "We build with security best practices baked in. Your data stays on YOUR servers, not shared infrastructure with millions of other businesses. We handle security updates and patches as part of our maintenance plans." },
];

export default function WhyCustomPage() {
  return (
    <>
      <JsonLd data={faqSchema(WHY_CUSTOM_FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Why Custom vs SaaS", url: "/why-custom" }])} />
      <Section>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">The Smart Choice</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Why <span className="text-primary">Custom</span> Beats SaaS
          </h1>
          <p className="text-gray-600 text-lg">
            You&apos;re paying $200-$500/month for 5 different tools that don&apos;t talk to each
            other. In 5 years, that&apos;s $60,000+ — and you own nothing. There&apos;s a better way.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-200">
            {/* SaaS Column */}
            <div className="bg-red-50 p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-error">
                <X className="h-6 w-6" /> SaaS Subscriptions
              </h3>
              {[
                "Monthly fees forever — $200-$500/mo per tool",
                "Generic features built for the masses",
                "Their branding on your customer experience",
                "Your data locked in their ecosystem",
                "Price increases every year",
                "Limited customization options",
                "Support ticket queues and chatbots",
                "Pay more as you grow (per-seat pricing)",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-gray-700 mb-3">
                  <X className="h-5 w-5 text-error shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Custom Column */}
            <div className="bg-green-50 p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-success">
                <Check className="h-6 w-6" /> Custom Built by iOLab
              </h3>
              {[
                "One-time investment + optional support plan",
                "Features built exactly for YOUR workflow",
                "100% your brand, your design, your experience",
                "You own your code, your data, everything",
                "No price increases — it's yours",
                "Unlimited customization — we built it, we can change it",
                "Direct access to the team who built it",
                "Flat pricing — same cost whether 5 or 500 users",
              ].map((item) => (
                <div key={item} className="flex gap-3 text-gray-700 mb-3">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section dark>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            The Math is Simple
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-xl bg-dark-800 p-8 text-center">
              <div className="text-4xl font-bold text-error mb-2">$60,000+</div>
              <div className="text-gray-400">5 SaaS tools x $200/mo x 5 years</div>
              <div className="text-sm text-gray-500 mt-2">And you own nothing.</div>
            </div>
            <div className="rounded-xl bg-dark-800 p-8 text-center border border-primary/30">
              <div className="text-4xl font-bold text-success mb-2">Fraction</div>
              <div className="text-gray-400">One custom platform — built for you</div>
              <div className="text-sm text-gray-500 mt-2">And you own everything.</div>
            </div>
          </div>
          <Button href="/contact" size="lg">
            See How Much You Could Save <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>

      <FAQ items={WHY_CUSTOM_FAQS} />
    </>
  );
}
