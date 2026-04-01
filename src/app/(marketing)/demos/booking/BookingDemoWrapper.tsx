"use client";

import { DemoGate } from "@/components/demos/shared/DemoGate";
import { DemoShell } from "@/components/demos/shared/DemoShell";
import { BookingDemo } from "@/components/demos/booking/BookingDemo";

export function BookingDemoWrapper() {
  return (
    <DemoGate demoType="booking" demoLabel="Booking System">
      {(brand) => (
        <DemoShell title="Booking & Scheduling" brand={brand}>
          <BookingDemo brand={brand} />
        </DemoShell>
      )}
    </DemoGate>
  );
}
