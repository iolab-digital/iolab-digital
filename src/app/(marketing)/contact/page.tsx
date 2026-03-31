import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { SITE } from "@/lib/constants";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/shared/JsonLd";
import { localBusinessSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Contact Us",
  "Ready to replace expensive SaaS with custom software? Book a free consultation with iOLab Digital. Based in Medford, NJ — serving businesses nationwide.",
  "/contact",
  ["contact iOLab Digital", "free consultation", "custom software quote", "book a call", "Medford NJ developer"]
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])} />
    <Section>
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left: Info */}
        <div>
          <Badge className="mb-4">Let&apos;s Talk</Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Ready to <span className="text-primary">Own Your Software?</span>
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Tell us about your business and the tools you&apos;re currently
            using. We&apos;ll show you how a custom solution can save you
            thousands.
          </p>

          <div className="space-y-6">
            {[
              { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone}` },
              { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: MapPin, label: "Location", value: SITE.address },
              { icon: Clock, label: "Response Time", value: "Within 24 hours" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="font-medium">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </Section>
    </>
  );
}
