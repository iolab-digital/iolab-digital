import type { Metadata } from "next";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ClientLogoCarousel } from "@/components/home/ClientLogoCarousel";
import { ProblemSolution } from "@/components/home/ProblemSolution";
import { ServiceCards } from "@/components/home/ServiceCards";
import { CRMFeatureExplorer } from "@/components/home/CRMFeatureExplorer";
import { PortfolioShowcase } from "@/components/home/PortfolioShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "iOLab Digital | Custom Apps, AI Automation & Digital Marketing for Small Business",
  description:
    "Stop renting software. Start owning it. iOLab Digital builds custom CRM, mobile apps, AI automation & digital marketing solutions for small businesses — enterprise quality at a fraction of the cost.",
  keywords: [
    "custom CRM development", "AI automation agency", "custom mobile apps",
    "replace SaaS subscriptions", "small business custom software",
    "digital marketing agency NJ", "web design Medford NJ", "iOLab Digital",
  ],
  openGraph: {
    title: "iOLab Digital | Custom Apps & AI Automation for Small Business",
    description: "Custom CRM, mobile apps, AI automation & digital marketing — enterprise power at small business prices.",
    url: "/",
  },
  alternates: { canonical: "/" },
};

const HOME_FAQS = [
  { question: "What does iOLab Digital do?", answer: "We build custom software (CRM, mobile apps, web apps) and provide AI automation and digital marketing services for small businesses. We replace expensive SaaS subscriptions with custom-built, branded solutions you own — at a fraction of the cost." },
  { question: "How much does a custom app cost?", answer: "Projects start at $5,000 for custom websites and $15,000+ for custom CRM and business apps. Every project is scoped individually. We provide transparent, fixed-price quotes after a free consultation — no surprises." },
  { question: "How long does it take to build a custom app?", answer: "Most projects are delivered in 2-4 months depending on complexity. Custom websites take 4-6 weeks, while full custom CRM or mobile apps take 3-6 months. We provide weekly demos so you see progress every step of the way." },
  { question: "Why should I choose custom software over SaaS?", answer: "SaaS tools charge monthly fees forever, lock your data in their ecosystem, and give you generic features. Custom software is built to YOUR workflow, branded to YOUR business, and owned by YOU — no subscriptions, no limits, no price increases." },
  { question: "What industries do you serve?", answer: "We serve any small business — restaurants, contractors, dental offices, pest control, HVAC, plumbers, florists, salons, law firms, auto shops, and more. If you run a business, we can build the custom tools you need." },
  { question: "Do you offer ongoing support?", answer: "Yes. Every project includes an initial support period (3-12 months depending on the plan). After that, we offer affordable monthly support plans. Since we built it, we can maintain and evolve it as your business grows." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }])} />
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <TopBar />
      <Navbar />
      <main>
        <HeroSection />
        <ClientLogoCarousel />
        <ProblemSolution />
        <ServiceCards />
        <CRMFeatureExplorer />
        <PortfolioShowcase />
        <HowItWorks />
        <IndustriesGrid />
        <FAQ items={HOME_FAQS} />
      </main>
      <Footer />
    </>
  );
}
