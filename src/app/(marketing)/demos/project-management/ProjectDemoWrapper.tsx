"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { ProjectDemo } from "@/components/demos/projects/ProjectDemo";

export function ProjectDemoWrapper() {
  return (
    <DemoGate demoType="project-management" demoLabel="Project Manager">
      {(brand) => (
        <DemoShell title="Project Management" brand={brand}>
          <div className="relative">
            <ProjectDemo brand={brand} />
          </div>
        </DemoShell>
      )}
    </DemoGate>
  );
}
