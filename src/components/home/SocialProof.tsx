"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { staggerContainer, staggerItem } from "@/lib/animations";

const TESTIMONIALS = [
  {
    quote:
      "iOLab replaced our entire SaaS stack with one custom platform. We're saving over $2,000/month and the system actually fits how we work.",
    name: "Operations Director",
    company: "Multi-Location Service Business",
    result: "$24K+ saved annually",
  },
  {
    quote:
      "The AI chatbot handles 60% of our inquiries now. We haven't missed an after-hours lead since we launched. Game changer for our practice.",
    name: "Practice Manager",
    company: "Healthcare Practice",
    result: "60% fewer missed leads",
  },
  {
    quote:
      "We went from 5 separate tools to one dashboard. Our team onboards in hours instead of weeks, and we own everything.",
    name: "Business Owner",
    company: "Growing Service Company",
    result: "5 tools → 1 platform",
  },
];

const PARTNERS = [
  { name: "Microsoft Advertising Partner", label: "Microsoft" },
  { name: "Semrush Agency Partner", label: "Semrush" },
  { name: "SiteMinder Advocate", label: "SiteMinder" },
  { name: "Mailchimp Partner", label: "Mailchimp" },
];

export function SocialProof() {
  return (
    <Section>
      <div className="text-center mb-10">
        <Badge className="mb-4">Trusted by 100+ Businesses</Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Real Results from <span className="text-primary">Real Businesses</span>
        </h2>
      </div>

      {/* Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
      >
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.name}
            variants={staggerItem}
            className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col"
          >
            <Quote className="h-8 w-8 text-primary/20 mb-3" />
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-gray-400">{t.company}</div>
              <div className="mt-2 text-xs font-bold text-primary">{t.result}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Partner badges */}
      <div className="text-center">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
          Certified Partner
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-xs font-medium text-gray-500"
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
