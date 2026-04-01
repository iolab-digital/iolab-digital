import type { Metadata } from "next";
import { Calendar, Clock, Users, Bell, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { DemoFeatureGrid } from "@/components/demos/shared/DemoFeatureGrid";
import { BookingDemoWrapper } from "./BookingDemoWrapper";

export const metadata: Metadata = pageMetadata(
  "Booking & Scheduling Demo",
  "Interactive booking and scheduling demo with calendar view, staff management, appointment booking, and automated confirmations. Branded for your business.",
  "/demos/booking",
  ["booking demo", "scheduling demo", "appointment booking system", "calendar management", "Calendly alternative"]
);

const FEATURES = [
  { icon: Calendar, title: "Visual Calendar", description: "Weekly view with staff columns. Click any open slot to book. Color-coded by appointment type." },
  { icon: Users, title: "Staff Management", description: "See each provider's schedule side by side. Assign appointments based on availability and specialty." },
  { icon: Clock, title: "Click to Book", description: "Select a time slot, enter client details, and book instantly. Auto-confirmation preview shows what the client receives." },
  { icon: Bell, title: "Waitlist & Reminders", description: "Manage a waitlist for popular slots. Automated SMS/email confirmations and reminders." },
];

export default function BookingDemoPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Demos", url: "/demos" }, { name: "Booking Demo", url: "/demos/booking" }])} />
      <section className="bg-dark text-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="dark" className="mb-4">Interactive Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">Booking & <span className="text-primary">Scheduling</span> Demo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">A full appointment calendar with staff columns, click-to-book, and auto-confirmations. Click any empty slot to try it.</p>
        </div>
      </section>
      <Section><div className="max-w-6xl mx-auto"><BookingDemoWrapper /></div></Section>
      <Section className="bg-gray-50">
        <div className="text-center mb-10"><h2 className="text-2xl font-bold font-display mb-3">What This Demo Shows</h2></div>
        <DemoFeatureGrid features={FEATURES} />
      </Section>
      <Section dark>
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display mb-4">Ditch Calendly. Own Your Booking System.</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Custom booking with your branding, your service types, your staff, and your workflow. No per-booking fees.</p>
          <Button href="/contact" size="lg">Build My Booking System <ArrowRight className="h-5 w-5" /></Button>
        </div>
      </Section>
    </>
  );
}
