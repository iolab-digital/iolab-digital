import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Email Marketing Automation",
  "Automated email campaigns that nurture leads, recover abandoned carts, and drive revenue on autopilot for small businesses.",
  "/services/email-marketing",
  ["email marketing automation", "email campaigns", "Klaviyo setup", "Mailchimp automation", "email marketing for small business", "automated email sequences"]
);

export default function EmailMarketingPage() {
  return (
    <ServicePageLayout
      badge="Email Marketing"
      title="Automated Campaigns That"
      highlight="Drive Revenue"
      description="Set up once, earn forever. We build email automation systems that nurture leads, recover abandoned carts, and keep customers coming back."
      icon={Mail}
      slug="email-marketing"
      features={[
        "Welcome sequences & onboarding flows",
        "Abandoned cart recovery automation",
        "Customer re-engagement campaigns",
        "Segmentation & personalization",
        "A/B testing & optimization",
        "Custom email template design",
        "Klaviyo, Mailchimp, or custom setup",
        "Performance reporting & analytics",
      ]}
      faqs={[
        { question: "Which email platform do you recommend?", answer: "It depends on your business. We're Mailchimp Partners and work extensively with Klaviyo. For e-commerce, Klaviyo excels. For general business, Mailchimp is great. We also build custom email systems using Resend for clients who want full control." },
        { question: "How quickly will I see results from email marketing?", answer: "Most clients see measurable results within 30-60 days. Welcome sequences start converting immediately. Abandoned cart recovery typically recovers 5-15% of lost sales within the first month." },
        { question: "Do you write the email content?", answer: "Yes. We handle strategy, copywriting, design, and technical setup. You approve the content before anything goes out, and we optimize based on performance data." },
        { question: "Can you integrate email with our CRM or website?", answer: "Absolutely. We connect your email platform with your website, CRM, e-commerce platform, and any other tools to ensure seamless data flow and automated triggers." },
      ]}
      relatedServices={[
        { title: "AI Automation", slug: "ai-automation" },
        { title: "Digital Marketing", slug: "digital-marketing" },
        { title: "Custom CRM", slug: "custom-crm" },
      ]}
    />
  );
}
