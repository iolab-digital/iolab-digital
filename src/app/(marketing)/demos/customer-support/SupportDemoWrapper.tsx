"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { SupportDemo } from "@/components/demos/support/SupportDemo";

export function SupportDemoWrapper() {
  return (
    <DemoGate demoType="customer-support" demoLabel="Support System">
      {(brand) => (
        <DemoShell title="Customer Support" brand={brand}>
          <SupportDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
