"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

export default function DemoEntryPage() {
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const token = params.token as string;

  useEffect(() => {
    async function validate() {
      try {
        const res = await fetch("/api/admin/demo/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (data.valid) {
          // Set demo cookie with industry + expiry info
          document.cookie = `iolab-demo-token=${encodeURIComponent(
            JSON.stringify({
              token,
              industry: data.industry,
              prospectName: data.prospectName,
              expiresAt: data.expiresAt,
            })
          )}; path=/; max-age=${24 * 60 * 60}; samesite=lax`;

          // Redirect to admin dashboard
          router.push("/admin");
        } else {
          router.push("/admin/demo/expired");
        }
      } catch {
        setError("Something went wrong. Please try again or contact us.");
      }
    }

    if (token) validate();
  }, [token, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center max-w-sm mx-4">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Link Error</h1>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <a href="https://iolab.co/contact" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium">
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
        <p className="text-white font-medium">Setting up your demo...</p>
        <p className="text-gray-500 text-sm mt-1">One moment please</p>
      </div>
    </div>
  );
}
