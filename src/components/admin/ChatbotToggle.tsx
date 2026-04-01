"use client";

import { useState, useEffect } from "react";
import { Bot, Loader2 } from "lucide-react";

export function ChatbotToggle() {
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings?key=chatbot_enabled")
      .then((r) => r.json())
      .then((data) => {
        setEnabled(data.value !== "false");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function toggle() {
    const newValue = !enabled;
    setSaving(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "chatbot_enabled", value: String(newValue) }),
      });
      setEnabled(newValue);
    } catch {
      // Silent
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white border border-gray-200 p-4 flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        <span className="text-sm text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${enabled ? "bg-green-50" : "bg-gray-100"}`}>
            <Bot className={`h-5 w-5 ${enabled ? "text-green-600" : "text-gray-400"}`} />
          </div>
          <div>
            <div className="text-sm font-medium">AI Chatbot</div>
            <div className="text-xs text-gray-500">
              {enabled ? "Live on all pages" : "Disabled — hidden from visitors"}
            </div>
          </div>
        </div>
        <button
          onClick={toggle}
          disabled={saving}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            enabled ? "bg-green-500" : "bg-gray-300"
          } ${saving ? "opacity-50" : ""}`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              enabled ? "left-6" : "left-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
