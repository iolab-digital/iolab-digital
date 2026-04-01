import type { Metadata } from "next";
import { Gift, Star, UserPlus, Trophy, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { LoyaltyDemoWrapper } from "./LoyaltyDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "Loyalty & Rewards Demo",
  "Interactive loyalty program demo with point tracking, tier progression, rewards catalog, and referral system. Branded for your business.",
  "/demos/loyalty",
  ["loyalty program demo", "rewards program", "customer loyalty", "referral program demo"]
);

const FEATURES = [
  { icon: Trophy, title: "Tier Progression", description: "Bronze → Silver → Gold → Platinum. Members see their progress and unlock perks as they level up." },
  { icon: Gift, title: "Rewards Catalog", description: "Redeemable rewards with point costs. Click 'Redeem' and watch the points deduct in real time." },
  { icon: Star, title: "Points History", description: "Full transaction log showing points earned from visits and redeemed for rewards." },
  { icon: UserPlus, title: "Referral System", description: "Refer friends, earn bonus points. Track who joined and pending invitations." },
];

export default function LoyaltyDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "Loyalty Demo", url: "/demos/loyalty" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Loyalty & <span className="text-primary">Rewards</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">A branded loyalty program with tiers, points, rewards, and referrals. Try redeeming a reward to see the animation.</p>
        </div>
      </section>
      <Section><div className="max-w-5xl mx-auto"><LoyaltyDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Your Brand. Your Rewards. Your Data.</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">A custom loyalty program that customers engage with through YOUR brand — not a third-party marketplace.</p>
          <Button href="/contact" size="lg">Build My Loyalty Program <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
