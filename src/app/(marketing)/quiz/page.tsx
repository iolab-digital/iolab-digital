import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { AIAutomationQuiz } from "@/components/tools/AIAutomationQuiz";
import { FAQ } from "@/components/shared/FAQ";

export const metadata: Metadata = pageMetadata(
  "AI Automation Quiz — What Can AI Do for Your Business?",
  "Take our free 2-minute quiz to discover which AI automations could save your business time, close more deals, and improve customer satisfaction.",
  "/quiz",
  [
    "AI automation quiz",
    "business AI assessment",
    "AI for small business",
    "custom CRM quiz",
    "AI readiness test",
    "business automation quiz",
    "Medford NJ AI",
  ]
);

const FAQ_ITEMS = [
  {
    question: "How long does the AI Automation Quiz take?",
    answer:
      "About 2 minutes. There are 7 quick questions about your current business operations. No signup is required to see your results — you'll get a personalized AI automation score and specific recommendations immediately.",
  },
  {
    question: "What kind of AI automations can a small business actually use?",
    answer:
      "The most impactful AI automations for small businesses include: AI chatbots for 24/7 customer service, automated lead follow-up that responds in under 60 seconds, smart scheduling and appointment booking, automated invoicing and payment reminders, AI-powered review management, and unified CRM platforms that replace multiple SaaS subscriptions.",
  },
  {
    question: "How much does custom AI automation cost compared to SaaS tools?",
    answer:
      "Most businesses spend $500-$2,000/month on disconnected SaaS tools (CRM, email, scheduling, chat, etc.). A custom AI-powered platform typically costs a one-time build fee, then $50-200/month to maintain — saving 40-60% over time while delivering a far better experience tailored to your exact workflows.",
  },
];

export default function QuizPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "AI Automation Quiz", url: "/quiz" },
        ])}
      />
      <JsonLd data={faqSchema(FAQ_ITEMS)} />

      {/* Hero */}
      <section className="bg-dark text-white py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Free 2-Minute Assessment
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            What Can AI Do for <span className="text-primary">Your</span> Business?
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Answer 7 quick questions and get a personalized AI automation roadmap — with specific tools, estimated ROI, and real client results.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <Section>
        <AIAutomationQuiz />
      </Section>

      {/* FAQ */}
      <Section className="bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-display text-center mb-8">
            Frequently Asked Questions
          </h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </Section>
    </>
  );
}
