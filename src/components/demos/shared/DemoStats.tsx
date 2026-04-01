"use client";

import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
};

export function DemoStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-4 text-center"
        >
          <div className="text-2xl font-bold font-display text-gray-900">
            {stat.prefix}
            <AnimatedCounter value={stat.value} />
            {stat.suffix}
          </div>
          <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
