"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { InvoicingDemo } from "@/components/demos/invoicing/InvoicingDemo";

export function InvoicingDemoWrapper() {
  return (
    <DemoGate demoType="invoicing" demoLabel="Invoicing System">
      {(brand) => (
        <DemoShell title="Invoicing & Billing" brand={brand}>
          <InvoicingDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
