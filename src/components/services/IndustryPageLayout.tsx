import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ArrowRight,
  Bot,
  Cpu,
  MessageSquare,
  Zap,
  Database,
  Smartphone,
  CreditCard,
  Phone,
  Brain,
  BarChart3,
  Settings,
  Calendar,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/shared/FAQ";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqSchema, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { CDN } from "@/lib/constants";
import type { IndustryPageData } from "@/lib/industry-data";
import { CASE_STUDY, TECH_STACK } from "@/lib/industry-data";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Communication: <Phone className="h-5 w-5" />,
  Payment: <CreditCard className="h-5 w-5" />,
  Scheduling: <Calendar className="h-5 w-5" />,
  AI: <Brain className="h-5 w-5" />,
  Analytics: <BarChart3 className="h-5 w-5" />,
  Operations: <Settings className="h-5 w-5" />,
};

const TECH_ICONS: Record<string, React.ReactNode> = {
  Frontend: <Cpu className="h-5 w-5 text-primary" />,
  Mobile: <Smartphone className="h-5 w-5 text-primary" />,
  Database: <Database className="h-5 w-5 text-primary" />,
  Backend: <Zap className="h-5 w-5 text-primary" />,
  Payments: <CreditCard className="h-5 w-5 text-primary" />,
  Communication: <MessageSquare className="h-5 w-5 text-primary" />,
  AI: <Bot className="h-5 w-5 text-primary" />,
  Infrastructure: <Settings className="h-5 w-5 text-primary" />,
};

export function IndustryPageLayout({ data }: { data: IndustryPageData }) {
  const {
    icon,
    industry,
    slug,
    title,
    highlight,
    description,
    heroImage,
    businessContext,
    painPoints,
    solutions,
    crmFeatures,
    aiCapabilities,
    integrations,
    faqs,
    relatedServices,
    relatedIndustries,
  } = data;

  // Group integrations by category
  const integrationsByCategory = integrations.reduce(
    (acc, integration) => {
      if (!acc[integration.category]) acc[integration.category] = [];
      acc[integration.category].push(integration);
      return acc;
    },
    {} as Record<string, typeof integrations>
  );

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
          { name: industry, url: `/industries/${slug}` },
        ])}
      />
      <JsonLd
        data={serviceSchema(
          `Custom Software for ${industry}`,
          `Custom CRM, AI automation, and digital tools built specifically for ${industry.toLowerCase()} businesses.`,
          slug
        )}
      />

      {/* 1. Hero */}
      <section className="relative bg-dark text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${CDN}/images/backgrounds/navy-topographic.png`}
            alt=""
            fill
            className="object-cover opacity-20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={heroImage ? "grid md:grid-cols-2 gap-12 items-center" : "max-w-3xl mx-auto text-center"}>
            <div>
              <span className="text-5xl mb-6 block" role="img" aria-label={industry}>
                {icon}
              </span>
              <Badge variant="dark" className="mb-4">
                {industry}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
                {title} <span className="text-primary">{highlight}</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8">{description}</p>
              <Button href="/contact" size="lg">
                Book a Free Consultation
              </Button>
            </div>
            {heroImage && (
              <div className="relative hidden md:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/10">
                  <Image
                    src={heroImage}
                    alt={`Custom Software for ${industry} — Dashboard Interface by iOLab Digital`}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Business Context */}
      <Section>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-display mb-6">{businessContext.heading}</h2>
            {businessContext.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 text-lg leading-relaxed mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* 3. Pain Points vs Solutions */}
      <Section className="bg-gray-50">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold font-display mb-6">Sound Familiar?</h2>
              <ul className="space-y-4">
                {painPoints.map((p) => (
                  <li key={p} className="flex gap-3 text-gray-600">
                    <span className="text-red-500 font-bold shrink-0" aria-hidden="true">
                      &times;
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display mb-6">What We Build for You</h2>
              <ul className="space-y-4">
                {solutions.map((s) => (
                  <li key={s} className="flex gap-3 text-gray-600">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* 4. CRM Features */}
      <Section>
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">
              Custom CRM
            </Badge>
            <h2 className="text-3xl font-bold font-display mb-4">
              A CRM Built for How{" "}
              <span className="text-primary">{industry}</span> Actually Work
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Not another generic dashboard. Every module is designed around your real workflows,
              your terminology, and the way your team actually operates.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {crmFeatures.map((feature) => (
              <Card key={feature.title} hover>
                <Database className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/services/custom-crm" variant="outline">
              Learn About Custom CRM <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* 5. AI Automation */}
      <Section dark>
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="dark" className="mb-4">
              AI-Powered
            </Badge>
            <h2 className="text-3xl font-bold font-display mb-4">
              AI Is the New Competitive Edge for{" "}
              <span className="text-accent">{industry}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Most businesses in your industry haven&apos;t even started with AI. That&apos;s your window.
              We build intelligent automation directly into your custom tools — so you&apos;re not just
              keeping up, you&apos;re leading.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {aiCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-accent/30 transition-colors"
              >
                <Bot className="h-8 w-8 text-accent mb-3" aria-hidden="true" />
                <h3 className="font-bold text-lg mb-2">{cap.title}</h3>
                <p className="text-gray-400 text-sm">{cap.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/services/ai-automation" variant="secondary">
              Explore AI Automation <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* 6. Case Study */}
      <Section>
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="accent" className="mb-4">
                Real Results
              </Badge>
              <h2 className="text-3xl font-bold font-display">
                See What a Custom Platform Looks Like in Action
              </h2>
            </div>
            <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-8 md:p-10">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
                Case Study — {CASE_STUDY.industry}
              </p>
              <p className="text-gray-700 mb-6">{CASE_STUDY.challenge}</p>
              <div className="space-y-4 mb-6">
                {CASE_STUDY.modules.map((mod) => (
                  <div key={mod.title} className="flex gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-gray-900">{mod.title}</span>
                      <span className="text-gray-600"> — {mod.description}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-4">
                <p className="text-gray-700 font-medium">
                  <span className="text-primary font-bold">Result:</span> {CASE_STUDY.outcome}
                </p>
              </div>
              <div className="mt-6">
                <Button href="/contact" variant="outline" size="sm">
                  See How We Can Build This for You <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* 7. Tech Stack */}
      <Section className="bg-gray-50">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">
              Our Stack
            </Badge>
            <h2 className="text-3xl font-bold font-display mb-4">
              Built with Modern, Scalable Technology
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We use the same technologies that power apps at companies like Netflix, Uber, and
              Shopify — tailored to your budget and scale.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center text-center rounded-xl border border-gray-200 bg-white p-5 hover:border-primary/30 hover:shadow-md transition-all"
              >
                {TECH_ICONS[tech.category] || <Cpu className="h-5 w-5 text-primary" />}
                <span className="font-bold mt-2">{tech.name}</span>
                <span className="text-gray-400 text-xs mt-1">{tech.description}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* 8. Integrations */}
      <Section>
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              Integrations
            </Badge>
            <h2 className="text-3xl font-bold font-display mb-4">
              Connects with the Tools You Already Use
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Your custom platform plugs into the services your {industry.toLowerCase()} business
              relies on — no manual data entry, no copy-paste between apps.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {Object.entries(integrationsByCategory).map(([category, items]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-primary">{CATEGORY_ICONS[category]}</span>
                  <h3 className="font-bold text-lg">{category}</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <Zap className="h-4 w-4 text-accent shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <span className="font-semibold text-sm">{integration.name}</span>
                        <p className="text-gray-400 text-xs mt-0.5">{integration.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* 9. FAQ */}
      <FAQ items={faqs} />

      {/* 10. Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <Section className="bg-gray-50">
          <ScrollReveal>
            <h2 className="text-2xl font-bold font-display mb-8 text-center">Related Services</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <span className="font-medium text-gray-700 group-hover:text-primary">
                    {s.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* 11. Related Industries */}
      {relatedIndustries && relatedIndustries.length > 0 && (
        <Section>
          <ScrollReveal>
            <h2 className="text-2xl font-bold font-display mb-8 text-center">
              Explore Other Industries We Serve
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {relatedIndustries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <span className="font-medium text-gray-700 group-hover:text-primary">
                    {ind.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </Section>
      )}

      {/* 12. CTA */}
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Ready to Ditch the SaaS?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Let&apos;s build custom tools that fit your {industry.toLowerCase()} business perfectly
            — and save you thousands per year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">
              Book a Free Consultation
            </Button>
            <Button href="/why-custom" variant="outline" size="lg">
              Why Custom vs SaaS?
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
