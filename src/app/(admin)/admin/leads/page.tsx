"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe, Mail, Building2, Tag, Trash2, Archive, Loader2, CheckSquare, Square } from "lucide-react";

type Lead = {
  id: number;
  websiteUrl: string;
  name: string | null;
  email: string | null;
  demoType: string;
  brandData: { businessName: string; primaryColor: string; accentColor: string; industry: string } | null;
  createdAt: string;
  drip: { total: number; sent: number; stopped: boolean };
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [actionLoading, setActionLoading] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      const data = await res.json();
      setLeads(data.leads || []);
    } catch { /* silent */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  function toggleSelect(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === leads.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(leads.map((l) => l.id)));
    }
  }

  async function handleAction(action: "delete") {
    if (selected.size === 0) return;
    if (action === "delete" && !confirm(`Permanently delete ${selected.size} lead(s) and their drip emails?`)) return;
    setActionLoading(true);
    try {
      await fetch("/api/admin/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "demo_leads", ids: Array.from(selected), action }),
      });
      setLeads((prev) => prev.filter((l) => !selected.has(l.id)));
      setSelected(new Set());
    } catch { alert("Failed. Try again."); }
    setActionLoading(false);
  }

  if (loading) {
    return <div className="p-6 flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>;
  }

  return (
    <div className="p-3 md:p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Demo Leads</h1>
        <span className="text-sm text-gray-500">{leads.length} total</span>
      </div>

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="rounded-xl bg-gray-900 text-white p-3 mb-4 flex items-center justify-between">
          <span className="text-sm font-medium">{selected.size} selected</span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleAction("delete")} disabled={actionLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50">
              {actionLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />} Delete
            </button>
            <button onClick={() => setSelected(new Set())} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white">Cancel</button>
          </div>
        </div>
      )}

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {leads.map((lead) => (
          <div key={lead.id} className={`rounded-xl bg-white border p-4 space-y-2 cursor-pointer transition-colors ${selected.has(lead.id) ? "border-primary bg-primary/5" : "border-gray-200"}`} onClick={() => toggleSelect(lead.id)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selected.has(lead.id) ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4 text-gray-300" />}
                {lead.brandData?.primaryColor && <div className="w-3 h-3 rounded-full shrink-0" style={{ background: lead.brandData.primaryColor }} />}
                <span className="font-medium text-sm">{lead.brandData?.businessName || "Unknown"}</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{lead.demoType}</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span className="truncate">{lead.websiteUrl}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div>{lead.email ? <span className="text-gray-600 flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span> : <span className="text-gray-300">No email</span>}</div>
              <div className="text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
        {leads.length === 0 && <div className="rounded-xl bg-white border border-gray-200 p-12 text-center text-gray-400">No demo leads yet.</div>}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 w-10"><button onClick={toggleAll} className="text-gray-400 hover:text-gray-600">{selected.size === leads.length && leads.length > 0 ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4" />}</button></th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Business</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Contact</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Demo</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Industry</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Drip Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className={`border-t border-gray-100 hover:bg-gray-50 cursor-pointer ${selected.has(lead.id) ? "bg-primary/5" : ""}`} onClick={() => toggleSelect(lead.id)}>
                  <td className="p-3">{selected.has(lead.id) ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4 text-gray-300" />}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {lead.brandData?.primaryColor && <div className="w-3 h-3 rounded-full shrink-0" style={{ background: lead.brandData.primaryColor }} />}
                      <div>
                        <div className="font-medium flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-gray-400" />{lead.brandData?.businessName || "Unknown"}</div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-1"><Globe className="h-3 w-3" />{lead.websiteUrl}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {lead.email ? <div><div className="text-xs">{lead.name || "—"}</div><div className="text-[11px] text-gray-400 flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</div></div> : <span className="text-gray-300 text-xs">No email</span>}
                  </td>
                  <td className="p-3"><span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{lead.demoType}</span></td>
                  <td className="p-3"><span className="text-xs text-gray-500 flex items-center gap-1"><Tag className="h-3 w-3" />{lead.brandData?.industry || "—"}</span></td>
                  <td className="p-3">
                    {lead.drip.total > 0 ? (
                      <div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${lead.drip.stopped ? "bg-red-100 text-red-600" : lead.drip.sent >= 7 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                          {lead.drip.stopped ? "Stopped" : lead.drip.sent >= 7 ? "Complete" : "Active"}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-0.5">{lead.drip.sent}/{lead.drip.total} sent</div>
                      </div>
                    ) : <span className="text-[10px] text-gray-300">No drip</span>}
                  </td>
                  <td className="p-3 text-xs text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {leads.length === 0 && <tr><td colSpan={7} className="p-12 text-center text-gray-400">No demo leads yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
