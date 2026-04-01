"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { LoyaltyDemo } from "@/components/demos/loyalty/LoyaltyDemo";

export function LoyaltyDemoWrapper() {
  return (
    <DemoGate demoType="loyalty" demoLabel="Loyalty Program">
      {(brand) => (
        <DemoShell title="Loyalty & Rewards" brand={brand}>
          <LoyaltyDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
