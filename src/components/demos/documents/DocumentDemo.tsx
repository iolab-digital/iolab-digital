"use client";

import { useState } from "react";
import {
  FileText,
  FolderOpen,
  PenLine,
  Download,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Stamp,
} from "lucide-react";
import {
  TEMPLATES,
  CLIENTS,
  GENERATED_DOCS,
  SAMPLE_PROPOSAL,
} from "@/data/demos/documents-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

const STATUS_STYLES = {
  draft: { bg: "bg-gray-100 text-gray-600", icon: AlertCircle },
  sent: { bg: "bg-blue-100 text-blue-600", icon: Send },
  signed: { bg: "bg-green-100 text-green-600", icon: CheckCircle2 },
};

export function DocumentDemo({ brand }: { brand?: BrandTheme | null }) {
  const [view, setView] = useState<"templates" | "history" | "editor">("templates");
  const [selectedClient, setSelectedClient] = useState(0);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);

  const primary = brand?.primaryColor || "#7B2FF7";
  const bizName = brand?.businessName || "iOLab Digital";
  const client = CLIENTS[selectedClient];

  function openEditor() {
    setEditValues({
      "{clientName}": client.name,
      "{company}": client.company,
    });
    setView("editor");
  }

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  }

  if (view === "editor") {
    return (
      <div className="h-[600px] flex flex-col text-sm">
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setView("templates")} className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h3 className="font-bold text-sm flex-1">{SAMPLE_PROPOSAL.title}</h3>
          <select
            value={selectedClient}
            onChange={(e) => {
              const idx = Number(e.target.value);
              setSelectedClient(idx);
              setEditValues({
                "{clientName}": CLIENTS[idx].name,
                "{company}": CLIENTS[idx].company,
              });
            }}
            className="px-2 py-1 rounded-lg border border-gray-200 text-xs"
          >
            {CLIENTS.map((c, i) => (
              <option key={i} value={i}>{c.company}</option>
            ))}
          </select>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium"
            style={{ background: generating ? "#9ca3af" : primary }}
          >
            <Download className="h-3.5 w-3.5" />
            {generating ? "Generating..." : "Generate PDF"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {/* Document preview */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold" style={{ color: primary }}>{bizName}</h2>
                <div className="text-xs text-gray-400 mt-1">Medford, New Jersey · hello@iolab.co</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">PROJECT PROPOSAL</div>
                <div className="text-xs text-gray-400">March 28, 2026</div>
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              {SAMPLE_PROPOSAL.sections.map((section) => {
                const displayValue = editValues[section.value] || section.value;
                const isAutoFilled = section.value.startsWith("{");

                return (
                  <div key={section.label}>
                    <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{section.label}</label>
                    {section.editable ? (
                      <div className="relative mt-1">
                        <input
                          type="text"
                          value={displayValue}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              [section.value]: e.target.value,
                            }))
                          }
                          className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${isAutoFilled && !editValues[section.value] ? "border-primary/30 bg-primary/5" : "border-gray-200"}`}
                          style={isAutoFilled && !editValues[section.value] ? { borderColor: `${primary}40` } : undefined}
                        />
                        {isAutoFilled && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ background: `${primary}15`, color: primary }}>
                            Auto-filled
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700 mt-1 leading-relaxed">{section.value}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Signature area */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">{bizName}</div>
                  <div className="h-12 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Stamp className="h-3 w-3" /> Sign here</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Client</div>
                  <div className="h-12 rounded-lg border-2 border-dashed flex items-center justify-center" style={{ borderColor: `${primary}40` }}>
                    <span className="text-xs flex items-center gap-1" style={{ color: primary }}><PenLine className="h-3 w-3" /> E-signature</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {generating && (
            <div className="max-w-2xl mx-auto mt-4 rounded-xl bg-green-50 border border-green-200 p-3 text-center text-xs text-green-700">
              <CheckCircle2 className="h-4 w-4 inline mr-1.5" /> PDF generated and ready to send!
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[600px] text-sm">
      {/* Sidebar: Templates */}
      <div className="w-56 border-r border-gray-200 bg-white flex flex-col shrink-0">
        <div className="p-3 border-b border-gray-200">
          <h3 className="font-bold text-xs flex items-center gap-1.5">
            <FolderOpen className="h-3.5 w-3.5" style={{ color: primary }} />
            Templates
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => openEditor()}
              className="w-full text-left rounded-lg p-2.5 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                <div>
                  <div className="text-xs font-medium group-hover:text-primary">{tmpl.name}</div>
                  <div className="text-[10px] text-gray-400">{tmpl.category} · {tmpl.fields.length} fields</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-gray-200">
          <div className="text-[10px] text-gray-400 mb-2">Auto-populate from:</div>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs"
          >
            {CLIENTS.map((c, i) => (
              <option key={i} value={i}>{c.company}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main: Document history */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Document History</h2>
          <div className="flex gap-2">
            {(["all", "draft", "sent", "signed"] as const).map((f) => (
              <button key={f} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white border border-gray-200 text-gray-500 hover:text-primary">
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {GENERATED_DOCS.map((doc) => {
            const StatusIcon = STATUS_STYLES[doc.status].icon;
            return (
              <div key={doc.id} className="flex items-center gap-3 rounded-xl bg-white border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer" onClick={() => openEditor()}>
                <FileText className="h-8 w-8 text-gray-300 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{doc.name}</div>
                  <div className="text-[10px] text-gray-400">{doc.template} · {doc.client} · {doc.date}</div>
                </div>
                <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[doc.status].bg}`}>
                  <StatusIcon className="h-3 w-3" /> {doc.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
            <Clock className="h-4 w-4 mx-auto mb-1 text-gray-400" />
            <div className="text-lg font-bold">{GENERATED_DOCS.filter((d) => d.status === "draft").length}</div>
            <div className="text-[10px] text-gray-400">Drafts</div>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
            <Send className="h-4 w-4 mx-auto mb-1 text-blue-500" />
            <div className="text-lg font-bold">{GENERATED_DOCS.filter((d) => d.status === "sent").length}</div>
            <div className="text-[10px] text-gray-400">Awaiting Signature</div>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
            <CheckCircle2 className="h-4 w-4 mx-auto mb-1 text-green-500" />
            <div className="text-lg font-bold">{GENERATED_DOCS.filter((d) => d.status === "signed").length}</div>
            <div className="text-[10px] text-gray-400">Signed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
