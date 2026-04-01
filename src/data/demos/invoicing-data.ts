export type Invoice = {
  id: string;
  customer: string;
  email: string;
  status: "draft" | "sent" | "paid" | "overdue";
  amount: number;
  paidAmount: number;
  issuedDate: string;
  dueDate: string;
  items: { description: string; qty: number; rate: number }[];
};

export type Customer = {
  name: string;
  email: string;
};

export const CUSTOMERS: Customer[] = [
  { name: "Meridian Plumbing", email: "sarah@meridian.com" },
  { name: "Sunset Dental", email: "mike@sunsetdental.com" },
  { name: "Blue Ridge Realty", email: "lisa@blueridge.com" },
  { name: "Wilson Roofing", email: "james@wilsonroofing.com" },
  { name: "Fresh Cut Salon", email: "emily@freshcut.com" },
  { name: "Kim & Associates", email: "robert@kimlaw.com" },
];

export const INVOICES: Invoice[] = [
  {
    id: "INV-001", customer: "Wilson Roofing", email: "james@wilsonroofing.com", status: "paid", amount: 45000, paidAmount: 45000, issuedDate: "Mar 1", dueDate: "Mar 31",
    items: [
      { description: "Custom Mobile App — Phase 1", qty: 1, rate: 25000 },
      { description: "API Integration (QuickBooks)", qty: 1, rate: 8000 },
      { description: "UI/UX Design", qty: 1, rate: 12000 },
    ],
  },
  {
    id: "INV-002", customer: "Meridian Plumbing", email: "sarah@meridian.com", status: "sent", amount: 35000, paidAmount: 0, issuedDate: "Mar 10", dueDate: "Apr 10",
    items: [
      { description: "Custom CRM Build", qty: 1, rate: 20000 },
      { description: "Dispatch Module", qty: 1, rate: 10000 },
      { description: "Training & Onboarding", qty: 1, rate: 5000 },
    ],
  },
  {
    id: "INV-003", customer: "Sunset Dental", email: "mike@sunsetdental.com", status: "overdue", amount: 18000, paidAmount: 9000, issuedDate: "Feb 15", dueDate: "Mar 15",
    items: [
      { description: "AI Chatbot Development", qty: 1, rate: 12000 },
      { description: "IVR Phone System Setup", qty: 1, rate: 6000 },
    ],
  },
  {
    id: "INV-004", customer: "Kim & Associates", email: "robert@kimlaw.com", status: "sent", amount: 32000, paidAmount: 0, issuedDate: "Mar 18", dueDate: "Apr 18",
    items: [
      { description: "Client Portal Development", qty: 1, rate: 18000 },
      { description: "Document Automation", qty: 1, rate: 8000 },
      { description: "Intake Form System", qty: 1, rate: 6000 },
    ],
  },
  {
    id: "INV-005", customer: "Fresh Cut Salon", email: "emily@freshcut.com", status: "draft", amount: 28000, paidAmount: 0, issuedDate: "Mar 25", dueDate: "Apr 25",
    items: [
      { description: "Branded Booking System", qty: 1, rate: 15000 },
      { description: "Loyalty & Rewards App", qty: 1, rate: 8000 },
      { description: "SMS Marketing Integration", qty: 1, rate: 5000 },
    ],
  },
  {
    id: "INV-006", customer: "Blue Ridge Realty", email: "lisa@blueridge.com", status: "paid", amount: 22000, paidAmount: 22000, issuedDate: "Feb 1", dueDate: "Mar 1",
    items: [
      { description: "Website Redesign", qty: 1, rate: 12000 },
      { description: "IDX Property Search Integration", qty: 1, rate: 7000 },
      { description: "SEO Optimization", qty: 1, rate: 3000 },
    ],
  },
  {
    id: "INV-007", customer: "Meridian Plumbing", email: "sarah@meridian.com", status: "paid", amount: 5000, paidAmount: 5000, issuedDate: "Jan 15", dueDate: "Feb 15",
    items: [
      { description: "Monthly Support Plan — January", qty: 1, rate: 3000 },
      { description: "Feature Update: Route Optimization", qty: 1, rate: 2000 },
    ],
  },
  {
    id: "INV-008", customer: "Wilson Roofing", email: "james@wilsonroofing.com", status: "sent", amount: 15000, paidAmount: 0, issuedDate: "Mar 20", dueDate: "Apr 20",
    items: [
      { description: "Custom Mobile App — Phase 2", qty: 1, rate: 12000 },
      { description: "Push Notification System", qty: 1, rate: 3000 },
    ],
  },
];
