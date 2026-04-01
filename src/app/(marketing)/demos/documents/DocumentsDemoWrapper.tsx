"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { DocumentDemo } from "@/components/demos/documents/DocumentDemo";

export function DocumentsDemoWrapper() {
  return (
    <DemoGate demoType="documents" demoLabel="Document Automation">
      {(brand) => (
        <DemoShell title="Document Automation" brand={brand}>
          <DocumentDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
