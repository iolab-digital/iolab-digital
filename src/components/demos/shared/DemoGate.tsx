"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Globe, User, Mail } from "lucide-react";

export type BrandTheme = {
  businessName: string;
  primaryColor: string;
  accentColor: string;
  logoUrl: string | null;
  fontStyle: string;
  industry: string;
};

type DemoGateProps = {
  demoType: string;
  demoLabel: string;
  children: (brand: BrandTheme | null) => React.ReactNode;
};

export function DemoGate({ demoType, demoLabel, children }: DemoGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [brand, setBrand] = useState<BrandTheme | null>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter your website URL");
      return;
    }

    setLoading(true);
    setError("");
    setProgress(0);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 90));
    }, 400);

    try {
      // Extract brand
      const brandRes = await fetch("/api/demos/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const brandData: BrandTheme = await brandRes.json();
      setBrand(brandData);
      setProgress(95);

      // Capture lead (fire and forget)
      fetch("/api/demos/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          demoType,
          brandData,
        }),
      }).catch(() => {});

      setProgress(100);

      // Brief pause to show 100%, then unlock
      setTimeout(() => {
        clearInterval(progressInterval);
        setUnlocked(true);
      }, 500);
    } catch {
      clearInterval(progressInterval);
      setError("Something went wrong. Please try again.");
      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <div className="relative">
      {/* Brand theme CSS variables */}
      {brand && (
        <style>{`
          .demo-branded {
            --demo-primary: ${brand.primaryColor};
            --demo-accent: ${brand.accentColor};
          }
        `}</style>
      )}

      {/* Demo content (blurred when locked) */}
      <div className={unlocked ? "demo-branded" : "select-none pointer-events-none"}>
        <div className={unlocked ? "" : "blur-[6px] opacity-60"}>
          {children(brand)}
        </div>
      </div>

      {/* Gate overlay */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-white/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md mx-4 rounded-2xl bg-white border border-gray-200 shadow-2xl shadow-black/10 p-8"
            >
              {!loading ? (
                <form onSubmit={handleSubmit}>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                      <Sparkles className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold font-display">
                      See This {demoLabel} Branded for{" "}
                      <span className="text-primary">YOUR Business</span>
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      Enter your website and we&apos;ll customize this demo with
                      your logo, colors, and branding. Takes 5 seconds.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="yourbusiness.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Your email (optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3 px-6 hover:bg-primary/90 transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate My Branded Demo
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-3">
                    No signup required. No credit card.
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
                  <p className="font-semibold text-lg">Analyzing your brand...</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Extracting logo, colors, and style from {url}
                  </p>
                  <div className="mt-6 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{Math.round(progress)}%</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
