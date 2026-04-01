"use client";

import { useState } from "react";
import {
  Brain,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Mail,
  ArrowRight,
  Loader2,
  Zap,
  Bot,
  Clock,
} from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";

type Question = {
  id: string;
  question: string;
  options: { label: string; score: number }[];
};

const QUESTIONS: Question[] = [
  {
    id: "repetitive",
    question: "How many hours per week does your team spend on repetitive tasks?",
    options: [
      { label: "0-5 hours", score: 10 },
      { label: "5-15 hours", score: 25 },
      { label: "15-30 hours", score: 40 },
      { label: "30+ hours", score: 50 },
    ],
  },
  {
    id: "afterhours",
    question: "How do you handle customer inquiries after hours?",
    options: [
      { label: "We have 24/7 staff", score: 5 },
      { label: "Basic email autoresponder", score: 15 },
      { label: "Voicemail only", score: 25 },
      { label: "Nothing — they wait until morning", score: 30 },
    ],
  },
  {
    id: "tools",
    question: "How many different software tools does your business use?",
    options: [
      { label: "1-2 tools", score: 5 },
      { label: "3-5 tools", score: 15 },
      { label: "6-10 tools", score: 25 },
      { label: "10+ tools", score: 30 },
    ],
  },
  {
    id: "bottleneck",
    question: "What's your biggest operational bottleneck?",
    options: [
      { label: "Lead follow-up & sales", score: 20 },
      { label: "Scheduling & dispatch", score: 20 },
      { label: "Customer support & communication", score: 20 },
      { label: "Invoicing & billing", score: 15 },
    ],
  },
  {
    id: "industry",
    question: "What industry are you in?",
    options: INDUSTRIES.map((ind) => ({
      label: `${ind.icon} ${ind.name}`,
      score: 0, // doesn't affect score, used for personalization
    })),
  },
];

type AIRecommendation = {
  title: string;
  description: string;
  link: string;
  icon: typeof Bot;
};

function getRecommendations(answers: Record<string, number>, industryLabel: string): AIRecommendation[] {
  const recs: AIRecommendation[] = [];
  const bottleneck = answers.bottleneck;
  const industry = INDUSTRIES.find((i) => industryLabel.includes(i.name))?.slug || "restaurants";

  // Always recommend based on after-hours gap
  if (answers.afterhours >= 15) {
    recs.push({
      title: "AI Chatbot for 24/7 Customer Service",
      description: "An AI chatbot handles inquiries, books appointments, and captures leads even at 2am. Most businesses see 40-60% fewer missed inquiries.",
      link: "/demos/ai-chatbot",
      icon: Bot,
    });
  }

  // Based on repetitive work
  if (answers.repetitive >= 25) {
    recs.push({
      title: "Workflow Automation",
      description: "Automate follow-ups, appointment reminders, invoice generation, and status updates. Save 10-20 hours per week on tasks AI can handle.",
      link: "/services/ai-automation",
      icon: Zap,
    });
  }

  // Based on bottleneck
  if (bottleneck === 20) {
    recs.push({
      title: "AI-Powered Lead Management",
      description: "AI responds to leads in under 60 seconds, qualifies them with smart questions, and routes them to the right person. No lead goes cold.",
      link: "/demos/crm",
      icon: Sparkles,
    });
  }

  // Based on tool count
  if (answers.tools >= 15) {
    recs.push({
      title: "Unified Custom Platform",
      description: "Replace your 5+ separate tools with one custom platform. All your data in one place, with AI connecting everything.",
      link: "/tools/saas-calculator",
      icon: Brain,
    });
  }

  // Industry-specific
  recs.push({
    title: `AI Solutions for ${INDUSTRIES.find((i) => i.slug === industry)?.name || "Your Industry"}`,
    description: `See exactly how AI automation can transform your specific industry — from smart scheduling to automated customer communication.`,
    link: `/industries/${industry}`,
    icon: Clock,
  });

  return recs.slice(0, 3);
}

export function AIReadinessQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [industryLabel, setIndustryLabel] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const question = QUESTIONS[currentQ];
  const totalScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const maxPossible = 130;
  const scorePct = Math.min(100, Math.round((totalScore / maxPossible) * 100));

  const tier =
    scorePct <= 30 ? { label: "Beginner", color: "#ef4444", bg: "bg-red-50 border-red-200" } :
    scorePct <= 60 ? { label: "Ready", color: "#f59e0b", bg: "bg-amber-50 border-amber-200" } :
    { label: "Primed for AI", color: "#22c55e", bg: "bg-green-50 border-green-200" };

  function handleAnswer(optionLabel: string, score: number) {
    setSelectedOption(optionLabel);
    if (question.id === "industry") setIndustryLabel(optionLabel);

    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [question.id]: score }));
      setSelectedOption(null);

      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  }

  async function handleEmail() {
    if (!email) return;
    setSending(true);
    try {
      await fetch("/api/demos/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: "ai-readiness-quiz",
          name: name || undefined,
          email,
          demoType: "ai-quiz",
          brandData: {
            businessName: name || "Quiz User",
            primaryColor: "#7B2FF7",
            accentColor: "#FF6B35",
            logoUrl: null,
            fontStyle: "sans-serif",
            industry: INDUSTRIES.find((i) => industryLabel.includes(i.name))?.slug || "business",
          },
        }),
      });
      setSent(true);
    } catch { /* silent */ }
    setSending(false);
  }

  if (showResults) {
    const recs = getRecommendations(answers, industryLabel);

    return (
      <div className="max-w-2xl mx-auto">
        {/* Score */}
        <div className="text-center mb-8">
          <div className={`inline-block rounded-2xl border-2 p-8 ${tier.bg}`}>
            <div className="text-6xl font-bold font-display mb-2" style={{ color: tier.color }}>
              {scorePct}
            </div>
            <div className="text-sm font-semibold" style={{ color: tier.color }}>
              {tier.label}
            </div>
          </div>
          <div className="mt-4 max-w-sm mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-1000"
                style={{
                  width: `${scorePct}%`,
                  background: `linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>Beginner</span>
              <span>Ready</span>
              <span>Primed</span>
            </div>
          </div>
        </div>

        {/* What this means */}
        <div className="rounded-xl bg-white border border-gray-200 p-6 mb-8">
          <h3 className="font-bold text-lg mb-2">What This Means for Your Business</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {scorePct <= 30
              ? "Your business has significant room for AI automation. The good news? That means the ROI potential is massive. Even basic AI (chatbot, automated follow-ups) would save hours per week and capture leads you're currently losing."
              : scorePct <= 60
                ? "Your business is in a great position to adopt AI. You have enough operational complexity that AI would make a real impact, and you're likely already comfortable with technology. Now it's about choosing the right modules."
                : "Your business is primed for AI transformation. You're spending significant time on tasks that AI handles effortlessly, using multiple tools that could be unified, and likely losing leads to after-hours gaps. Custom AI would be a game-changer."}
          </p>
        </div>

        {/* Recommendations */}
        <h3 className="font-bold text-lg mb-4">Recommended AI Features for You</h3>
        <div className="space-y-3 mb-8">
          {recs.map((rec) => (
            <a
              key={rec.title}
              href={rec.link}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <rec.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm group-hover:text-primary transition-colors">
                  {rec.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{rec.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary shrink-0 mt-3" />
            </a>
          ))}
        </div>

        {/* Email capture */}
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
          {!sent ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Get Your Custom AI Roadmap</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                We&apos;ll send a personalized AI implementation plan based on your quiz results.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm" required />
                <button onClick={handleEmail} disabled={!email || sending} className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm shrink-0 disabled:opacity-50 flex items-center gap-2">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                  Send Roadmap
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-bold text-lg">Roadmap Sent!</h3>
              <p className="text-sm text-gray-500">Check your inbox for your personalized AI implementation plan.</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm">
            Book a Free AI Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  // Quiz questions
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-1 mb-8">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${
              i < currentQ ? "bg-primary" : i === currentQ ? "bg-primary/50" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="text-center mb-2">
        <span className="text-xs text-gray-400">
          Question {currentQ + 1} of {QUESTIONS.length}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold font-display text-center mb-8">
        {question.question}
      </h2>

      <div className={`${question.id === "industry" ? "grid grid-cols-2 sm:grid-cols-3" : "flex flex-col"} gap-3 max-w-lg mx-auto`}>
        {question.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => handleAnswer(opt.label, opt.score)}
            className={`rounded-xl border-2 p-4 text-left text-sm font-medium transition-all ${
              selectedOption === opt.label
                ? "border-primary bg-primary/5 text-primary"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary/30"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {currentQ > 0 && (
        <button
          onClick={() => setCurrentQ((q) => q - 1)}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mt-6 mx-auto"
        >
          <ChevronLeft className="h-4 w-4" /> Previous question
        </button>
      )}
    </div>
  );
}
