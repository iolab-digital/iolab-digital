import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE, NAV_LINKS, SERVICES, CDN } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* CTA Banner */}
      <div className="bg-primary py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Ready to Own Your Software?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Stop paying monthly fees for tools that don&apos;t fit. Let&apos;s
              build something that&apos;s yours — custom, branded, and
              AI-powered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white text-primary font-semibold px-8 py-3 hover:bg-gray-100 transition-colors"
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/why-custom"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white text-white font-semibold px-8 py-3 hover:bg-white/10 transition-colors"
              >
                Why Custom vs SaaS?
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={`${CDN}/images/logo/iolab-icon.png`}
                alt="iOLab Digital"
                width={120}
                height={40}
                className="h-9 w-auto"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Digital
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Custom apps, AI automation & digital marketing for small
              businesses. Enterprise power at small business prices.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" /> {SITE.email}
              </a>
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" /> {SITE.address}
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.slice(0, 7).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                ...NAV_LINKS.filter((l) => !l.children),
                { label: "Contact", href: "/contact" },
                { label: "Pricing", href: "/pricing" },
                { label: "Why Custom vs SaaS", href: "/why-custom" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              AI & Automation Tips
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get weekly insights on how small businesses are replacing SaaS with
              custom solutions.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} iOLab Digital. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {Object.entries(SITE.social).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
