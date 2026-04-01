"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Trash2, Loader2 } from "lucide-react";

export function ApproveButton({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handle() {
    setLoading(true);
    await fetch("/api/blog/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action: "publish" }),
    });
    router.refresh();
  }

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-600 text-white hover:bg-green-700 flex items-center gap-1 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
      Approve
    </button>
  );
}

export function RejectButton({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handle() {
    if (!confirm("Delete this draft permanently?")) return;
    setLoading(true);
    await fetch("/api/blog/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action: "reject" }),
    });
    router.refresh();
  }

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-1 disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
      Reject
    </button>
  );
}
