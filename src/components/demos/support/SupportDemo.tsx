"use client";

import { useState, useEffect } from "react";
import {
  Inbox,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Send,
  Bot,
  ChevronRight,
} from "lucide-react";
import { TICKETS, type Ticket } from "@/data/demos/support-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

const STATUS_STYLES = {
  open: "bg-red-100 text-red-700",
  in_progress: "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
};

const PRIORITY_STYLES = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-600",
  high: "bg-orange-100 text-orange-600",
  urgent: "bg-red-100 text-red-600",
};

export function SupportDemo({ brand }: { brand?: BrandTheme | null }) {
  const [tickets] = useState(TICKETS);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiVisible, setAiVisible] = useState(false);
  const [aiText, setAiText] = useState("");

  const primary = brand?.primaryColor || "#7B2FF7";
  const bizName = brand?.businessName || "Support Hub";

  const filtered = tickets.filter(
    (t) => filter === "all" || t.status === filter
  );

  const openCount = tickets.filter((t) => t.status === "open").length;
  const inProgressCount = tickets.filter((t) => t.status === "in_progress").length;

  function handleAIDraft() {
    if (!selected?.aiDraft) return;
    setAiLoading(true);
    setAiVisible(false);
    setAiText("");

    setTimeout(() => {
      setAiLoading(false);
      setAiVisible(true);
      // Typewriter effect
      let i = 0;
      const draft = selected.aiDraft!;
      const interval = setInterval(() => {
        setAiText(draft.slice(0, i));
        i += 2;
        if (i > draft.length) {
          clearInterval(interval);
          setAiText(draft);
        }
      }, 10);
    }, 1500);
  }

  // Reset AI state when selecting a new ticket
  useEffect(() => {
    setAiVisible(false);
    setAiText("");
    setAiLoading(false);
  }, [selected?.id]);

  return (
    <div className="flex h-[600px] text-sm">
      {/* Ticket list */}
      <div className="w-80 border-r border-gray-200 flex flex-col shrink-0">
        {/* Stats bar */}
        <div className="flex items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs">
          <div className="flex items-center gap-1.5">
            <Inbox className="h-3.5 w-3.5 text-red-500" />
            <span className="font-medium">{openCount} Open</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-medium">{inProgressCount} In Progress</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: "all", label: "All" },
            { id: "open", label: "Open" },
            { id: "in_progress", label: "Active" },
            { id: "resolved", label: "Resolved" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${filter === f.id ? "border-b-2 text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
              style={filter === f.id ? { borderColor: primary } : undefined}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Ticket list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => setSelected(ticket)}
              className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${selected?.id === ticket.id ? "bg-primary/5" : ""}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-xs text-gray-900 truncate mr-2">
                  {ticket.subject}
                </span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${PRIORITY_STYLES[ticket.priority]}`}>
                  {ticket.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500">{ticket.customer}</span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${STATUS_STYLES[ticket.status]}`}>
                  {ticket.status.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                <Clock className="h-3 w-3" />
                {ticket.createdAt}
                {ticket.status !== "resolved" && (
                  <span className="ml-auto text-amber-500">
                    SLA: {ticket.slaMinutes}m
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation view */}
      <div className="flex-1 flex flex-col">
        {selected ? (
          <>
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">{selected.subject}</h3>
                  <span className="text-xs text-gray-500">
                    {selected.customer} &middot; #{selected.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[selected.priority]}`}>
                    {selected.priority}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[selected.status]}`}>
                    {selected.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selected.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "agent" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                      msg.from === "agent"
                        ? "bg-white border border-gray-200 text-gray-700"
                        : "text-white"
                    }`}
                    style={msg.from === "customer" ? { background: primary } : undefined}
                  >
                    <p>{msg.text}</p>
                    <span className={`text-[10px] mt-1 block ${msg.from === "agent" ? "text-gray-400" : "text-white/70"}`}>
                      {msg.from === "agent" ? bizName : selected.customer} &middot; {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* AI Draft */}
              {aiLoading && (
                <div className="flex justify-end">
                  <div className="bg-white border-2 border-dashed rounded-xl px-4 py-3 flex items-center gap-2 text-xs text-gray-500" style={{ borderColor: primary }}>
                    <Loader2 className="h-4 w-4 animate-spin" style={{ color: primary }} />
                    AI is drafting a response...
                  </div>
                </div>
              )}

              {aiVisible && aiText && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-xl px-4 py-3 text-xs leading-relaxed border-2 bg-white" style={{ borderColor: primary }}>
                    <div className="flex items-center gap-1.5 mb-2 text-[10px] font-medium" style={{ color: primary }}>
                      <Bot className="h-3.5 w-3.5" /> AI-Drafted Response
                    </div>
                    <p className="text-gray-700">{aiText}</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        className="text-[10px] font-medium text-white px-3 py-1 rounded-lg flex items-center gap-1"
                        style={{ background: primary }}
                      >
                        <Send className="h-3 w-3" /> Send
                      </button>
                      <button className="text-[10px] font-medium text-gray-500 px-3 py-1 rounded-lg border border-gray-200">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action bar */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a reply..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {selected.aiDraft && selected.status !== "resolved" && (
                <button
                  onClick={handleAIDraft}
                  disabled={aiLoading}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-xs font-medium shrink-0"
                  style={{ background: primary }}
                >
                  <Bot className="h-3.5 w-3.5" /> AI Draft
                </button>
              )}
              <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Inbox className="h-10 w-10 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Select a ticket to view</p>
              <p className="text-xs mt-1">
                Click any ticket on the left <ChevronRight className="h-3 w-3 inline" />
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
