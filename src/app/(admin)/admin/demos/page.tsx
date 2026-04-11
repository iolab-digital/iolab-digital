"use client";

import { useState, useEffect } from "react";
import {
  Link2,
  Plus,
  Copy,
  Check,
  Trash2,
  Loader2,
  Clock,
  Eye,
  Activity,
  CheckSquare,
  Square,
} from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";

type DemoToken = {
  id: number;
  token: string;
  industry: string;
  prospectName: string | null;
  prospectEmail: string | null;
  totalDurationSeconds: number;
  pagesViewed: number;
  createdAt: string;
  expiresAt: string;
  lastAccessedAt: string | null;
  accessCount: number;
};

export default function AdminDemosPage() {
  const [tokens, setTokens] = useState<DemoToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [industry, setIndustry] = useState("restaurants");
  const [prospectName, setProspectName] = useState("");
  const [prospectEmail, setProspectEmail] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  function toggleSelect(id: number) {
    setSelected((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }
  function toggleAll() {
    selected.size === tokens.length ? setSelected(new Set()) : setSelected(new Set(tokens.map((t) => t.id)));
  }
  async function handleBulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Permanently delete ${selected.size} demo link(s)?`)) return;
    setBulkLoading(true);
    try {
      await fetch("/api/admin/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "demo_tokens", ids: Array.from(selected), action: "delete" }),
      });
      setTokens((prev) => prev.filter((t) => !selected.has(t.id)));
      setSelected(new Set());
    } catch { alert("Failed. Try again."); }
    setBulkLoading(false);
  }

  useEffect(() => {
    fetchTokens();
  }, []);

  async function fetchTokens() {
    try {
      const res = await fetch("/api/admin/demo", { cache: "no-store" });
      const data = await res.json();
      setTokens(data.tokens || []);
    } catch { /* silent */ }
    setLoading(false);
  }

  async function handleCreate() {
    setCreating(true);
    setGeneratedUrl("");
    try {
      const res = await fetch("/api/admin/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, prospectName: prospectName || undefined, prospectEmail: prospectEmail || undefined }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedUrl(data.demoUrl);
        await fetchTokens();
      }
    } catch { /* silent */ }
    setCreating(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Revoke this demo link?")) return;
    // Optimistic update: remove token from local state immediately
    setTokens((prev) => prev.filter((t) => t.id !== id));
    await fetch("/api/admin/demo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchTokens();
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const now = new Date();

  if (loading) {
    return (
      <div className="p-3 md:p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 max-w-5xl">
      <h1 className="text-xl md:text-2xl font-bold font-display mb-6">Client Demo Links</h1>

      {/* Create Demo */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="h-5 w-5 text-primary" />
          <h2 className="font-bold">Generate New Demo Link</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Industry *</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind.slug} value={ind.slug}>
                  {ind.icon} {ind.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Prospect Name</label>
            <input
              type="text"
              value={prospectName}
              onChange={(e) => setProspectName(e.target.value)}
              placeholder="John Smith"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1 block">Prospect Email</label>
            <input
              type="email"
              value={prospectEmail}
              onChange={(e) => setProspectEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
          Generate 24-Hour Demo Link
        </button>

        {/* Generated URL */}
        {generatedUrl && (
          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 flex items-center gap-3">
            <Check className="h-5 w-5 text-green-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-green-700 font-medium mb-1">Demo link created! Expires in 24 hours.</p>
              <code className="text-xs text-green-800 break-all">{generatedUrl}</code>
            </div>
            <button
              onClick={() => copyToClipboard(generatedUrl, "new")}
              className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium shrink-0 flex items-center gap-1"
            >
              {copied === "new" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied === "new" ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="rounded-xl bg-gray-900 text-white p-3 mb-4 flex items-center justify-between">
          <span className="text-sm font-medium">{selected.size} selected</span>
          <div className="flex items-center gap-2">
            <button onClick={handleBulkDelete} disabled={bulkLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50">
              {bulkLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />} Delete
            </button>
            <button onClick={() => setSelected(new Set())} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white">Cancel</button>
          </div>
        </div>
      )}

      {/* Active Demos */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold">Active & Recent Demo Links</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 w-10"><button onClick={toggleAll}>{selected.size === tokens.length && tokens.length > 0 ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4 text-gray-400" />}</button></th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Prospect</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Industry</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Engagement</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Created</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t) => {
                const expired = new Date(t.expiresAt) < now;
                const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
                const url = `${baseUrl}/admin/demo/${t.token}`;

                return (
                  <tr key={t.id} className={`border-t border-gray-100 hover:bg-gray-50 ${selected.has(t.id) ? "bg-primary/5" : ""}`}>
                    <td className="p-3"><button onClick={() => toggleSelect(t.id)}>{selected.has(t.id) ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4 text-gray-300" />}</button></td>
                    <td className="p-3">
                      <div className="font-medium text-xs">{t.prospectName || "—"}</div>
                      <div className="text-[10px] text-gray-400">{t.prospectEmail || "No email"}</div>
                    </td>
                    <td className="p-3">
                      <span className="text-xs">
                        {INDUSTRIES.find((i) => i.slug === t.industry)?.icon}{" "}
                        {INDUSTRIES.find((i) => i.slug === t.industry)?.name || t.industry}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${expired ? "bg-gray-100 text-gray-500" : "bg-green-100 text-green-700"}`}>
                        {expired ? "Expired" : "Active"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="space-y-0.5">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="h-3 w-3" /> {t.accessCount} views
                        </span>
                        {t.totalDurationSeconds > 0 && (
                          <span className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Clock className="h-2.5 w-2.5" />
                            {t.totalDurationSeconds >= 3600
                              ? `${Math.floor(t.totalDurationSeconds / 3600)}h ${Math.floor((t.totalDurationSeconds % 3600) / 60)}m`
                              : t.totalDurationSeconds >= 60
                                ? `${Math.floor(t.totalDurationSeconds / 60)}m ${t.totalDurationSeconds % 60}s`
                                : `${t.totalDurationSeconds}s`
                            } active
                          </span>
                        )}
                        {t.pagesViewed > 0 && (
                          <span className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Activity className="h-2.5 w-2.5" /> {t.pagesViewed} page views
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-xs text-gray-400">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        {!expired && (
                          <button
                            onClick={() => copyToClipboard(url, t.token)}
                            className="px-2 py-1 rounded-md text-[10px] font-medium bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1"
                          >
                            {copied === t.token ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied === t.token ? "Copied" : "Copy Link"}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {tokens.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-400 text-sm">
                    No demo links created yet. Generate one above to share with a prospect.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
