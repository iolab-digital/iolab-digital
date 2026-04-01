"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";

export function StickyCTA() {
  const [dismissed, setDismissed] = useState(true); // Start hidden
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Don't show on excluded pages
  const excluded =
    pathname.startsWith("/admin") ||
    pathname === "/contact" ||
    pathname.startsWith("/demos/");

  useEffect(() => {
    if (excluded) return;

    // Check if dismissed this session
    if (sessionStorage.getItem("sticky-cta-dismissed")) {
      setDismissed(true);
      return;
    }

    setDismissed(false);

    function handleScroll() {
      setScrolled(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [excluded]);

  if (excluded || dismissed || !scrolled) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark/95 backdrop-blur-md border-t border-gray-800 py-3 px-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <p className="text-white text-sm font-medium hidden sm:block">
          Ready to own your software?{" "}
          <span className="text-gray-400">Stop paying SaaS fees forever.</span>
        </p>
        <p className="text-white text-sm font-medium sm:hidden">
          Own your software.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Book Free Consultation <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => {
              setDismissed(true);
              sessionStorage.setItem("sticky-cta-dismissed", "true");
            }}
            className="text-gray-500 hover:text-gray-300 p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
