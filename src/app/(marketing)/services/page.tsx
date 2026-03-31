import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SERVICES, PROCESS_STEPS } from "@/lib/constants";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Services",
  "Custom CRM, mobile apps, AI automation, web design, email marketing, SEO & digital marketing — all built custom for your business. Replace SaaS with custom.",
  "/services",
  ["custom app development services", "AI automation services", "CRM development", "web design services", "digital marketing agency"]
);

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])} />
      <Section dark>
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="dark" className="mb-4">Our Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Everything Your Business Needs.{" "}
            <span className="text-primary">Nothing It Doesn&apos;t.</span>
          </h1>
          <p className="text-gray-400 text-lg">
            From custom apps to full-funnel marketing — we replace expensive SaaS
            tools and generic agencies with solutions built exactly for you.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug + service.title}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section dark>
        <div className="text-center mb-16">
          <Badge variant="dark" className="mb-4">Our Process</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            From Idea to Launch in <span className="text-primary">4 Steps</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.step}>
              <div className="text-6xl font-bold font-display text-primary/20 mb-4">
                {String(step.step).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Tell us about your business and the tools you&apos;re currently paying for.
            We&apos;ll show you how custom can save you thousands.
          </p>
          <Button href="/contact" size="lg">Book a Free Consultation</Button>
        </div>
      </Section>
    </>
  );
}
