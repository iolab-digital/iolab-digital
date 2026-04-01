"use client";

import { useState } from "react";
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  ArrowLeft,
  Bell,
} from "lucide-react";
import { INVOICES, type Invoice } from "@/data/demos/invoicing-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

const STATUS_STYLES = {
  draft: { bg: "bg-gray-100 text-gray-600", icon: FileText },
  sent: { bg: "bg-blue-100 text-blue-600", icon: Send },
  paid: { bg: "bg-green-100 text-green-600", icon: CheckCircle2 },
  overdue: { bg: "bg-red-100 text-red-600", icon: AlertCircle },
};

export function InvoicingDemo({ brand }: { brand?: BrandTheme | null }) {
  const [invoices] = useState(INVOICES);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [reminderSent, setReminderSent] = useState<Set<string>>(new Set());

  const primary = brand?.primaryColor || "#7B2FF7";
  const bizName = brand?.businessName || "iOLab Digital";

  const filtered = invoices.filter(
    (inv) => filter === "all" || inv.status === filter
  );

  const totalRevenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.paidAmount, 0);
  const outstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((sum, i) => sum + (i.amount - i.paidAmount), 0);
  const overdueAmount = invoices
    .filter((i) => i.status === "overdue")
    .reduce((sum, i) => sum + (i.amount - i.paidAmount), 0);

  function handleSendReminder(invId: string) {
    setReminderSent((prev) => new Set([...prev, invId]));
  }

  if (selected) {
    const tax = selected.amount * 0.07;
    const total = selected.amount + tax;

    return (
      <div className="h-[600px] overflow-y-auto bg-white p-6">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to invoices
        </button>

        {/* Invoice header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold">{selected.id}</h2>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[selected.status].bg}`}>
                {selected.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Issued {selected.issuedDate} &middot; Due {selected.dueDate}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">From</div>
            <div className="font-bold text-sm" style={{ color: primary }}>{bizName}</div>
          </div>
        </div>

        {/* Bill to */}
        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-1">Bill To</div>
          <div className="font-medium text-sm">{selected.customer}</div>
          <div className="text-xs text-gray-500">{selected.email}</div>
        </div>

        {/* Line items */}
        <table className="w-full text-xs mb-6">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-gray-500 font-medium">Description</th>
              <th className="text-center py-2 text-gray-500 font-medium w-16">Qty</th>
              <th className="text-right py-2 text-gray-500 font-medium w-24">Rate</th>
              <th className="text-right py-2 text-gray-500 font-medium w-24">Amount</th>
            </tr>
          </thead>
          <tbody>
            {selected.items.map((item, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-3">{item.description}</td>
                <td className="py-3 text-center text-gray-500">{item.qty}</td>
                <td className="py-3 text-right text-gray-500">${item.rate.toLocaleString()}</td>
                <td className="py-3 text-right font-medium">${(item.qty * item.rate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">${selected.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax (7%)</span>
              <span className="font-medium">${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold" style={{ color: primary }}>
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            {selected.paidAmount > 0 && selected.paidAmount < selected.amount && (
              <>
                <div className="flex justify-between text-green-600">
                  <span>Paid</span>
                  <span>-${selected.paidAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Balance Due</span>
                  <span className="text-red-600">
                    ${(total - selected.paidAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {selected.status === "overdue" && (
            <button
              onClick={() => handleSendReminder(selected.id)}
              disabled={reminderSent.has(selected.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium"
              style={{ background: reminderSent.has(selected.id) ? "#9ca3af" : primary }}
            >
              <Bell className="h-3.5 w-3.5" />
              {reminderSent.has(selected.id) ? "Reminder Sent!" : "Send Payment Reminder"}
            </button>
          )}
          {selected.status === "draft" && (
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-xs font-medium"
              style={{ background: primary }}
            >
              <Send className="h-3.5 w-3.5" /> Send Invoice
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[600px] flex flex-col text-sm">
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 border-b border-gray-200">
        <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
          <DollarSign className="h-5 w-5 mx-auto mb-1 text-green-500" />
          <div className="text-lg font-bold text-green-600">${(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="text-[10px] text-gray-500">Revenue Collected</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
          <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
          <div className="text-lg font-bold text-blue-600">${(outstanding / 1000).toFixed(0)}K</div>
          <div className="text-[10px] text-gray-500">Outstanding</div>
        </div>
        <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
          <AlertCircle className="h-5 w-5 mx-auto mb-1 text-red-500" />
          <div className="text-lg font-bold text-red-600">${(overdueAmount / 1000).toFixed(0)}K</div>
          <div className="text-[10px] text-gray-500">Overdue</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: "all", label: "All Invoices" },
          { id: "draft", label: "Drafts" },
          { id: "sent", label: "Sent" },
          { id: "paid", label: "Paid" },
          { id: "overdue", label: "Overdue" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${filter === f.id ? "border-b-2 text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
            style={filter === f.id ? { borderColor: primary } : undefined}
          >
            {f.label}
            {f.id !== "all" && (
              <span className="ml-1 text-gray-400">
                ({invoices.filter((i) => i.status === f.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Invoice list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((inv) => {
          const StatusIcon = STATUS_STYLES[inv.status].icon;
          return (
            <button
              key={inv.id}
              onClick={() => setSelected(inv)}
              className="w-full flex items-center gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left"
            >
              <StatusIcon className={`h-5 w-5 shrink-0 ${
                inv.status === "paid" ? "text-green-500" :
                inv.status === "overdue" ? "text-red-500" :
                inv.status === "sent" ? "text-blue-500" : "text-gray-400"
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-xs">{inv.id}</span>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${STATUS_STYLES[inv.status].bg}`}>
                    {inv.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{inv.customer}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-sm">${inv.amount.toLocaleString()}</div>
                <div className="text-[10px] text-gray-400">Due {inv.dueDate}</div>
              </div>
              {inv.status === "overdue" && !reminderSent.has(inv.id) && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleSendReminder(inv.id); }}
                  className="shrink-0 text-[10px] font-medium px-2 py-1 rounded-lg text-white"
                  style={{ background: primary }}
                >
                  Remind
                </button>
              )}
              {reminderSent.has(inv.id) && (
                <span className="shrink-0 text-[10px] text-green-500 font-medium">Sent ✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
