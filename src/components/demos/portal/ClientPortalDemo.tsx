"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  Clock,
  Circle,
  Upload,
  Send,
  LogIn,
} from "lucide-react";
import {
  PROJECT,
  MILESTONES,
  DOCUMENTS,
  MESSAGES,
  INVOICES,
} from "@/data/demos/portal-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

type Tab = "overview" | "documents" | "messages" | "billing";

export function ClientPortalDemo({ brand }: { brand?: BrandTheme | null }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [newMessage, setNewMessage] = useState("");

  const primary = brand?.primaryColor || "#7B2FF7";
  const bizName = brand?.businessName || "Your Business";

  if (!loggedIn) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
            style={{ background: primary }}
          >
            {bizName.charAt(0)}
          </div>
          <h3 className="text-lg font-bold mb-2">{bizName} Client Portal</h3>
          <p className="text-gray-500 text-sm mb-6">
            Your clients log in to check project status, view documents, and communicate with your team.
          </p>
          <button
            onClick={() => setLoggedIn(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium"
            style={{ background: primary }}
          >
            <LogIn className="h-4 w-4" /> Click to Enter Portal Demo
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const totalInvoiced = INVOICES.reduce((s, i) => s + i.amount, 0);
  const totalPaid = INVOICES.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="flex h-[600px] text-sm">
      {/* Sidebar */}
      <div className="w-48 bg-gray-900 text-white p-4 flex flex-col shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: primary }}
          >
            {bizName.charAt(0)}
          </div>
          <div>
            <div className="text-xs font-semibold truncate">{bizName}</div>
            <div className="text-[10px] text-gray-500">Client Portal</div>
          </div>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === tab.id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto text-[10px] text-gray-600">
          Logged in as Client
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-lg font-bold mb-4">{PROJECT.name}</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                <div className="text-2xl font-bold" style={{ color: primary }}>{PROJECT.progress}%</div>
                <div className="text-[10px] text-gray-500">Complete</div>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                <div className="text-xs font-bold">{PROJECT.startDate}</div>
                <div className="text-[10px] text-gray-500">Started</div>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                <div className="text-xs font-bold">{PROJECT.estimatedCompletion}</div>
                <div className="text-[10px] text-gray-500">Est. Completion</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${PROJECT.progress}%`, background: primary }} />
              </div>
            </div>

            {/* Milestones */}
            <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-3">Project Timeline</h3>
            <div className="space-y-3">
              {MILESTONES.map((m) => (
                <div key={m.id} className={`flex gap-3 rounded-xl p-3 ${m.status === "current" ? "bg-white border-2" : "bg-white border border-gray-200"}`} style={m.status === "current" ? { borderColor: primary } : undefined}>
                  <div className="mt-0.5">
                    {m.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : m.status === "current" ? (
                      <Clock className="h-5 w-5" style={{ color: primary }} />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-xs">{m.title}</div>
                    <div className="text-[10px] text-gray-400">{m.date}</div>
                    <div className="text-[11px] text-gray-500 mt-1">{m.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Documents</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium" style={{ background: primary }}>
                <Upload className="h-3.5 w-3.5" /> Upload
              </button>
            </div>
            <div className="space-y-2">
              {DOCUMENTS.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 rounded-xl bg-white border border-gray-200 p-3">
                  <FileText className="h-8 w-8 text-gray-300" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs truncate">{doc.name}</div>
                    <div className="text-[10px] text-gray-400">{doc.type} · {doc.size} · {doc.uploadedAt}</div>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${doc.status === "signed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="flex flex-col h-full">
            <h2 className="text-lg font-bold mb-4">Messages</h2>
            <div className="flex-1 space-y-3 mb-4">
              {MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-xl px-3 py-2 text-xs ${msg.from === "client" ? "text-white" : "bg-white border border-gray-200 text-gray-700"}`} style={msg.from === "client" ? { background: primary } : undefined}>
                    <div className={`text-[10px] font-medium mb-1 ${msg.from === "client" ? "text-white/70" : "text-gray-400"}`}>{msg.sender} · {msg.time}</div>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <button className="p-2 rounded-lg text-white" style={{ background: primary }}><Send className="h-4 w-4" /></button>
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Billing</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                <div className="text-lg font-bold text-green-600">${totalPaid.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500">Paid</div>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                <div className="text-lg font-bold" style={{ color: primary }}>${(totalInvoiced - totalPaid).toLocaleString()}</div>
                <div className="text-[10px] text-gray-500">Remaining</div>
              </div>
            </div>
            <div className="space-y-2">
              {INVOICES.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between rounded-xl bg-white border border-gray-200 p-3">
                  <div>
                    <div className="font-medium text-xs">{inv.id}</div>
                    <div className="text-[10px] text-gray-400">{inv.description}</div>
                    <div className="text-[10px] text-gray-400">{inv.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">${inv.amount.toLocaleString()}</div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
