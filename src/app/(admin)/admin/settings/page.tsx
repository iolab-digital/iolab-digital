"use client";

import { useState, useEffect } from "react";
import {
  Bot,
  Save,
  RotateCcw,
  Loader2,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react";
import { ChatbotToggle } from "@/components/admin/ChatbotToggle";

const DEFAULT_PROMPT_MARKER = "DEFAULT"; // Sentinel to know when to fetch default

export default function AdminSettingsPage() {
  const [prompt, setPrompt] = useState("");
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [defaultPrompt, setDefaultPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // Fetch the current custom prompt (if any)
        const customRes = await fetch("/api/admin/settings?key=chatbot_prompt");
        const customData = await customRes.json();

        // Fetch the default prompt
        const defaultRes = await fetch("/api/admin/settings?key=chatbot_default_prompt");
        const defaultData = await defaultRes.json();

        // If we have a default stored, use it. Otherwise fetch from the knowledge base endpoint.
        let defaultText = defaultData.value;
        if (!defaultText) {
          // First load — fetch the hardcoded default and store it
          const kbRes = await fetch("/api/chat/knowledge-base");
          const kbData = await kbRes.json();
          defaultText = kbData.prompt || "";
        }

        setDefaultPrompt(defaultText);

        if (customData.value) {
          setPrompt(customData.value);
          setOriginalPrompt(customData.value);
          setIsCustom(true);
        } else {
          setPrompt(defaultText);
          setOriginalPrompt(defaultText);
          setIsCustom(false);
        }
      } catch {
        // Silent
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "chatbot_prompt", value: prompt }),
      });
      setOriginalPrompt(prompt);
      setIsCustom(true);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save. Please try again.");
    }
    setSaving(false);
  }

  async function handleReset() {
    if (!confirm("Reset to the default prompt? Your custom edits will be removed.")) return;
    setSaving(true);
    try {
      // Delete the custom prompt from DB
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "chatbot_prompt", value: "" }),
      });
      setPrompt(defaultPrompt);
      setOriginalPrompt(defaultPrompt);
      setIsCustom(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to reset.");
    }
    setSaving(false);
  }

  const hasChanges = prompt !== originalPrompt;
  const charCount = prompt.length;

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-display">Settings</h1>
        <p className="text-sm text-gray-500">Manage chatbot behavior and site-wide settings.</p>
      </div>

      {/* Chatbot Toggle */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Chatbot Status</h2>
        <ChatbotToggle />
      </div>

      {/* Master Prompt Editor */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Chatbot Master Prompt
          </h2>
          <div className="flex items-center gap-2">
            {isCustom && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                Custom
              </span>
            )}
            {!isCustom && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                Default
              </span>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mb-4">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>This is the system prompt that controls how your AI chatbot behaves.</strong> It contains your company info, services, pricing, and personality guidelines.</p>
              <p>Changes take effect immediately for all new conversations. Existing conversations won&apos;t be affected.</p>
              <p><strong>Tips:</strong> Keep the ## section headers. Don&apos;t remove the SAFETY & GUARDRAILS section. Add new info at the end or within relevant sections.</p>
            </div>
          </div>
        </div>

        {/* Warning if changes unsaved */}
        {hasChanges && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs text-amber-700">You have unsaved changes.</span>
          </div>
        )}

        {/* Textarea */}
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-gray-600">System Prompt</span>
            </div>
            <span className="text-[10px] text-gray-400">{charCount.toLocaleString()} characters</span>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-[500px] p-4 text-[13px] font-mono leading-relaxed text-gray-700 focus:outline-none resize-y"
            placeholder="Enter the chatbot system prompt..."
            spellCheck={false}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleReset}
            disabled={saving || !isCustom}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset to Default
          </button>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1 text-xs text-green-600">
                <Check className="h-3.5 w-3.5" /> Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
