"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Phone, Building2, Calendar, MessageSquare, Trash2, Archive, Loader2, CheckSquare, Square } from "lucide-react";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700",
  won: "bg-green-100 text-green-700",
  lost: "bg-gray-100 text-gray-500",
  archived: "bg-gray-100 text-gray-400",
};

export default function AdminContactsPage() {
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [actionLoading, setActionLoading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/contacts${showArchived ? "?archived=true" : ""}`, { cache: "no-store" });
      const data = await res.json();
      setContactList(data.contacts || []);
    } catch { /* silent */ }
    setLoading(false);
  }, [showArchived]);

  useEffect(() => { setLoading(true); fetchContacts(); }, [fetchContacts]);

  function toggleSelect(id: number) {
    setSelected((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }
  function toggleAll() {
    selected.size === contactList.length ? setSelected(new Set()) : setSelected(new Set(contactList.map((c) => c.id)));
  }

  async function handleAction(action: "delete" | "archive") {
    if (selected.size === 0) return;
    if (action === "delete" && !confirm(`Permanently delete ${selected.size} contact(s)?`)) return;
    setActionLoading(true);
    try {
      await fetch("/api/admin/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "contacts", ids: Array.from(selected), action }),
      });
      if (action === "delete") {
        setContactList((prev) => prev.filter((c) => !selected.has(c.id)));
      } else {
        setContactList((prev) => prev.map((c) => selected.has(c.id) ? { ...c, status: "archived" } : c));
      }
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
        <h1 className="text-xl md:text-2xl font-bold">Contact Form Submissions</h1>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
            <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} className="rounded" />
            Show archived
          </label>
          <span className="text-sm text-gray-500">{contactList.length} total</span>
        </div>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="rounded-xl bg-gray-900 text-white p-3 mb-4 flex items-center justify-between">
          <span className="text-sm font-medium">{selected.size} selected</span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleAction("archive")} disabled={actionLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 disabled:opacity-50">
              {actionLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Archive className="h-3 w-3" />} Archive
            </button>
            <button onClick={() => handleAction("delete")} disabled={actionLoading} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50">
              {actionLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />} Delete
            </button>
            <button onClick={() => setSelected(new Set())} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white">Cancel</button>
          </div>
        </div>
      )}

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {contactList.map((contact) => (
          <div key={contact.id} className={`rounded-xl bg-white border p-4 space-y-2 cursor-pointer ${selected.has(contact.id) ? "border-primary bg-primary/5" : "border-gray-200"}`} onClick={() => toggleSelect(contact.id)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selected.has(contact.id) ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4 text-gray-300" />}
                <span className="font-medium text-sm">{contact.name}</span>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[contact.status] || STATUS_STYLES.new}`}>{contact.status}</span>
            </div>
            <div className="text-xs text-gray-500"><Mail className="h-3 w-3 inline mr-1" />{contact.email}</div>
            {contact.message && <div className="text-xs text-gray-400 line-clamp-2"><MessageSquare className="h-3 w-3 inline mr-1" />{contact.message}</div>}
            <div className="text-[10px] text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
        {contactList.length === 0 && <div className="rounded-xl bg-white border border-gray-200 p-12 text-center text-gray-400">No contact submissions yet.</div>}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block rounded-xl bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 w-10"><button onClick={toggleAll}>{selected.size === contactList.length && contactList.length > 0 ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4 text-gray-400" />}</button></th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Name</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Contact</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Company</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Service</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Date</th>
                <th className="text-left p-3 text-xs font-medium text-gray-500">Message</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact) => (
                <tr key={contact.id} className={`border-t border-gray-100 hover:bg-gray-50 cursor-pointer ${selected.has(contact.id) ? "bg-primary/5" : ""}`} onClick={() => toggleSelect(contact.id)}>
                  <td className="p-3">{selected.has(contact.id) ? <CheckSquare className="h-4 w-4 text-primary" /> : <Square className="h-4 w-4 text-gray-300" />}</td>
                  <td className="p-3 font-medium">{contact.name}</td>
                  <td className="p-3">
                    <div className="text-[11px] text-gray-500 flex items-center gap-1"><Mail className="h-3 w-3" />{contact.email}</div>
                    {contact.phone && <div className="text-[11px] text-gray-500 flex items-center gap-1"><Phone className="h-3 w-3" />{contact.phone}</div>}
                  </td>
                  <td className="p-3">{contact.company ? <span className="text-xs text-gray-500 flex items-center gap-1"><Building2 className="h-3 w-3" />{contact.company}</span> : <span className="text-gray-300 text-xs">—</span>}</td>
                  <td className="p-3">{contact.serviceInterest ? <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{contact.serviceInterest}</span> : <span className="text-gray-300 text-xs">—</span>}</td>
                  <td className="p-3"><span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[contact.status] || STATUS_STYLES.new}`}>{contact.status}</span></td>
                  <td className="p-3 text-xs text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td className="p-3"><div className="max-w-xs truncate text-xs text-gray-500">{contact.message}</div></td>
                </tr>
              ))}
              {contactList.length === 0 && <tr><td colSpan={8} className="p-12 text-center text-gray-400">No contact submissions yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
