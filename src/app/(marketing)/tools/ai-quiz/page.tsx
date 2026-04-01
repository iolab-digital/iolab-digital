import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { AIReadinessQuiz } from "@/components/tools/AIReadinessQuiz";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = pageMetadata(
  "AI Readiness Quiz — Is Your Business Ready?",
  "Take our free 5-question quiz to find out if your business is ready for AI automation. Get a personalized score and AI implementation roadmap.",
  "/tools/ai-quiz",
  [
    "AI readiness quiz",
    "is my business ready for AI",
    "AI for small business quiz",
    "AI automation assessment",
    "business AI readiness",
  ]
);

const FAQS = [
  { question: "What does the AI readiness score mean?", answer: "Your score (0-100) measures how much your business would benefit from AI automation based on your current operations. Higher scores mean more potential ROI from AI — not that you're behind. Even 'Beginner' scores mean there's massive opportunity." },
  { question: "What kind of AI are we talking about?", answer: "Practical business AI — not sci-fi robots. We're talking about AI chatbots that handle customer inquiries 24/7, automated follow-up sequences, smart scheduling, document generation, and predictive analytics. Tools that save your team hours every week." },
  { question: "How much does AI automation cost?", answer: "AI features are typically built into your custom platform for $10,000-$30,000 depending on complexity. Compare that to hiring one full-time employee at $40K+/year. Most businesses see positive ROI within 3-6 months." },
  { question: "Do I need to replace my current tools to use AI?", answer: "Not necessarily. AI can be layered on top of your existing systems — a chatbot on your website, automated follow-ups from your CRM, or an AI phone system alongside your current setup. But the biggest impact comes when AI is integrated into a custom platform built for your workflow." },
];

export default function AIQuizPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools/ai-quiz" }, { name: "AI Readiness Quiz", url: "/tools/ai-quiz" }])} />
      <JsonLd data={faqSchema(FAQS)} />

      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Free Assessment</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Is Your Business Ready for{" "}
            <span className="text-accent">AI Automation?</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Answer 5 quick questions and get a personalized AI readiness score with
            specific recommendations for your industry. Takes 60 seconds.
          </p>
        </div>
      </section>

      <Section>
        <AIReadinessQuiz />
      </Section>

      <FAQ items={FAQS} />

      <Section className="bg-gray-50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-display mb-4">Explore More</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/tools/saas-calculator" variant="outline">
              SaaS Cost Calculator <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/demos/ai-chatbot">
              Try the AI Chatbot Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>

      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">
            Ready to Start with AI?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Book a free consultation and we&apos;ll map out exactly which AI
            features would have the biggest impact on your business.
          </p>
          <Button href="/contact" size="lg">
            Book a Free AI Consultation <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
