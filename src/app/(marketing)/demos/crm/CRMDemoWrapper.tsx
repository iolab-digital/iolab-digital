"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { CRMDemo } from "@/components/demos/crm/CRMDemo";

export function CRMDemoWrapper() {
  return (
    <DemoGate demoType="crm" demoLabel="CRM">
      {(brand) => (
        <DemoShell title="CRM Dashboard" brand={brand}>
          <CRMDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
