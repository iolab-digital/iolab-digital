export type Template = {
  id: string;
  name: string;
  category: string;
  fields: string[];
};

export type GeneratedDoc = {
  id: number;
  name: string;
  template: string;
  client: string;
  status: "draft" | "sent" | "signed";
  date: string;
};

export type Client = {
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
};

export const TEMPLATES: Template[] = [
  { id: "proposal", name: "Project Proposal", category: "Sales", fields: ["clientName", "projectScope", "timeline", "investment", "deliverables"] },
  { id: "contract", name: "Service Agreement", category: "Legal", fields: ["clientName", "serviceDescription", "term", "payment", "startDate"] },
  { id: "estimate", name: "Project Estimate", category: "Sales", fields: ["clientName", "lineItems", "subtotal", "tax", "total"] },
  { id: "demand", name: "Demand Letter", category: "Legal", fields: ["clientName", "claimAmount", "incidentDate", "description", "deadline"] },
  { id: "invoice", name: "Invoice", category: "Billing", fields: ["clientName", "lineItems", "dueDate", "paymentTerms", "total"] },
];

export const CLIENTS: Client[] = [
  { name: "Sarah Johnson", email: "sarah@meridianplumbing.com", company: "Meridian Plumbing", phone: "(555) 234-5678", address: "123 Main St, Medford, NJ 08055" },
  { name: "Mike Torres", email: "mike@sunsetdental.com", company: "Sunset Dental", phone: "(555) 345-6789", address: "456 Oak Ave, Cherry Hill, NJ 08034" },
  { name: "Robert Kim", email: "robert@kimlaw.com", company: "Kim & Associates", phone: "(555) 789-0123", address: "789 Elm Blvd, Princeton, NJ 08540" },
];

export const GENERATED_DOCS: GeneratedDoc[] = [
  { id: 1, name: "Proposal — Meridian Plumbing CRM", template: "Project Proposal", client: "Meridian Plumbing", status: "signed", date: "Mar 15" },
  { id: 2, name: "Service Agreement — Sunset Dental", template: "Service Agreement", client: "Sunset Dental", status: "sent", date: "Mar 20" },
  { id: 3, name: "Estimate — Kim & Associates Portal", template: "Project Estimate", client: "Kim & Associates", status: "draft", date: "Mar 25" },
  { id: 4, name: "Invoice #2025-008 — Meridian Plumbing", template: "Invoice", client: "Meridian Plumbing", status: "signed", date: "Mar 10" },
  { id: 5, name: "Proposal — Sunset Dental AI Chatbot", template: "Project Proposal", client: "Sunset Dental", status: "sent", date: "Mar 22" },
  { id: 6, name: "Service Agreement — Kim & Associates", template: "Service Agreement", client: "Kim & Associates", status: "draft", date: "Mar 28" },
];

export const SAMPLE_PROPOSAL = {
  title: "Project Proposal",
  sections: [
    { label: "Prepared For", value: "{clientName}", editable: true },
    { label: "Company", value: "{company}", editable: true },
    { label: "Date", value: "March 28, 2026", editable: false },
    { label: "Project", value: "Custom CRM Platform", editable: true },
    { label: "Scope", value: "Design, development, and deployment of a custom CRM system with contact management, deal pipeline, AI automation, and reporting dashboard.", editable: true },
    { label: "Timeline", value: "4 months (April — July 2026)", editable: true },
    { label: "Investment", value: "$35,000", editable: true },
    { label: "Payment Schedule", value: "30% deposit, 30% at midpoint, 30% at delivery, 10% after 30 days", editable: false },
    { label: "Includes", value: "UI/UX design, full-stack development, AI integration, data migration, 3 months post-launch support, team training", editable: false },
  ],
};
