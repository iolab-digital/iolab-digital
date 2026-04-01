"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { AnalyticsDemo } from "@/components/demos/analytics/AnalyticsDemo";

export function AnalyticsDemoWrapper() {
  return (
    <DemoGate demoType="analytics" demoLabel="Analytics Dashboard">
      {(brand) => (
        <DemoShell title="Analytics Dashboard" brand={brand}>
          <AnalyticsDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
