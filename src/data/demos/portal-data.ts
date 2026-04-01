export type Milestone = {
  id: number;
  title: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  description: string;
};

export type Document = {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "signed" | "pending" | "uploaded";
};

export type Message = {
  id: number;
  from: "client" | "team";
  sender: string;
  text: string;
  time: string;
};

export type Invoice = {
  id: string;
  amount: number;
  status: "paid" | "pending";
  date: string;
  description: string;
};

export const PROJECT = {
  name: "Custom CRM Platform",
  status: "In Development",
  progress: 62,
  startDate: "Jan 15, 2026",
  estimatedCompletion: "May 30, 2026",
};

export const MILESTONES: Milestone[] = [
  { id: 1, title: "Discovery & Planning", date: "Jan 15 - Jan 30", status: "completed", description: "Requirements gathering, workflow mapping, and technical architecture" },
  { id: 2, title: "UI/UX Design", date: "Feb 1 - Feb 21", status: "completed", description: "Wireframes, mockups, and design system — approved by your team" },
  { id: 3, title: "Core Development", date: "Feb 24 - Apr 4", status: "current", description: "Building the main modules: contacts, pipeline, and dashboard" },
  { id: 4, title: "AI Integration", date: "Apr 7 - Apr 25", status: "upcoming", description: "Adding AI automation, chatbot, and smart notifications" },
  { id: 5, title: "Testing & QA", date: "Apr 28 - May 16", status: "upcoming", description: "End-to-end testing, performance optimization, and bug fixes" },
  { id: 6, title: "Launch & Training", date: "May 19 - May 30", status: "upcoming", description: "Deployment, team training, and handoff with support plan" },
];

export const DOCUMENTS: Document[] = [
  { id: 1, name: "Project Proposal.pdf", type: "PDF", size: "2.4 MB", uploadedAt: "Jan 12", status: "signed" },
  { id: 2, name: "Design Mockups v2.fig", type: "Figma", size: "18.7 MB", uploadedAt: "Feb 18", status: "uploaded" },
  { id: 3, name: "Service Agreement.pdf", type: "PDF", size: "1.1 MB", uploadedAt: "Jan 14", status: "signed" },
  { id: 4, name: "API Specifications.pdf", type: "PDF", size: "3.2 MB", uploadedAt: "Mar 5", status: "uploaded" },
];

export const MESSAGES: Message[] = [
  { id: 1, from: "team", sender: "Rauf Tur", text: "Hey! Just pushed the latest update — the contact list and pipeline are live on staging. Take a look when you get a chance and let me know your thoughts.", time: "2 hours ago" },
  { id: 2, from: "client", sender: "You", text: "Looks great! The pipeline drag-and-drop is smooth. Can we add a 'Pending Review' stage between Proposal and Closed?", time: "1 hour ago" },
  { id: 3, from: "team", sender: "Rauf Tur", text: "Absolutely — I'll add that stage in today's sprint. Should be on staging by tomorrow morning. Anything else?", time: "45 min ago" },
  { id: 4, from: "client", sender: "You", text: "That's it for now. The dashboard is looking really clean. Excited to see the AI features next month!", time: "30 min ago" },
  { id: 5, from: "team", sender: "Rauf Tur", text: "Same here! The AI draft feature alone is going to save your team hours every week. I'll send a preview next week. 🚀", time: "15 min ago" },
];

export const INVOICES: Invoice[] = [
  { id: "INV-2025-001", amount: 12000, status: "paid", date: "Jan 15", description: "Phase 1: Discovery & Planning (30% deposit)" },
  { id: "INV-2025-002", amount: 12000, status: "paid", date: "Feb 28", description: "Phase 2: Design Completion (30% milestone)" },
  { id: "INV-2025-003", amount: 12000, status: "pending", date: "Apr 4", description: "Phase 3: Core Development (30% milestone)" },
  { id: "INV-2025-004", amount: 4000, status: "pending", date: "May 30", description: "Phase 4: Launch & Handoff (10% final)" },
];
