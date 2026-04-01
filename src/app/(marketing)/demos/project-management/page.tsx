import type { Metadata } from "next";
import { FolderKanban, Users, BarChart3, Calendar, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { ProjectDemoWrapper } from "./ProjectDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "Project Management Demo — Kanban Board",
  "Interactive project management demo with drag-and-drop Kanban boards, task details, team workload, and progress tracking. Branded for your business.",
  "/demos/project-management",
  ["project management demo", "Kanban board demo", "task management", "Monday.com alternative", "project tracking demo"]
);

const FEATURES = [
  { icon: FolderKanban, title: "Drag-and-Drop Kanban", description: "Move tasks between stages with drag-and-drop. Visual pipeline from To Do through Done." },
  { icon: Users, title: "Team Workload", description: "See who's assigned to what, track task counts per team member, and balance workload." },
  { icon: BarChart3, title: "Progress Tracking", description: "Real-time progress bar showing project completion percentage across all tasks." },
  { icon: Calendar, title: "Due Dates & Priority", description: "Every task has a due date and priority level. Click any task for full details." },
];

export default function ProjectManagementDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "Project Management Demo", url: "/demos/project-management" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Project <span className="text-primary">Management</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Drag-and-drop Kanban boards with team workload tracking. Click any task for details, drag between columns.</p>
        </div>
      </section>
      <Section><div className="max-w-6xl mx-auto"><ProjectDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Ditch Monday.com. Own Your Project Tracker.</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Custom project management built around your team&apos;s actual workflow — not a generic template.</p>
          <Button href="/contact" size="lg">Build My Project Manager <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
