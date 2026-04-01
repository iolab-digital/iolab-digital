"use client";

import { useState } from "react";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  TrendingDown,
  Mail,
  Calculator,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  SAAS_TOOLS,
  ANNUAL_PRICE_INCREASE,
  CUSTOM_MONTHLY_HOSTING,
  CUSTOM_DISCOUNT_MULTIPLE_TOOLS,
  type SaaSTool,
} from "@/data/saas-tools";

type SelectedTool = SaaSTool & { monthlyCost: number; seats: number };

export function SaaSCalculator() {
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [toolOverrides, setToolOverrides] = useState<
    Record<string, { cost: number; seats: number }>
  >({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function toggleTool(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function getSelectedTools(): SelectedTool[] {
    return SAAS_TOOLS.filter((t) => selectedIds.has(t.id)).map((t) => {
      const overrides = toolOverrides[t.id];
      return {
        ...t,
        monthlyCost: overrides?.cost ?? (t.perSeat ? t.defaultMonthlyCost * t.defaultSeats : t.defaultMonthlyCost),
        seats: overrides?.seats ?? t.defaultSeats,
      };
    });
  }

  function calcSaaS5Year(): number {
    const tools = getSelectedTools();
    let total = 0;
    for (const tool of tools) {
      let annual = tool.monthlyCost * 12;
      for (let y = 0; y < 5; y++) {
        total += annual;
        annual *= 1 + ANNUAL_PRICE_INCREASE;
      }
    }
    return Math.round(total);
  }

  function calcCustom5Year(): number {
    const tools = getSelectedTools();
    const buildCosts = tools.map((t) => t.customBuildCost);
    let totalBuild = buildCosts.reduce((s, c) => s + c, 0);
    // Discount for multiple tools (bundling)
    if (tools.length >= 3) totalBuild *= 1 - CUSTOM_DISCOUNT_MULTIPLE_TOOLS;
    const hosting5yr = CUSTOM_MONTHLY_HOSTING * 60;
    return Math.round(totalBuild + hosting5yr);
  }

  function getMonthlyTotal(): number {
    return getSelectedTools().reduce((s, t) => s + t.monthlyCost, 0);
  }

  // Categories
  const categories = [...new Set(SAAS_TOOLS.map((t) => t.category))];

  // Year-by-year data for chart
  function getYearlyData() {
    const tools = getSelectedTools();
    const saasYears: number[] = [];
    const customYears: number[] = [];

    let saasAnnual = tools.reduce((s, t) => s + t.monthlyCost * 12, 0);
    let saasCumulative = 0;

    const totalBuild = tools.reduce((s, t) => s + t.customBuildCost, 0) * (tools.length >= 3 ? 1 - CUSTOM_DISCOUNT_MULTIPLE_TOOLS : 1);
    const hostingAnnual = CUSTOM_MONTHLY_HOSTING * 12;
    let customCumulative = 0;

    for (let y = 0; y < 5; y++) {
      saasCumulative += saasAnnual;
      saasYears.push(saasCumulative);
      saasAnnual *= 1 + ANNUAL_PRICE_INCREASE;

      if (y === 0) customCumulative += totalBuild + hostingAnnual;
      else customCumulative += hostingAnnual;
      customYears.push(customCumulative);
    }

    return { saasYears, customYears };
  }

  async function handleSendReport() {
    if (!email) return;
    setSending(true);
    try {
      await fetch("/api/demos/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: business || "saas-calculator",
          name: name || undefined,
          email,
          demoType: "saas-calculator",
          brandData: {
            businessName: business || name || "Calculator User",
            primaryColor: "#7B2FF7",
            accentColor: "#FF6B35",
            logoUrl: null,
            fontStyle: "sans-serif",
            industry: "business",
          },
        }),
      });
      setSent(true);
    } catch {
      // Silent fail
    }
    setSending(false);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                step >= s ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${step >= s ? "text-gray-900" : "text-gray-400"}`}>
              {s === 1 ? "Select Tools" : s === 2 ? "Your Costs" : "Results"}
            </span>
            {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? "bg-primary" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select tools */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold font-display mb-2">
            Which SaaS tools are you paying for?
          </h2>
          <p className="text-gray-500 mb-6">
            Select all that apply. We&apos;ll calculate what you&apos;re really spending.
          </p>

          {categories.map((cat) => (
            <div key={cat} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {cat}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {SAAS_TOOLS.filter((t) => t.category === cat).map((tool) => {
                  const isSelected = selectedIds.has(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? "border-primary bg-primary" : "border-gray-300"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <span className="font-medium">{tool.name}</span>
                        <span className="block text-[10px] text-gray-400">
                          ~${tool.perSeat ? `${tool.defaultMonthlyCost}/seat` : `${tool.defaultMonthlyCost}`}/mo
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8">
            <span className="text-sm text-gray-500">
              {selectedIds.size} tool{selectedIds.size !== 1 ? "s" : ""} selected
            </span>
            <button
              onClick={() => setStep(2)}
              disabled={selectedIds.size === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm disabled:opacity-50"
            >
              Next: Adjust Costs <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Adjust costs */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold font-display mb-2">
            Confirm your monthly costs
          </h2>
          <p className="text-gray-500 mb-6">
            We&apos;ve pre-filled typical pricing. Adjust to match what you actually pay.
          </p>

          <div className="space-y-3">
            {getSelectedTools().map((tool) => (
              <div
                key={tool.id}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm">{tool.name}</span>
                  <span className="text-[10px] text-gray-400 block">{tool.category}</span>
                </div>
                {tool.perSeat && (
                  <div className="flex items-center gap-1">
                    <label className="text-[10px] text-gray-400">Seats:</label>
                    <input
                      type="number"
                      min={1}
                      value={toolOverrides[tool.id]?.seats ?? tool.defaultSeats}
                      onChange={(e) => {
                        const seats = parseInt(e.target.value) || 1;
                        const cost = (toolOverrides[tool.id]?.cost ?? tool.defaultMonthlyCost * tool.defaultSeats);
                        setToolOverrides((p) => ({
                          ...p,
                          [tool.id]: { seats, cost: tool.defaultMonthlyCost * seats },
                        }));
                      }}
                      className="w-14 px-2 py-1 rounded-lg border border-gray-200 text-sm text-center"
                    />
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="number"
                    min={0}
                    value={tool.monthlyCost}
                    onChange={(e) => {
                      const cost = parseInt(e.target.value) || 0;
                      setToolOverrides((p) => ({
                        ...p,
                        [tool.id]: { ...p[tool.id], cost, seats: p[tool.id]?.seats ?? tool.defaultSeats },
                      }));
                    }}
                    className="w-20 px-2 py-1 rounded-lg border border-gray-200 text-sm text-right"
                  />
                  <span className="text-xs text-gray-400">/mo</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mt-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Monthly SaaS Spend</span>
              <span className="text-xl font-bold text-red-600">
                ${getMonthlyTotal().toLocaleString()}/mo
              </span>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm"
            >
              <Calculator className="h-4 w-4" /> Calculate My Savings
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Results */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold font-display mb-6">
            Your 5-Year Cost Comparison
          </h2>

          {/* Big numbers */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5 text-center">
              <div className="text-xs font-medium text-red-500 uppercase tracking-wider mb-1">
                SaaS (5 Years)
              </div>
              <div className="text-3xl font-bold text-red-600">
                ${(calcSaaS5Year() / 1000).toFixed(0)}K
              </div>
              <div className="text-[10px] text-red-400 mt-1">
                ${getMonthlyTotal().toLocaleString()}/mo rising 10%/yr
              </div>
            </div>
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5 text-center">
              <div className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">
                Custom Build (5 Years)
              </div>
              <div className="text-3xl font-bold text-green-600">
                ${(calcCustom5Year() / 1000).toFixed(0)}K
              </div>
              <div className="text-[10px] text-green-500 mt-1">
                One-time build + ${CUSTOM_MONTHLY_HOSTING}/mo hosting
              </div>
            </div>
            <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5 text-center">
              <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                <TrendingDown className="h-3.5 w-3.5" /> You Save
              </div>
              <div className="text-3xl font-bold text-primary">
                ${((calcSaaS5Year() - calcCustom5Year()) / 1000).toFixed(0)}K
              </div>
              <div className="text-[10px] text-primary/70 mt-1">
                And you own everything forever
              </div>
            </div>
          </div>

          {/* Chart */}
          {(() => {
            const { saasYears, customYears } = getYearlyData();
            const maxVal = Math.max(...saasYears);
            return (
              <div className="rounded-xl bg-white border border-gray-200 p-6 mb-8">
                <h3 className="font-bold text-sm mb-4">Cumulative Cost Over 5 Years</h3>
                <div className="flex items-end gap-6 h-48">
                  {[0, 1, 2, 3, 4].map((y) => (
                    <div key={y} className="flex-1 flex flex-col items-center gap-1">
                      <div className="flex gap-1 w-full items-end justify-center h-40">
                        <div
                          className="w-5 bg-red-400 rounded-t-sm transition-all"
                          style={{ height: `${(saasYears[y] / maxVal) * 100}%` }}
                          title={`SaaS: $${(saasYears[y] / 1000).toFixed(0)}K`}
                        />
                        <div
                          className="w-5 bg-green-400 rounded-t-sm transition-all"
                          style={{ height: `${(customYears[y] / maxVal) * 100}%` }}
                          title={`Custom: $${(customYears[y] / 1000).toFixed(0)}K`}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400">Year {y + 1}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 justify-center mt-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400" /> SaaS</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-400" /> Custom</span>
                </div>
              </div>
            );
          })()}

          {/* What we'd build */}
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 mb-8">
            <h3 className="font-bold text-sm mb-3">What We&apos;d Build to Replace Your Stack</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {getSelectedTools().map((tool) => (
                <div key={tool.id} className="flex items-center gap-2 text-xs">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-gray-600">
                    <strong>{tool.name}</strong> → {tool.customReplacement}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Email capture */}
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            {!sent ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <h3 className="font-bold">Email Me This Report</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Get a detailed breakdown sent to your inbox — plus a custom quote for your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Business name"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                  <button
                    onClick={handleSendReport}
                    disabled={!email || sending}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm shrink-0 disabled:opacity-50 flex items-center gap-2"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                    Send Report
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-bold text-lg">Report Sent!</h3>
                <p className="text-sm text-gray-500">
                  Check your inbox for the detailed breakdown. We&apos;ll follow up with a custom quote.
                </p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              onClick={() => { setStep(1); setSelectedIds(new Set()); setToolOverrides({}); setSent(false); }}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-500"
            >
              Start Over
            </button>
            <a
              href="/contact"
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
