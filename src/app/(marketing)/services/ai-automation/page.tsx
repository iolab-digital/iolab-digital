import type { Metadata } from "next";
import { Bot } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "AI Automation",
  "AI chatbots, workflow automation, smart scheduling & AI-powered customer service that works 24/7 for your small business.",
  "/services/ai-automation",
  ["AI automation", "AI chatbot for business", "workflow automation", "AI customer service", "business process automation", "AI for small business"]
);

export default function AIAutomationPage() {
  return (
    <ServicePageLayout
      badge="AI Automation"
      title="AI That Works"
      highlight="24/7 for Your Business"
      description="Automate repetitive tasks, respond to customers instantly, and make smarter decisions — all powered by AI built into your custom tools."
      icon={Bot}
      slug="ai-automation"
      features={[
        "AI-powered customer service chatbots",
        "Automated lead qualification & routing",
        "Smart scheduling & appointment booking",
        "Document processing & data extraction",
        "Personalized email & SMS automation",
        "Predictive analytics & insights",
        "Workflow automation (eliminate manual tasks)",
        "Integration with existing tools & systems",
      ]}
      faqs={[
        { question: "What kind of tasks can AI automate for my business?", answer: "AI can automate customer inquiries (chatbots), lead qualification, appointment scheduling, follow-up emails/SMS, data entry, invoice processing, review responses, and much more. We identify the highest-impact automations during our discovery process." },
        { question: "Will AI replace my staff?", answer: "No — AI augments your team, not replaces them. It handles repetitive, time-consuming tasks so your team can focus on high-value work like building relationships and closing deals. Think of it as giving every employee a 24/7 assistant." },
        { question: "How do AI chatbots compare to live chat?", answer: "AI chatbots handle 80%+ of common questions instantly, 24/7, without wait times. They escalate complex issues to your team. This means faster response times for customers and less workload for your staff." },
        { question: "Can AI automation integrate with our existing tools?", answer: "Yes. We integrate AI automation with your CRM, email, calendar, payment processor, and any other business tools you use. Everything works together seamlessly." },
      ]}
      heroImage="https://iolab.nyc3.digitaloceanspaces.com/images/generated/services/ai-hero.png"
      showcaseImage="https://iolab.nyc3.digitaloceanspaces.com/images/generated/services/ai-showcase.png"
      relatedServices={[
        { title: "Custom CRM", slug: "custom-crm" },
        { title: "Email Marketing", slug: "email-marketing" },
        { title: "Mobile Apps", slug: "mobile-apps" },
      ]}
    />
  );
}
