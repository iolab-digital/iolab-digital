import type { Metadata } from "next";
import { Bot, Brain, Zap, MessageSquare, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { ChatbotDemoWrapper } from "./ChatbotDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "AI Chatbot Demo — Conversational Assistant",
  "Interactive AI chatbot demo with appointment booking, FAQ handling, emergency routing, and behind-the-scenes AI process view. Branded for your business.",
  "/demos/ai-chatbot",
  ["AI chatbot demo", "business chatbot", "conversational AI", "appointment booking bot", "customer service AI"]
);

const FEATURES = [
  { icon: MessageSquare, title: "Natural Conversations", description: "Customers pick from suggested prompts and the bot responds with contextual, helpful answers." },
  { icon: Brain, title: "Behind the Scenes", description: "Watch the AI's decision process in real time — intent detection, CRM lookups, and response generation." },
  { icon: Bot, title: "Smart Routing", description: "Emergency requests get escalated instantly. Routine questions handled automatically. Leads captured and qualified." },
  { icon: Zap, title: "24/7 Availability", description: "The chatbot handles inquiries around the clock — booking appointments, answering FAQs, and capturing leads while you sleep." },
];

export default function AIChatbotDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "AI Chatbot Demo", url: "/demos/ai-chatbot" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">AI <span className="text-primary">Chatbot</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">A conversational AI assistant that books appointments, answers questions, and captures leads. Click the suggested prompts to see it in action.</p>
        </div>
      </section>
      <Section><div className="max-w-6xl mx-auto"><ChatbotDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Never Miss Another Lead</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">An AI chatbot on your website handles inquiries 24/7 — booking appointments, answering questions, and capturing leads while you sleep.</p>
          <Button href="/contact" size="lg">Build My AI Chatbot <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
