"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INDUSTRIES, CDN } from "@/lib/constants";

import { data as restaurants } from "@/data/industries/restaurants";
import { data as contractors } from "@/data/industries/contractors";
import { data as dental } from "@/data/industries/dental";
import { data as homeServices } from "@/data/industries/home-services";
import { data as pestControl } from "@/data/industries/pest-control";
import { data as landscaping } from "@/data/industries/landscaping";
import { data as hvacPlumbing } from "@/data/industries/hvac-plumbing";
import { data as autoShops } from "@/data/industries/auto-shops";
import { data as salons } from "@/data/industries/salons";
import { data as lawFirms } from "@/data/industries/law-firms";
import { data as florists } from "@/data/industries/florists";
import { data as realEstate } from "@/data/industries/real-estate";

type FeatureSet = {
  features: { title: string; description: string }[];
  image: string;
  link: string;
};

const CURATED_ALL: FeatureSet = {
  features: [
    { title: "Lead-to-Deal Pipeline", description: "Track every opportunity from first contact to closed deal. Visual Kanban boards, automated follow-ups, and conversion tracking built around your sales process." },
    { title: "Smart Scheduling & Dispatch", description: "Drag-and-drop scheduling with availability tracking, skill matching, and route optimization. Your team gets push notifications with job details." },
    { title: "AI-Powered Automation", description: "AI drafts responses, qualifies leads, triggers follow-up sequences, and handles routine customer inquiries 24/7 — so your team focuses on high-value work." },
    { title: "Customer Portal", description: "Give your clients a branded login where they check project status, approve quotes, view invoices, and communicate with your team. Fewer phone calls, happier customers." },
    { title: "Invoicing & Payments", description: "Generate branded invoices from completed work. Customers pay online via credit card or ACH. Automated reminders chase overdue balances for you." },
    { title: "Analytics Dashboard", description: "Real-time metrics on revenue, team performance, customer retention, and pipeline health. Make decisions with data instead of gut feeling." },
  ],
  image: `${CDN}/images/generated/services/crm-hero.png`,
  link: "/services/custom-crm",
};

const INDUSTRY_DATA: Record<string, FeatureSet> = {
  restaurants: { features: restaurants.crmFeatures, image: restaurants.heroImage || `${CDN}/images/generated/industries/restaurants.png`, link: "/industries/restaurants" },
  contractors: { features: contractors.crmFeatures, image: contractors.heroImage || `${CDN}/images/generated/industries/contractors.png`, link: "/industries/contractors" },
  dental: { features: dental.crmFeatures, image: dental.heroImage || `${CDN}/images/generated/industries/dental.png`, link: "/industries/dental" },
  "home-services": { features: homeServices.crmFeatures, image: homeServices.heroImage || `${CDN}/images/generated/industries/home-services.png`, link: "/industries/home-services" },
  "pest-control": { features: pestControl.crmFeatures, image: pestControl.heroImage || `${CDN}/images/generated/industries/pest-control.png`, link: "/industries/pest-control" },
  landscaping: { features: landscaping.crmFeatures, image: landscaping.heroImage || `${CDN}/images/generated/industries/landscaping.png`, link: "/industries/landscaping" },
  "hvac-plumbing": { features: hvacPlumbing.crmFeatures, image: hvacPlumbing.heroImage || `${CDN}/images/generated/industries/hvac.png`, link: "/industries/hvac-plumbing" },
  "auto-shops": { features: autoShops.crmFeatures, image: autoShops.heroImage || `${CDN}/images/generated/industries/auto.png`, link: "/industries/auto-shops" },
  salons: { features: salons.crmFeatures, image: salons.heroImage || `${CDN}/images/generated/industries/salons.png`, link: "/industries/salons" },
  "law-firms": { features: lawFirms.crmFeatures, image: lawFirms.heroImage || `${CDN}/images/generated/industries/law.png`, link: "/industries/law-firms" },
  florists: { features: florists.crmFeatures, image: florists.heroImage || `${CDN}/images/generated/industries/florists.png`, link: "/industries/florists" },
  "real-estate": { features: realEstate.crmFeatures, image: realEstate.heroImage || `${CDN}/images/generated/industries/realestate.png`, link: "/industries/real-estate" },
};

export function CRMFeatureExplorer() {
  const [selected, setSelected] = useState("all");

  const current = selected === "all" ? CURATED_ALL : INDUSTRY_DATA[selected];
  const industryName = selected === "all"
    ? null
    : INDUSTRIES.find((i) => i.slug === selected)?.name;

  return (
    <Section className="bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10">
        <Badge variant="primary" className="mb-4">CRM Features</Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Not Sure What Your Custom CRM{" "}
          <span className="text-primary">Needs?</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Select your industry and see the exact features we&apos;d build for
          you. Every module is custom — no generic templates, no unused bloat.
        </p>
      </div>

      {/* Industry selector pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setSelected("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === "all"
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 inline mr-1.5" />
          All Industries
        </button>
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.slug}
            onClick={() => setSelected(ind.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected === ind.slug
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30 hover:text-primary"
            }`}
          >
            <span className="mr-1.5">{ind.icon}</span>
            {ind.name}
          </button>
        ))}
      </div>

      {/* Feature cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {current.features.slice(0, 6).map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Card image */}
              <div className="relative h-40 overflow-hidden bg-gray-100">
                <Image
                  src={current.image}
                  alt={`${feature.title} — Custom CRM Feature by iOLab Digital`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Card content */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <div className="text-center mt-10">
        <p className="text-gray-500 text-sm mb-4">
          {industryName
            ? `These are just some of the features we build for ${industryName} businesses.`
            : "These features are just the beginning. Every CRM we build is unique to your business."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/demos/crm" variant="outline">
            Try the CRM Demo <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          <Button href="/contact">
            Build My CRM <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        {industryName && (
          <Link
            href={current.link}
            className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-4 hover:underline"
          >
            See all {industryName} features <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </Section>
  );
}
