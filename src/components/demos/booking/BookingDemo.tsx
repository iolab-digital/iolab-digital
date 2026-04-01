"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Bell,
  X,
  MessageSquare,
} from "lucide-react";
import {
  STAFF,
  APPOINTMENTS,
  WAITLIST,
  HOURS,
  DAYS,
  SERVICES,
  type Appointment,
} from "@/data/demos/booking-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

export function BookingDemo({ brand }: { brand?: BrandTheme | null }) {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [selectedSlot, setSelectedSlot] = useState<{
    staffId: number;
    day: number;
    hour: number;
  } | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingService, setBookingService] = useState("consultation");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const primary = brand?.primaryColor || "#7B2FF7";
  const bizName = brand?.businessName || "Your Business";

  const todayAppointments = appointments.filter((a) => a.day === 0);

  function isSlotOccupied(staffId: number, day: number, hour: number) {
    return appointments.some(
      (a) =>
        a.staffId === staffId &&
        a.day === day &&
        hour >= a.hour &&
        hour < a.hour + a.duration
    );
  }

  function handleBook() {
    if (!selectedSlot || !bookingName) return;
    const svc = SERVICES.find((s) => s.id === bookingService);
    const newAppt: Appointment = {
      id: Date.now(),
      clientName: bookingName,
      service: svc?.name || "Consultation",
      staffId: selectedSlot.staffId,
      day: selectedSlot.day,
      hour: selectedSlot.hour,
      duration: (svc?.duration || 30) / 30,
      color: svc?.color.replace("text-", "border-").replace("100", "100") || "bg-blue-100 border-blue-300 text-blue-800",
      confirmed: true,
    };
    setAppointments((prev) => [...prev, newAppt]);
    setSelectedSlot(null);
    setBookingName("");
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  }

  return (
    <div className="flex h-[600px] text-sm">
      {/* Sidebar: Today's schedule + waitlist */}
      <div className="w-56 border-r border-gray-200 bg-white flex flex-col shrink-0">
        <div className="p-3 border-b border-gray-200">
          <h3 className="font-bold text-xs flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" style={{ color: primary }} />
            Today&apos;s Schedule
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {todayAppointments.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">No appointments today</p>
          ) : (
            todayAppointments.map((appt) => {
              const staff = STAFF.find((s) => s.id === appt.staffId);
              return (
                <div
                  key={appt.id}
                  className={`rounded-lg border p-2.5 ${appt.color}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-[11px]">{appt.clientName}</span>
                    {appt.confirmed ? (
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-amber-600" />
                    )}
                  </div>
                  <div className="text-[10px] opacity-75">
                    {appt.hour}:00 — {appt.service}
                  </div>
                  <div className="text-[10px] opacity-60">{staff?.name}</div>
                </div>
              );
            })
          )}
        </div>

        {/* Waitlist */}
        <div className="border-t border-gray-200">
          <div className="p-3 border-b border-gray-100">
            <h3 className="font-bold text-xs flex items-center gap-1.5">
              <Bell className="h-3.5 w-3.5 text-amber-500" />
              Waitlist ({WAITLIST.length})
            </h3>
          </div>
          <div className="p-2 space-y-1.5 max-h-32 overflow-y-auto">
            {WAITLIST.map((entry, i) => (
              <div key={i} className="rounded-lg bg-amber-50 border border-amber-100 p-2 text-[10px]">
                <span className="font-medium">{entry.name}</span>
                <div className="text-amber-600">{entry.service} — {entry.preferred}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="w-16 p-2 text-[10px] text-gray-400 font-medium border-b border-r border-gray-200">
                Time
              </th>
              {STAFF.map((s) => (
                <th
                  key={s.id}
                  className="p-2 text-xs font-medium border-b border-r border-gray-200"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                      style={{ background: primary }}
                    >
                      {s.avatar}
                    </div>
                    <div className="text-left">
                      <div className="text-[11px]">{s.name}</div>
                      <div className="text-[9px] text-gray-400 font-normal">{s.role}</div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour}>
                <td className="p-1.5 text-[10px] text-gray-400 text-center border-r border-b border-gray-100 bg-gray-50 font-mono">
                  {hour}:00
                </td>
                {STAFF.map((staff) => {
                  const appt = appointments.find(
                    (a) => a.staffId === staff.id && a.day === 0 && a.hour === hour
                  );
                  const occupied = isSlotOccupied(staff.id, 0, hour);
                  const isSelected =
                    selectedSlot?.staffId === staff.id &&
                    selectedSlot?.day === 0 &&
                    selectedSlot?.hour === hour;

                  return (
                    <td
                      key={staff.id}
                      className={`border-r border-b border-gray-100 p-0.5 h-12 relative ${
                        !occupied ? "cursor-pointer hover:bg-primary/5" : ""
                      } ${isSelected ? "bg-primary/10" : ""}`}
                      onClick={() => {
                        if (!occupied) {
                          setSelectedSlot({ staffId: staff.id, day: 0, hour });
                        }
                      }}
                    >
                      {appt && (
                        <div
                          className={`absolute inset-0.5 rounded-md border px-1.5 py-1 ${appt.color} text-[10px]`}
                        >
                          <div className="font-medium truncate">{appt.clientName}</div>
                          <div className="truncate opacity-75">{appt.service}</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking form / Confirmation */}
      {selectedSlot && (
        <div className="w-64 border-l border-gray-200 bg-white p-4 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">New Booking</h3>
            <button onClick={() => setSelectedSlot(null)} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="h-3.5 w-3.5" />
              {DAYS[selectedSlot.day]} at {selectedSlot.hour}:00
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {STAFF.find((s) => s.id === selectedSlot.staffId)?.name}
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Client name"
              value={bookingName}
              onChange={(e) => setBookingName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <select
              value={bookingService}
              onChange={(e) => setBookingService(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.duration} min)
                </option>
              ))}
            </select>
            <button
              onClick={handleBook}
              disabled={!bookingName}
              className="w-full py-2 rounded-lg text-white text-xs font-medium disabled:opacity-50"
              style={{ background: primary }}
            >
              Book Appointment
            </button>
          </div>

          {/* SMS preview */}
          <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mb-1.5">
              <MessageSquare className="h-3 w-3" /> Auto-confirmation preview
            </div>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              &quot;Hi {bookingName || "[name]"}, your appointment with{" "}
              {STAFF.find((s) => s.id === selectedSlot.staffId)?.name} at{" "}
              {bizName} is confirmed for {DAYS[selectedSlot.day]} at{" "}
              {selectedSlot.hour}:00. Reply CANCEL to reschedule.&quot;
            </p>
          </div>
        </div>
      )}

      {/* Confirmation toast */}
      {showConfirmation && (
        <div className="absolute bottom-4 right-4 z-50 rounded-xl bg-green-50 border border-green-200 p-3 shadow-lg flex items-center gap-2 text-xs text-green-700 animate-bounce">
          <CheckCircle2 className="h-4 w-4" /> Appointment booked! Confirmation sent.
        </div>
      )}
    </div>
  );
}
