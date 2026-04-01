"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, ArrowRight, Loader2 } from "lucide-react";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const pathname = usePathname();

  // Don't show on contact, admin, or demo pages
  const excluded = pathname.startsWith("/admin") || pathname.startsWith("/contact") || pathname.startsWith("/demos/");

  useEffect(() => {
    if (excluded) return;

    // Check if already shown this session
    if (sessionStorage.getItem("exit-intent-shown")) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 5) {
        setShow(true);
        sessionStorage.setItem("exit-intent-shown", "true");
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    }

    // Delay registering the listener so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [excluded]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      await fetch("/api/demos/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: "exit-intent-popup",
          email,
          demoType: "exit-intent",
          brandData: { businessName: "Exit Intent Lead", primaryColor: "#7B2FF7", accentColor: "#FF6B35", logoUrl: null, fontStyle: "sans-serif", industry: "business" },
        }),
      });
      setSent(true);
    } catch { /* silent */ }
    setSending(false);
  }

  if (excluded) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            {!sent ? (
              <>
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <Calculator className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display mb-2">
                  Before you go...
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Get a free SaaS cost audit. We&apos;ll analyze what you&apos;re
                  spending and show you how much a custom solution could save.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm shrink-0 flex items-center gap-1"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
                <p className="text-[10px] text-gray-400 mt-3 text-center">
                  No spam. Just a personalized cost analysis.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="h-7 w-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold mb-1">You&apos;re in!</h3>
                <p className="text-sm text-gray-500">
                  Check your inbox for your personalized cost analysis.
                </p>
                <button
                  onClick={() => setShow(false)}
                  className="mt-4 text-sm text-primary font-medium"
                >
                  Continue browsing
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
