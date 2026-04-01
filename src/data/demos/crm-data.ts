export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "lead" | "active" | "inactive";
  industry: string;
  lastContact: string;
  avatar: string; // initials
};

export type Deal = {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "closed";
  contactId: number;
};

export type Activity = {
  id: number;
  type: "call" | "email" | "note" | "meeting";
  contactName: string;
  description: string;
  time: string;
};

export const CONTACTS: Contact[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah@meridianplumbing.com", phone: "(555) 234-5678", company: "Meridian Plumbing", status: "active", industry: "Home Services", lastContact: "2 hours ago", avatar: "SJ" },
  { id: 2, name: "Mike Torres", email: "mike@sunsetdental.com", phone: "(555) 345-6789", company: "Sunset Dental", status: "active", industry: "Healthcare", lastContact: "Yesterday", avatar: "MT" },
  { id: 3, name: "Lisa Chen", email: "lisa@blueridgerealty.com", phone: "(555) 456-7890", company: "Blue Ridge Realty", status: "lead", industry: "Real Estate", lastContact: "3 days ago", avatar: "LC" },
  { id: 4, name: "James Wilson", email: "james@wilsonroofing.com", phone: "(555) 567-8901", company: "Wilson Roofing", status: "active", industry: "Construction", lastContact: "1 week ago", avatar: "JW" },
  { id: 5, name: "Emily Davis", email: "emily@freshcutsalon.com", phone: "(555) 678-9012", company: "Fresh Cut Salon", status: "lead", industry: "Beauty", lastContact: "2 days ago", avatar: "ED" },
  { id: 6, name: "Robert Kim", email: "robert@kimlaw.com", phone: "(555) 789-0123", company: "Kim & Associates", status: "active", industry: "Legal", lastContact: "4 hours ago", avatar: "RK" },
  { id: 7, name: "Amanda Foster", email: "amanda@greenthumb.com", phone: "(555) 890-1234", company: "Green Thumb Landscaping", status: "inactive", industry: "Landscaping", lastContact: "2 weeks ago", avatar: "AF" },
  { id: 8, name: "David Park", email: "david@parkautoshop.com", phone: "(555) 901-2345", company: "Park Auto", status: "lead", industry: "Automotive", lastContact: "1 day ago", avatar: "DP" },
  { id: 9, name: "Maria Gonzalez", email: "maria@casaflores.com", phone: "(555) 012-3456", company: "Casa Flores Restaurant", status: "active", industry: "Restaurant", lastContact: "5 hours ago", avatar: "MG" },
  { id: 10, name: "Chris Taylor", email: "chris@taylohvac.com", phone: "(555) 123-4567", company: "Taylor HVAC", status: "active", industry: "HVAC", lastContact: "Yesterday", avatar: "CT" },
  { id: 11, name: "Jennifer Adams", email: "jen@petalsbyjenn.com", phone: "(555) 234-5679", company: "Petals by Jenn", status: "lead", industry: "Florist", lastContact: "3 days ago", avatar: "JA" },
  { id: 12, name: "Tom Martinez", email: "tom@shieldpest.com", phone: "(555) 345-6780", company: "Shield Pest Control", status: "active", industry: "Pest Control", lastContact: "6 hours ago", avatar: "TM" },
];

export const DEALS: Deal[] = [
  { id: 1, title: "CRM Build — Meridian Plumbing", company: "Meridian Plumbing", value: 35000, stage: "proposal", contactId: 1 },
  { id: 2, title: "AI Chatbot — Sunset Dental", company: "Sunset Dental", value: 18000, stage: "qualified", contactId: 2 },
  { id: 3, title: "Website Redesign — Blue Ridge Realty", company: "Blue Ridge Realty", value: 22000, stage: "lead", contactId: 3 },
  { id: 4, title: "Mobile App — Wilson Roofing", company: "Wilson Roofing", value: 45000, stage: "closed", contactId: 4 },
  { id: 5, title: "Booking System — Fresh Cut Salon", company: "Fresh Cut Salon", value: 28000, stage: "lead", contactId: 5 },
  { id: 6, title: "Client Portal — Kim & Associates", company: "Kim & Associates", value: 32000, stage: "proposal", contactId: 6 },
  { id: 7, title: "CRM + Automation — Park Auto", company: "Park Auto", value: 40000, stage: "qualified", contactId: 8 },
  { id: 8, title: "Email Marketing — Casa Flores", company: "Casa Flores Restaurant", value: 12000, stage: "closed", contactId: 9 },
  { id: 9, title: "Dispatch System — Taylor HVAC", company: "Taylor HVAC", value: 38000, stage: "proposal", contactId: 10 },
  { id: 10, title: "E-commerce — Petals by Jenn", company: "Petals by Jenn", value: 20000, stage: "lead", contactId: 11 },
];

export const ACTIVITIES: Activity[] = [
  { id: 1, type: "call", contactName: "Sarah Johnson", description: "Discussed CRM requirements and timeline", time: "2 hours ago" },
  { id: 2, type: "email", contactName: "Robert Kim", description: "Sent proposal for client portal build", time: "4 hours ago" },
  { id: 3, type: "meeting", contactName: "Maria Gonzalez", description: "Demo of email marketing dashboard", time: "5 hours ago" },
  { id: 4, type: "note", contactName: "Tom Martinez", description: "Interested in route optimization module", time: "6 hours ago" },
  { id: 5, type: "email", contactName: "Mike Torres", description: "Follow-up on AI chatbot proposal", time: "Yesterday" },
  { id: 6, type: "call", contactName: "Chris Taylor", description: "Onboarding call — dispatch system kickoff", time: "Yesterday" },
  { id: 7, type: "note", contactName: "Lisa Chen", description: "Needs IDX integration for property search", time: "3 days ago" },
  { id: 8, type: "email", contactName: "Emily Davis", description: "Sent booking system feature overview", time: "2 days ago" },
];

export const PIPELINE_STAGES = [
  { id: "lead", label: "Lead", color: "bg-gray-100 text-gray-700" },
  { id: "qualified", label: "Qualified", color: "bg-blue-100 text-blue-700" },
  { id: "proposal", label: "Proposal", color: "bg-amber-100 text-amber-700" },
  { id: "closed", label: "Closed Won", color: "bg-green-100 text-green-700" },
] as const;
