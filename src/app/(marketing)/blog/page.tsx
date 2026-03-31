import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI automation tips, custom app development insights, and digital marketing strategies for small businesses.",
};

export default function BlogPage() {
  return (
    <Section>
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="mb-4">Blog</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
          AI & Automation <span className="text-primary">Insights</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Tips, strategies, and case studies on how small businesses are replacing
          SaaS with custom solutions and competing with enterprise companies.
        </p>
        <p className="text-gray-500 mb-8">New content coming soon. Subscribe to get notified.</p>
        <Button href="/contact">Get in Touch</Button>
      </div>
    </Section>
  );
}
