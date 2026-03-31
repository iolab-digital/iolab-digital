"use client";

import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { X, Check } from "lucide-react";

export function ProblemSolution() {
  return (
    <Section>
      <ScrollReveal>
        <Badge variant="accent" className="mb-4">
          The Problem
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
          You&apos;re Paying Too Much for Software That Doesn&apos;t Fit
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mb-12">
          5 different SaaS tools. $500+/month. None of them talk to each other.
          None of them match your brand. And you don&apos;t own any of it.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal>
          <div className="rounded-2xl border-2 border-error/20 bg-error/5 p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-error">
              <X className="h-6 w-6" /> The SaaS Trap
            </h3>
            <ul className="space-y-4">
              {[
                "Monthly fees that never stop — $200, $300, $500/mo forever",
                "Generic features built for everyone, optimized for no one",
                "Their branding, their limits, their rules",
                "Your data locked in their ecosystem",
                "Price increases every year — no negotiation",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-600">
                  <X className="h-5 w-5 text-error shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl border-2 border-success/20 bg-success/5 p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-success">
              <Check className="h-6 w-6" /> The iOLab Way
            </h3>
            <ul className="space-y-4">
              {[
                "One custom platform that does it all — built for YOUR workflow",
                "Your brand, your features, your data — you own everything",
                "AI-enhanced automation that works 24/7",
                "Fraction of the cost of years of SaaS subscriptions",
                "Ongoing support as your business grows",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-gray-600">
                  <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
