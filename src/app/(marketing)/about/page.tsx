import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { personSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "About iOLab Digital",
  "Meet Rauf Tur, founder of iOLab Digital. Since 2014, helping small businesses compete with enterprise companies through custom software and AI automation.",
  "/about",
  ["about iOLab Digital", "Rauf Tur", "custom software agency", "AI automation agency NJ", "Medford NJ tech company"]
);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])} />
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4">About iOLab Digital</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Helping Small Businesses{" "}
              <span className="text-primary">Compete & Win</span>
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Since 2014, iOLab Digital has been on a mission: give small businesses
              the same tools and technology that enterprise companies have — at a
              fraction of the cost.
            </p>
            <p className="text-gray-600 mb-6">
              We started as a digital marketing agency for the hospitality industry.
              Over the years, we saw our clients paying hundreds of dollars a month
              for SaaS tools that barely fit their needs. So we started building
              custom solutions instead.
            </p>
            <p className="text-gray-600 mb-8">
              Today, we&apos;re a full-stack development and AI automation agency.
              We build custom CRMs, mobile apps, websites, and marketing systems —
              all branded, all owned by our clients, all enhanced with AI.
            </p>
            <Button href="/contact">Let&apos;s Talk</Button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/images/team/rauf-tur.jpg"
                alt="Rauf Tur - Founder of iOLab Digital"
                width={600}
                height={600}
                className="object-cover w-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6">
              <div className="text-3xl font-bold font-display text-primary">12+</div>
              <div className="text-sm text-gray-500">Years in Business</div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <div className="text-center mb-12">
          <Badge className="mb-4">Our Founder</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            Meet <span className="text-primary">Rauf Tur</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 text-lg mb-6">
            Rauf Tur founded iOLab Digital in 2014 with a simple belief: small
            businesses shouldn&apos;t have to settle for generic, overpriced software.
          </p>
          <p className="text-gray-600 mb-6">
            With over a decade of experience in digital marketing, web development,
            and software engineering, Rauf has led the development of custom
            applications for businesses across restaurants, hospitality, wholesale,
            and more — including Wrapt by Hammont, Tappd, NIDO, and MEEZ.
          </p>
          <p className="text-gray-600">
            Based in Medford, New Jersey, iOLab Digital is a Microsoft Advertising
            Partner, Semrush Agency Partner, SiteMinder Advocate Partner, and
            Mailchimp Partner.
          </p>
        </div>
      </Section>

      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Ready to Build Something <span className="text-primary">Custom</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Stop renting software. Let&apos;s build tools that are yours — custom,
            branded, and AI-powered.
          </p>
          <Button href="/contact" size="lg">Book a Free Consultation</Button>
        </div>
      </Section>
    </>
  );
}
