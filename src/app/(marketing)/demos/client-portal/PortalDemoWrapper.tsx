"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { ClientPortalDemo } from "@/components/demos/portal/ClientPortalDemo";

export function PortalDemoWrapper() {
  return (
    <DemoGate demoType="client-portal" demoLabel="Client Portal">
      {(brand) => (
        <DemoShell title="Client Portal" brand={brand}>
          <ClientPortalDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
