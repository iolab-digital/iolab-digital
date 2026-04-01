export type Staff = {
  id: number;
  name: string;
  avatar: string;
  role: string;
};

export type ServiceType = {
  id: string;
  name: string;
  duration: number; // minutes
  color: string;
};

export type Appointment = {
  id: number;
  clientName: string;
  service: string;
  staffId: number;
  day: number; // 0=Mon, 1=Tue, etc.
  hour: number; // 9-17
  duration: number; // slots (1 slot = 30 min)
  color: string;
  confirmed: boolean;
};

export type WaitlistEntry = {
  name: string;
  service: string;
  preferred: string;
};

export const STAFF: Staff[] = [
  { id: 1, name: "Dr. Sarah Chen", avatar: "SC", role: "Senior Provider" },
  { id: 2, name: "Mike Torres", avatar: "MT", role: "Provider" },
  { id: 3, name: "Lisa Park", avatar: "LP", role: "Specialist" },
];

export const SERVICES: ServiceType[] = [
  { id: "consultation", name: "Consultation", duration: 30, color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "service", name: "Standard Service", duration: 60, color: "bg-green-100 text-green-700 border-green-200" },
  { id: "follow-up", name: "Follow-up", duration: 30, color: "bg-amber-100 text-amber-700 border-amber-200" },
  { id: "premium", name: "Premium Service", duration: 90, color: "bg-purple-100 text-purple-700 border-purple-200" },
];

export const APPOINTMENTS: Appointment[] = [
  { id: 1, clientName: "John Martinez", service: "Standard Service", staffId: 1, day: 0, hour: 9, duration: 2, color: "bg-green-100 border-green-300 text-green-800", confirmed: true },
  { id: 2, clientName: "Amy Walsh", service: "Consultation", staffId: 2, day: 0, hour: 10, duration: 1, color: "bg-blue-100 border-blue-300 text-blue-800", confirmed: true },
  { id: 3, clientName: "Robert Kim", service: "Premium Service", staffId: 1, day: 0, hour: 14, duration: 3, color: "bg-purple-100 border-purple-300 text-purple-800", confirmed: false },
  { id: 4, clientName: "Sarah Davis", service: "Follow-up", staffId: 3, day: 1, hour: 9, duration: 1, color: "bg-amber-100 border-amber-300 text-amber-800", confirmed: true },
  { id: 5, clientName: "Tom Chen", service: "Standard Service", staffId: 2, day: 1, hour: 11, duration: 2, color: "bg-green-100 border-green-300 text-green-800", confirmed: true },
  { id: 6, clientName: "Maria Lopez", service: "Consultation", staffId: 1, day: 1, hour: 15, duration: 1, color: "bg-blue-100 border-blue-300 text-blue-800", confirmed: true },
  { id: 7, clientName: "James Wilson", service: "Premium Service", staffId: 3, day: 2, hour: 10, duration: 3, color: "bg-purple-100 border-purple-300 text-purple-800", confirmed: true },
  { id: 8, clientName: "Emily Foster", service: "Standard Service", staffId: 2, day: 2, hour: 14, duration: 2, color: "bg-green-100 border-green-300 text-green-800", confirmed: false },
  { id: 9, clientName: "David Park", service: "Follow-up", staffId: 1, day: 3, hour: 9, duration: 1, color: "bg-amber-100 border-amber-300 text-amber-800", confirmed: true },
  { id: 10, clientName: "Lisa Nguyen", service: "Consultation", staffId: 3, day: 3, hour: 13, duration: 1, color: "bg-blue-100 border-blue-300 text-blue-800", confirmed: true },
  { id: 11, clientName: "Chris Taylor", service: "Standard Service", staffId: 1, day: 4, hour: 11, duration: 2, color: "bg-green-100 border-green-300 text-green-800", confirmed: true },
  { id: 12, clientName: "Jennifer Adams", service: "Premium Service", staffId: 2, day: 4, hour: 9, duration: 3, color: "bg-purple-100 border-purple-300 text-purple-800", confirmed: false },
];

export const WAITLIST: WaitlistEntry[] = [
  { name: "Karen Mitchell", service: "Premium Service", preferred: "Tuesday afternoon" },
  { name: "Steve Rodriguez", service: "Consultation", preferred: "Any morning" },
  { name: "Anna Thompson", service: "Standard Service", preferred: "Wednesday" },
];

export const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
