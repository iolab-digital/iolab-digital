"use client";

import { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  Clock,
  Users,
  BarChart3,
  Building2,
  X,
  MessageSquare,
  PhoneCall,
  FileText,
  Calendar,
} from "lucide-react";
import {
  CONTACTS,
  DEALS,
  ACTIVITIES,
  PIPELINE_STAGES,
  type Contact,
  type Deal,
} from "@/data/demos/crm-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

const ACTIVITY_ICONS = {
  call: PhoneCall,
  email: Mail,
  note: FileText,
  meeting: Calendar,
};

export function CRMDemo({ brand }: { brand?: BrandTheme | null }) {
  const [contacts] = useState(CONTACTS);
  const [deals, setDeals] = useState(DEALS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [view, setView] = useState<"contacts" | "pipeline">("contacts");
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  const bizName = brand?.businessName || "Acme Corp";
  const primary = brand?.primaryColor || "#7B2FF7";

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  function handleDragStart(deal: Deal) {
    setDraggedDeal(deal);
  }

  function handleDrop(stage: string) {
    if (!draggedDeal) return;
    setDeals((prev) =>
      prev.map((d) =>
        d.id === draggedDeal.id ? { ...d, stage: stage as Deal["stage"] } : d
      )
    );
    setDraggedDeal(null);
  }

  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);
  const closedValue = deals
    .filter((d) => d.stage === "closed")
    .reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex h-[600px] text-sm">
      {/* Sidebar */}
      <div className="w-48 bg-gray-900 text-white p-4 flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: primary }}
          >
            {bizName.charAt(0)}
          </div>
          <span className="font-semibold text-xs truncate">{bizName}</span>
        </div>

        <button
          onClick={() => setView("contacts")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${view === "contacts" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}
        >
          <Users className="h-4 w-4" /> Contacts
        </button>
        <button
          onClick={() => setView("pipeline")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${view === "pipeline" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}
        >
          <BarChart3 className="h-4 w-4" /> Pipeline
        </button>

        {/* Stats */}
        <div className="mt-auto space-y-3 pt-4 border-t border-gray-800">
          <div>
            <div className="text-xs text-gray-500">Total Pipeline</div>
            <div className="font-bold">${(totalValue / 1000).toFixed(0)}K</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Closed Won</div>
            <div className="font-bold text-green-400">
              ${(closedValue / 1000).toFixed(0)}K
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Contacts</div>
            <div className="font-bold">{contacts.length}</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {view === "contacts" ? (
          <>
            {/* Search + filters */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="lead">Leads</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Contact list + detail */}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                {filtered.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${selectedContact?.id === contact.id ? "bg-primary/5 border-l-2" : ""}`}
                    style={
                      selectedContact?.id === contact.id
                        ? { borderLeftColor: primary }
                        : undefined
                    }
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ background: primary }}
                    >
                      {contact.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">
                        {contact.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {contact.company}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        contact.status === "active"
                          ? "bg-green-100 text-green-700"
                          : contact.status === "lead"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {contact.status}
                    </span>
                  </button>
                ))}
              </div>

              {/* Detail panel */}
              {selectedContact && (
                <div className="w-72 border-l border-gray-200 bg-gray-50 overflow-y-auto shrink-0">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold">{selectedContact.name}</h3>
                      <button
                        onClick={() => setSelectedContact(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="h-3.5 w-3.5" />
                        {selectedContact.company}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-3.5 w-3.5" />
                        {selectedContact.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-3.5 w-3.5" />
                        {selectedContact.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-3.5 w-3.5" />
                        Last contact: {selectedContact.lastContact}
                      </div>
                    </div>

                    {/* Deals for this contact */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Deals
                      </h4>
                      {deals
                        .filter(
                          (d) => d.contactId === selectedContact.id
                        )
                        .map((deal) => (
                          <div
                            key={deal.id}
                            className="rounded-lg bg-white border border-gray-200 p-3 mb-2"
                          >
                            <div className="font-medium text-xs">
                              {deal.title}
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                ${deal.value.toLocaleString()}
                              </span>
                              <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                  PIPELINE_STAGES.find(
                                    (s) => s.id === deal.stage
                                  )?.color
                                }`}
                              >
                                {
                                  PIPELINE_STAGES.find(
                                    (s) => s.id === deal.stage
                                  )?.label
                                }
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Pipeline view */
          <div className="flex-1 overflow-x-auto p-4">
            <div className="flex gap-4 h-full min-w-max">
              {PIPELINE_STAGES.map((stage) => {
                const stageDeals = deals.filter(
                  (d) => d.stage === stage.id
                );
                const stageValue = stageDeals.reduce(
                  (sum, d) => sum + d.value,
                  0
                );

                return (
                  <div
                    key={stage.id}
                    className="w-64 flex flex-col"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(stage.id)}
                  >
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stage.color}`}
                        >
                          {stage.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {stageDeals.length}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ${(stageValue / 1000).toFixed(0)}K
                      </span>
                    </div>

                    <div className="flex-1 bg-gray-50 rounded-xl p-2 space-y-2 min-h-[200px]">
                      {stageDeals.map((deal) => (
                        <div
                          key={deal.id}
                          draggable
                          onDragStart={() => handleDragStart(deal)}
                          className="rounded-lg bg-white border border-gray-200 p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                        >
                          <div className="font-medium text-xs mb-1">
                            {deal.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {deal.company}
                          </div>
                          <div
                            className="text-xs font-bold mt-2"
                            style={{ color: primary }}
                          >
                            ${deal.value.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Activity sidebar */}
      <div className="w-56 border-l border-gray-200 bg-white overflow-y-auto shrink-0 hidden lg:block">
        <div className="p-3 border-b border-gray-200">
          <h3 className="font-semibold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" /> Recent Activity
          </h3>
        </div>
        <div className="p-2 space-y-1">
          {ACTIVITIES.map((activity) => {
            const Icon = ACTIVITY_ICONS[activity.type];
            return (
              <div
                key={activity.id}
                className="rounded-lg p-2.5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-3 w-3 text-gray-400" />
                  <span className="font-medium text-xs">
                    {activity.contactName}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {activity.description}
                </p>
                <span className="text-[10px] text-gray-400">
                  {activity.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
