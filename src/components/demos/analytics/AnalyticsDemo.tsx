"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  BarChart3,
} from "lucide-react";
import {
  MONTHLY_REVENUE,
  TEAM_PERFORMANCE,
  REVENUE_BY_SOURCE,
  TOP_CLIENTS,
  KPI,
} from "@/data/demos/analytics-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

export function AnalyticsDemo({ brand }: { brand?: BrandTheme | null }) {
  const [range, setRange] = useState<"6mo" | "12mo">("12mo");
  const primary = brand?.primaryColor || "#7B2FF7";
  const bizName = brand?.businessName || "Your Business";

  const revenueData = range === "6mo" ? MONTHLY_REVENUE.slice(-6) : MONTHLY_REVENUE;
  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  const kpiIcons = [DollarSign, Users, Target, BarChart3];

  return (
    <div className="h-[600px] overflow-y-auto bg-gray-50 p-4 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{bizName} Analytics</h2>
        <div className="flex gap-1 rounded-lg bg-white border border-gray-200 p-0.5">
          <button
            onClick={() => setRange("6mo")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${range === "6mo" ? "text-white" : "text-gray-500"}`}
            style={range === "6mo" ? { background: primary } : undefined}
          >
            6 Months
          </button>
          <button
            onClick={() => setRange("12mo")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${range === "12mo" ? "text-white" : "text-gray-500"}`}
            style={range === "12mo" ? { background: primary } : undefined}
          >
            12 Months
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {Object.values(KPI).map((kpi, i) => {
          const Icon = kpiIcons[i];
          const isPositive = kpi.change >= 0;
          return (
            <div key={kpi.label} className="rounded-xl bg-white border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <Icon className="h-5 w-5 text-gray-400" />
                <div className={`flex items-center gap-0.5 text-[10px] font-medium ${isPositive ? "text-green-600" : "text-red-500"}`}>
                  {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(kpi.change)}%
                </div>
              </div>
              <div className="text-xl font-bold" style={{ color: primary }}>
                {kpi.label.includes("Revenue") || kpi.label.includes("Deal")
                  ? `$${(kpi.value / 1000).toFixed(1)}K`
                  : kpi.label.includes("%")
                    ? `${kpi.value}%`
                    : kpi.value}
              </div>
              <div className="text-[10px] text-gray-400">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Revenue Chart */}
        <div className="col-span-2 rounded-xl bg-white border border-gray-200 p-4">
          <h3 className="font-bold text-xs mb-4">Monthly Revenue</h3>
          <div className="flex items-end gap-1 h-32">
            {revenueData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${(d.value / maxRevenue) * 100}%`,
                    background: primary,
                    opacity: 0.7 + (d.value / maxRevenue) * 0.3,
                  }}
                />
                <span className="text-[9px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Source */}
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <h3 className="font-bold text-xs mb-4">Revenue by Source</h3>
          <div className="space-y-2.5">
            {REVENUE_BY_SOURCE.map((s) => (
              <div key={s.source}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-gray-600">{s.source}</span>
                  <span className="font-medium">{s.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${s.value}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Team Performance */}
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <h3 className="font-bold text-xs mb-3">Team Performance</h3>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left pb-2 font-medium">Name</th>
                <th className="text-center pb-2 font-medium">Deals</th>
                <th className="text-right pb-2 font-medium">Revenue</th>
                <th className="text-right pb-2 font-medium">Conv %</th>
              </tr>
            </thead>
            <tbody>
              {TEAM_PERFORMANCE.map((t) => (
                <tr key={t.name} className="border-t border-gray-100">
                  <td className="py-2 font-medium">{t.name}</td>
                  <td className="py-2 text-center text-gray-500">{t.deals}</td>
                  <td className="py-2 text-right">${(t.revenue / 1000).toFixed(0)}K</td>
                  <td className="py-2 text-right" style={{ color: primary }}>{t.conversion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Clients */}
        <div className="rounded-xl bg-white border border-gray-200 p-4">
          <h3 className="font-bold text-xs mb-3">Top Clients by LTV</h3>
          <div className="space-y-2">
            {TOP_CLIENTS.slice(0, 6).map((c, i) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 w-4">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{c.name}</div>
                  <div className="text-[10px] text-gray-400">{c.deals} deals · {c.lastActive}</div>
                </div>
                <span className="text-xs font-bold" style={{ color: primary }}>
                  ${(c.lifetime / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
