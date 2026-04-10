"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  Check,
  Sparkles,
  Mail,
  ArrowRight,
  Loader2,
  Zap,
  Bot,
  Clock,
  Brain,
  Star,
  MessageSquare,
  Quote,
  Globe,
  Palette,
  ExternalLink,
} from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";

/* ---------- TYPES ---------- */

type Question = {
  id: string;
  question: string;
  subtitle?: string;
  options: { label: string; score: number; aiCategory?: string }[];
};

type Testimonial = {
  name: string;
  company: string;
  quote: string;
  metric: string;
};

type AIRecommendation = {
  title: string;
  description: string;
  link: string;
  icon: typeof Bot;
};

type BrandData = {
  businessName: string;
  primaryColor: string;
  accentColor: string;
  logoUrl: string | null;
  fontStyle: string;
  industry: string;
};

/* ---------- DATA ---------- */

const QUESTIONS: Question[] = [
  {
    id: "leadFollowUp",
    question: "How do you currently follow up with new leads or inquiries?",
    subtitle: "Speed-to-lead is the #1 predictor of closing a deal.",
    options: [
      { label: "Manually call/email within a few hours", score: 10 },
      { label: "We try, but sometimes leads slip through the cracks", score: 25 },
      { label: "Our CRM sends an auto-reply, then we follow up", score: 15 },
      { label: "We don't have a system — it's ad hoc", score: 35 },
    ],
  },
  {
    id: "afterHours",
    question: "What happens when a customer calls or messages after hours?",
    subtitle: "78% of customers buy from the first business that responds.",
    options: [
      { label: "We have staff covering nights/weekends", score: 5 },
      { label: "Voicemail — we call back next day", score: 25 },
      { label: "Email autoresponder, nothing else", score: 20 },
      { label: "They wait until we're open", score: 30 },
    ],
  },
  {
    id: "manualWork",
    question: "How much time does your team spend on scheduling, invoicing, or data entry each week?",
    subtitle: "This is time AI could give back to you.",
    options: [
      { label: "Less than 2 hours", score: 5 },
      { label: "2–5 hours", score: 15 },
      { label: "5–15 hours", score: 30 },
      { label: "15+ hours — it's a full-time job", score: 40 },
    ],
  },
  {
    id: "reviews",
    question: "How do you currently handle customer reviews and reputation?",
    subtitle: "Businesses that respond to reviews earn 35% more revenue.",
    options: [
      { label: "We actively ask for reviews and respond to all", score: 5 },
      { label: "We respond when we remember", score: 20 },
      { label: "We know it's important but haven't set up a system", score: 30 },
      { label: "We don't monitor reviews at all", score: 35 },
    ],
  },
  {
    id: "toolCount",
    question: "How many different software tools are you paying for?",
    subtitle: "CRM, email, scheduling, invoicing, chat — they add up fast.",
    options: [
      { label: "1–2 tools", score: 5 },
      { label: "3–5 tools", score: 15 },
      { label: "6–10 tools", score: 25 },
      { label: "10+ and they don't talk to each other", score: 35 },
    ],
  },
  {
    id: "biggestWin",
    question: "What's the one thing that would free up the most time in your day?",
    subtitle: "Pick the area where you feel the most friction.",
    options: [
      { label: "Automated customer communication", score: 20, aiCategory: "chatbot" },
      { label: "Faster lead follow-up and sales pipeline", score: 20, aiCategory: "crm" },
      { label: "Less manual paperwork and data entry", score: 20, aiCategory: "automation" },
      { label: "Better scheduling and coordination", score: 20, aiCategory: "operations" },
    ],
  },
  {
    id: "industry",
    question: "What industry is your business in?",
    subtitle: "We'll customize your results to your specific field.",
    options: INDUSTRIES.map((ind) => ({
      label: `${ind.icon} ${ind.name}`,
      score: 0,
    })),
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alison Altobelli",
    company: "Maven",
    quote: "Since iOLab built our custom CRM with AI follow-ups, our response time went from 4 hours to under 60 seconds. We've closed 35% more deals.",
    metric: "35% more deals closed",
  },
  {
    name: "Isaac Link",
    company: "Hammond Packaging",
    quote: "We replaced 6 different SaaS tools with one custom platform. Our team saves 12 hours a week on data entry alone.",
    metric: "12 hours saved per week",
  },
  {
    name: "Joe Sanfilippo",
    company: "Sandbar Joe's",
    quote: "The AI chatbot handles 70% of our customer questions automatically — even at 2am. Our reviews went from 3.8 to 4.7 stars.",
    metric: "3.8 → 4.7 star reviews",
  },
  {
    name: "Donna King",
    company: "Homeland Industrial Supply",
    quote: "iOLab's AI automation increased our sales pipeline visibility by 200%. We finally know exactly where every lead stands.",
    metric: "200% pipeline visibility",
  },
];

// Show testimonial after these question indexes (0-based)
const TESTIMONIAL_AFTER_Q = [0, 2, 4, 5];

// Map biggestWin category to the best demo slug
const CATEGORY_TO_DEMO: Record<string, string> = {
  chatbot: "ai-chatbot",
  crm: "crm",
  automation: "invoicing",
  operations: "booking",
};

/* ---------- RECOMMENDATION ENGINE ---------- */

function getRecommendations(answers: Record<string, number>, industryLabel: string, biggestWinCategory?: string): AIRecommendation[] {
  const recs: AIRecommendation[] = [];
  const industry = INDUSTRIES.find((i) => industryLabel.includes(i.name))?.slug || "restaurants";

  if (answers.leadFollowUp >= 25) {
    recs.push({ title: "AI-Powered Instant Lead Response", description: "Respond to every inquiry in under 60 seconds with AI. Qualify leads, book calls, and never let a prospect go cold again.", link: "/demos/crm", icon: Zap });
  }
  if (answers.afterHours >= 20) {
    recs.push({ title: "24/7 AI Chatbot for Customer Service", description: "An AI assistant handles inquiries, books appointments, and captures leads around the clock — even at 2am on a Saturday.", link: "/demos/ai-chatbot", icon: Bot });
  }
  if (answers.manualWork >= 15) {
    recs.push({ title: "Workflow & Task Automation", description: "Automate invoicing, appointment reminders, status updates, and data entry. Reclaim 10-20+ hours per week for your team.", link: "/services/ai-automation", icon: Clock });
  }
  if (answers.reviews >= 20) {
    recs.push({ title: "AI Reputation Management", description: "Automatically request reviews after every job, respond to feedback with AI, and monitor your online presence in real-time.", link: "/services/ai-automation", icon: Star });
  }
  if (answers.toolCount >= 15) {
    recs.push({ title: "Unified Custom Platform", description: "Replace your 5+ separate subscriptions with one platform built for YOUR workflows. All your data in one place, connected by AI.", link: "/tools/saas-calculator", icon: Brain });
  }
  if (biggestWinCategory === "chatbot" && !recs.find(r => r.link.includes("chatbot"))) {
    recs.push({ title: "AI Customer Communication Hub", description: "Smart chatbot + automated email + SMS in one system. Your customers get instant answers, your team gets fewer interruptions.", link: "/demos/ai-chatbot", icon: MessageSquare });
  }
  if (biggestWinCategory === "crm" && !recs.find(r => r.link.includes("crm"))) {
    recs.push({ title: "Custom AI-Powered CRM", description: "A CRM built around YOUR sales process with AI lead scoring, automated follow-ups, and pipeline intelligence.", link: "/demos/crm", icon: Sparkles });
  }
  recs.push({
    title: `AI Solutions for ${INDUSTRIES.find((i) => i.slug === industry)?.name || "Your Industry"}`,
    description: "See exactly how AI automation transforms businesses in your specific industry — from smart scheduling to automated customer communication.",
    link: `/industries/${industry}`,
    icon: Brain,
  });
  return recs.slice(0, 3);
}

/* ---------- COMPONENT ---------- */

export function AIAutomationQuiz() {
  const [currentQ, setCurrentQ] = useState(-1); // -1 = welcome screen
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [industryLabel, setIndustryLabel] = useState("");
  const [biggestWinCategory, setBiggestWinCategory] = useState<string | undefined>();
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Lead capture gate (between questions and results)
  const [showGate, setShowGate] = useState(false);
  const [gateUrl, setGateUrl] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateName, setGateName] = useState("");
  const [gateLoading, setGateLoading] = useState(false);
  const [gateProgress, setGateProgress] = useState(0);
  const [gateError, setGateError] = useState("");
  const [brandData, setBrandData] = useState<BrandData | null>(null);

  // Results
  const [showResults, setShowResults] = useState(false);

  const question = currentQ >= 0 ? QUESTIONS[currentQ] : null;
  const totalScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const maxPossible = 200;
  const scorePct = Math.min(100, Math.round((totalScore / maxPossible) * 100));

  const tier =
    scorePct <= 25
      ? { label: "Your Basics Are Covered", color: "#6b7280", bg: "bg-gray-50 border-gray-300" }
      : scorePct <= 50
        ? { label: "Quick Wins Available", color: "#f59e0b", bg: "bg-amber-50 border-amber-300" }
        : scorePct <= 75
          ? { label: "High ROI Opportunity", color: "#7B2FF7", bg: "bg-primary/5 border-primary/30" }
          : { label: "AI Would Transform Your Business", color: "#22c55e", bg: "bg-green-50 border-green-300" };

  // The best demo to link to, based on their biggest pain point
  const bestDemoSlug = biggestWinCategory ? (CATEGORY_TO_DEMO[biggestWinCategory] || "crm") : "crm";

  // Auto-advance testimonial after 5 seconds
  const advanceFromTestimonial = useCallback(() => {
    setShowTestimonial(false);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      // All questions done → show the lead capture gate
      setShowGate(true);
    }
  }, [currentQ]);

  useEffect(() => {
    if (!showTestimonial) return;
    const t = setTimeout(advanceFromTestimonial, 5000);
    return () => clearTimeout(t);
  }, [showTestimonial, advanceFromTestimonial]);

  function handleAnswer(optionLabel: string, score: number, aiCategory?: string) {
    setSelectedOption(optionLabel);
    if (question?.id === "industry") setIndustryLabel(optionLabel);
    if (question?.id === "biggestWin" && aiCategory) setBiggestWinCategory(aiCategory);

    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [question!.id]: score }));
      setSelectedOption(null);

      const tIdx = TESTIMONIAL_AFTER_Q.indexOf(currentQ);
      if (tIdx !== -1 && tIdx < TESTIMONIALS.length) {
        setTestimonialIdx(tIdx);
        setShowTestimonial(true);
      } else if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        // Last question → show the lead capture gate
        setShowGate(true);
      }
    }, 300);
  }

  // Gate submission: extract brand + capture lead → show results
  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gateUrl.trim() || !gateEmail.trim()) {
      setGateError("Please enter your website URL and email.");
      return;
    }
    setGateLoading(true);
    setGateError("");
    setGateProgress(0);

    const progressInterval = setInterval(() => {
      setGateProgress((p) => Math.min(p + Math.random() * 12, 90));
    }, 500);

    try {
      // 1. Extract brand from website
      const brandRes = await fetch("/api/demos/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: gateUrl.trim() }),
      });
      const brand: BrandData = await brandRes.json();
      setBrandData(brand);
      setGateProgress(80);

      // 2. Capture lead
      const industrySlug = INDUSTRIES.find((i) => industryLabel.includes(i.name))?.slug || brand.industry || "business";
      await fetch("/api/demos/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: gateUrl.trim(),
          name: gateName.trim() || undefined,
          email: gateEmail.trim(),
          demoType: "ai-automation-quiz",
          brandData: brand,
        }),
      });
      setGateProgress(100);

      // Analytics
      try { window.gtag?.("event", "quiz_complete", { score: scorePct, tier: tier.label, quiz: "ai-automation", brand: brand.businessName }); } catch {}

      setTimeout(() => {
        clearInterval(progressInterval);
        setShowGate(false);
        setShowResults(true);
      }, 600);
    } catch {
      clearInterval(progressInterval);
      setGateError("Something went wrong. Please try again.");
      setGateLoading(false);
    }
  }

  /* ---- WELCOME SCREEN ---- */
  if (currentQ === -1) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Brain className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
          What Can AI Do for <span className="text-primary">Your</span> Business?
        </h2>
        <p className="text-gray-500 mb-2 max-w-md mx-auto">
          Answer 7 quick questions and get a personalized AI automation roadmap — specific to your industry, pain points, and goals.
        </p>
        <p className="text-xs text-gray-400 mb-8">Takes about 2 minutes. Free personalized results.</p>
        <button
          onClick={() => setCurrentQ(0)}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20"
        >
          Start the Quiz <ArrowRight className="h-5 w-5" />
        </button>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Save Money", value: "Cut SaaS costs 40-60%" },
            { label: "Close More Deals", value: "Respond in <60 seconds" },
            { label: "Boost Productivity", value: "Save 10-20+ hrs/week" },
            { label: "Better Support", value: "24/7 AI-powered" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <div className="text-xs font-medium text-primary mb-1">{stat.label}</div>
              <div className="text-sm font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---- TESTIMONIAL INTERLUDE ---- */
  if (showTestimonial) {
    const t = TESTIMONIALS[testimonialIdx];
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-1 mb-8">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-500 ${i <= currentQ ? "bg-primary" : "bg-gray-200"}`} />
          ))}
        </div>
        <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-white p-8 md:p-10 text-center relative overflow-hidden">
          <Quote className="h-10 w-10 text-primary/20 mx-auto mb-4" />
          <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed mb-6 max-w-lg mx-auto italic">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="mb-4">
            <div className="font-bold text-sm">{t.name}</div>
            <div className="text-xs text-gray-500">{t.company}</div>
          </div>
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5">
            <span className="text-sm font-bold text-primary">{t.metric}</span>
          </div>
          <div className="mt-8">
            <button onClick={advanceFromTestimonial} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors">
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
            <div className="h-1 bg-primary/40" style={{ animation: "grow 5s linear forwards" }} />
          </div>
        </div>
        <style jsx>{`@keyframes grow { from { width: 0%; } to { width: 100%; } }`}</style>
      </div>
    );
  }

  /* ---- LEAD CAPTURE GATE (after all questions, before results) ---- */
  if (showGate) {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Full progress bar */}
        <div className="flex items-center gap-1 mb-8">
          {QUESTIONS.map((_, i) => (
            <div key={i} className="flex-1 h-2 rounded-full bg-primary" />
          ))}
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-display mb-2">
            Your results are ready!
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Enter your business website and we&apos;ll generate a <strong className="text-gray-800">branded AI demo</strong> customized with your logo, colors, and business name — plus your personalized AI scorecard.
          </p>
        </div>

        <form onSubmit={handleGateSubmit} className="max-w-md mx-auto space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Your Business Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="yourbusiness.com"
                value={gateUrl}
                onChange={(e) => setGateUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                required
                disabled={gateLoading}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Your Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="you@yourbusiness.com"
                value={gateEmail}
                onChange={(e) => setGateEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                required
                disabled={gateLoading}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Your Name <span className="text-gray-300">(optional)</span></label>
            <input
              type="text"
              placeholder="John Smith"
              value={gateName}
              onChange={(e) => setGateName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              disabled={gateLoading}
            />
          </div>

          {gateError && <p className="text-xs text-red-500 text-center">{gateError}</p>}

          {gateLoading && (
            <div className="space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="h-2.5 rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500" style={{ width: `${gateProgress}%` }} />
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                {gateProgress < 40 ? "Scanning your website..." : gateProgress < 80 ? "Extracting brand colors & logo..." : "Building your personalized demo..."}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={gateLoading || !gateUrl.trim() || !gateEmail.trim()}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
          >
            {gateLoading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Generating Your Results...</>
            ) : (
              <><Palette className="h-4 w-4" /> See My AI Score & Branded Demo</>
            )}
          </button>

          <p className="text-[10px] text-gray-400 text-center">We&apos;ll use AI to extract your brand from your website. No spam, ever.</p>
        </form>
      </div>
    );
  }

  /* ---- RESULTS ---- */
  if (showResults) {
    const recs = getRecommendations(answers, industryLabel, biggestWinCategory);
    const businessName = brandData?.businessName || gateName || "Your Business";

    return (
      <div className="max-w-2xl mx-auto">
        {/* Brand confirmation banner */}
        {brandData && (
          <div className="rounded-xl border border-gray-200 bg-white p-4 mb-6 flex items-center gap-4">
            {brandData.logoUrl && (
              <img src={brandData.logoUrl} alt={brandData.businessName} className="h-10 w-auto max-w-[120px] object-contain" />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm">{brandData.businessName}</div>
              <div className="text-xs text-gray-400 truncate">{gateUrl}</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-5 h-5 rounded-full border border-gray-200" style={{ background: brandData.primaryColor }} title="Primary color" />
              <div className="w-5 h-5 rounded-full border border-gray-200" style={{ background: brandData.accentColor }} title="Accent color" />
            </div>
          </div>
        )}

        {/* Score */}
        <div className="text-center mb-8">
          <div className={`inline-block rounded-2xl border-2 p-8 ${tier.bg}`}>
            <div className="text-6xl font-bold font-display mb-2" style={{ color: tier.color }}>
              {scorePct}%
            </div>
            <div className="text-sm font-bold" style={{ color: tier.color }}>
              {tier.label}
            </div>
          </div>
          <div className="mt-4 max-w-sm mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="h-3 rounded-full transition-all duration-1000" style={{ width: `${scorePct}%`, background: `linear-gradient(90deg, #6b7280, #f59e0b, #7B2FF7, #22c55e)` }} />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>Basics Covered</span>
              <span>Quick Wins</span>
              <span>High ROI</span>
              <span>Transform</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl bg-white border border-gray-200 p-6 mb-8">
          <h3 className="font-bold text-lg mb-2">What This Means for {businessName}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {scorePct <= 25
              ? "Your business has solid foundations in place. There are still targeted AI tools that could save you time on specific tasks — like automated follow-ups or smart scheduling. Even small automations add up to big time savings."
              : scorePct <= 50
                ? "You have clear quick wins available. AI could immediately help with lead response times, after-hours coverage, or repetitive tasks. Businesses like yours typically save 5-10 hours per week with targeted automation."
                : scorePct <= 75
                  ? "Your business has high ROI potential for AI. You're spending significant time on tasks AI handles effortlessly, and you're likely losing leads to slow follow-ups or after-hours gaps. Custom AI automation would pay for itself within months."
                  : "AI would fundamentally transform how your business operates. You're spending dozens of hours on automatable work, missing after-hours opportunities, and juggling too many disconnected tools. A custom AI-powered platform could reclaim 15-20+ hours per week and dramatically increase your close rate."}
          </p>
        </div>

        {/* BRANDED DEMO CTA — the hero conversion moment */}
        <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-white to-primary/5 p-6 mb-8 text-center">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Palette className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-bold text-lg mb-2">
            See AI in Action — Branded for {businessName}
          </h3>
          <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
            We built a live demo using <strong className="text-gray-700">your logo, colors, and business name</strong>. Click below to explore what a custom AI-powered {bestDemoSlug === "crm" ? "CRM" : bestDemoSlug === "ai-chatbot" ? "chatbot" : "platform"} would look like for your business.
          </p>
          <a
            href={`/demos/${bestDemoSlug}?url=${encodeURIComponent(gateUrl)}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-xl shadow-primary/25"
          >
            <ExternalLink className="h-4 w-4" /> Launch Your Branded Demo
          </a>
          {brandData?.logoUrl && (
            <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
              <img src={brandData.logoUrl} alt="" className="h-5 w-auto" />
              <span className="text-[10px] text-gray-400">Powered by your brand</span>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <h3 className="font-bold text-lg mb-4">Your Top AI Recommendations</h3>
        <div className="space-y-3 mb-8">
          {recs.map((rec) => (
            <a key={rec.title} href={rec.link} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-primary/30 hover:shadow-lg transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <rec.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{rec.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{rec.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary shrink-0 mt-3" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Book a Free AI Strategy Session <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-xs text-gray-400 mt-3">No commitment. 15-minute call with our AI specialist.</p>
        </div>
      </div>
    );
  }

  /* ---- QUIZ QUESTIONS ---- */
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-1 mb-8">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-300 ${i < currentQ ? "bg-primary" : i === currentQ ? "bg-primary/50" : "bg-gray-200"}`} />
        ))}
      </div>
      <div className="text-center mb-2">
        <span className="text-xs text-gray-400">Question {currentQ + 1} of {QUESTIONS.length}</span>
      </div>
      <h2 className="text-xl md:text-2xl font-bold font-display text-center mb-2">{question!.question}</h2>
      {question!.subtitle && <p className="text-sm text-gray-400 text-center mb-8">{question!.subtitle}</p>}
      <div className={`${question!.id === "industry" ? "grid grid-cols-2 sm:grid-cols-3" : "flex flex-col"} gap-3 max-w-lg mx-auto`}>
        {question!.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => handleAnswer(opt.label, opt.score, opt.aiCategory)}
            className={`rounded-xl border-2 p-4 text-left text-sm font-medium transition-all ${
              selectedOption === opt.label
                ? "border-primary bg-primary/5 text-primary scale-[0.98]"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary/30 hover:shadow-md"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {currentQ > 0 && (
        <button onClick={() => setCurrentQ((q) => q - 1)} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mt-6 mx-auto transition-colors">
          <ChevronLeft className="h-4 w-4" /> Previous question
        </button>
      )}
    </div>
  );
}
