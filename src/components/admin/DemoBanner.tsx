"use client";

import { useState, useEffect } from "react";
import { Clock, ArrowRight, X } from "lucide-react";

export function DemoBanner() {
  const [demoData, setDemoData] = useState<{
    token: string;
    industry: string;
    expiresAt: string;
  } | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const cookie = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith("iolab-demo-token="));
      if (!cookie) return;

      const value = decodeURIComponent(cookie.split("=").slice(1).join("="));
      const data = JSON.parse(value);
      if (data.industry) {
        setDemoData(data);
      }
    } catch {
      // Not in demo mode
    }
  }, []);

  // Engagement heartbeat — ping every 30 seconds
  useEffect(() => {
    if (!demoData?.token) return;

    const heartbeat = setInterval(() => {
      fetch("/api/admin/demo/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: demoData.token,
          page: window.location.pathname,
        }),
      }).catch(() => {});
    }, 30000);

    // Send initial heartbeat
    fetch("/api/admin/demo/heartbeat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: demoData.token,
        page: window.location.pathname,
      }),
    }).catch(() => {});

    return () => clearInterval(heartbeat);
  }, [demoData]);

  // Countdown timer
  useEffect(() => {
    if (!demoData?.expiresAt) return;

    function updateTimer() {
      const diff = new Date(demoData!.expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${hours}h ${mins}m`);
    }

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [demoData]);

  if (!demoData || dismissed) return null;

  const industryName = demoData.industry
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5">
      <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-xs font-medium min-w-0">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
            Demo Mode
          </span>
          <span className="truncate hidden sm:inline">
            Viewing a sample {industryName} dashboard — everything is interactive but nothing affects real data
          </span>
          <span className="truncate sm:hidden">
            Sample {industryName} dashboard
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-1 text-[10px] text-white/80">
            <Clock className="h-3 w-3" /> {timeLeft}
          </span>
          <a
            href="https://iolab.co/contact"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/20 hover:bg-white/30 text-[10px] font-bold"
          >
            Book a Call <ArrowRight className="h-3 w-3" />
          </a>
          <button onClick={() => setDismissed(true)} className="p-0.5 hover:bg-white/20 rounded">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
