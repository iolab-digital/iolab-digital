export type Ticket = {
  id: number;
  subject: string;
  customer: string;
  email: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  slaMinutes: number;
  messages: { from: "customer" | "agent"; text: string; time: string }[];
  aiDraft?: string;
};

export const TICKETS: Ticket[] = [
  {
    id: 1001, subject: "Can't log into my account", customer: "Sarah Johnson", email: "sarah@meridian.com", status: "open", priority: "high", createdAt: "10 min ago", slaMinutes: 45,
    messages: [
      { from: "customer", text: "I've been trying to log in for the past 30 minutes and keep getting an 'invalid credentials' error. I haven't changed my password. Can you help?", time: "10 min ago" },
    ],
    aiDraft: "Hi Sarah, I'm sorry you're having trouble logging in. I can see your account is active and there are no locks on it. Let me reset your password — you'll receive an email at sarah@meridian.com with a secure link to set a new one. If you don't see it within 5 minutes, please check your spam folder. Let me know if you need anything else!",
  },
  {
    id: 1002, subject: "Billing discrepancy on invoice #4521", customer: "Mike Torres", email: "mike@sunsetdental.com", status: "in_progress", priority: "medium", createdAt: "2 hours ago", slaMinutes: 120,
    messages: [
      { from: "customer", text: "Invoice #4521 shows a charge of $450 but we agreed on $350 for this month's service. Can you check?", time: "2 hours ago" },
      { from: "agent", text: "Hi Mike, thanks for flagging this. Let me pull up your account and check the billing details. I'll get back to you shortly.", time: "1 hour ago" },
    ],
    aiDraft: "Hi Mike, I've reviewed invoice #4521 and you're correct — the charge should be $350 per our service agreement. I've issued a corrected invoice and the $100 difference will be credited to your account within 24 hours. The corrected invoice is attached. Sorry for the inconvenience!",
  },
  {
    id: 1003, subject: "Feature request: export to PDF", customer: "Lisa Chen", email: "lisa@blueridge.com", status: "open", priority: "low", createdAt: "5 hours ago", slaMinutes: 480,
    messages: [
      { from: "customer", text: "It would be really helpful to export reports to PDF. Right now I have to screenshot everything for my team meetings. Is this something you're planning?", time: "5 hours ago" },
    ],
    aiDraft: "Hi Lisa, great suggestion! PDF export is actually on our roadmap for next quarter. I've added your vote to the feature request, which helps us prioritize. In the meantime, you can use your browser's Print → Save as PDF option as a workaround. I'll notify you as soon as the feature goes live!",
  },
  {
    id: 1004, subject: "App crashes when uploading photos", customer: "James Wilson", email: "james@wilsonroofing.com", status: "open", priority: "urgent", createdAt: "25 min ago", slaMinutes: 30,
    messages: [
      { from: "customer", text: "The app keeps crashing every time I try to upload job site photos. This is happening on both my phone and my foreman's phone. We need this for our inspection today!", time: "25 min ago" },
    ],
    aiDraft: "Hi James, I understand this is urgent with your inspection today. Our team has identified an issue with photo uploads affecting some Android devices after the latest update. A fix is being deployed right now and should be live within 30 minutes. In the meantime, you can email photos to uploads@app.com and they'll be attached to the job automatically. I'll follow up once the fix is confirmed.",
  },
  {
    id: 1005, subject: "How do I add a new team member?", customer: "Emily Davis", email: "emily@freshcut.com", status: "resolved", priority: "low", createdAt: "1 day ago", slaMinutes: 480,
    messages: [
      { from: "customer", text: "I just hired a new stylist and need to add her to the system. Where do I do that?", time: "1 day ago" },
      { from: "agent", text: "Hi Emily! Go to Settings → Team → Add Member. Enter her name and email, choose the 'Stylist' role, and she'll get an invitation to set up her account. Let me know if you run into any issues!", time: "23 hours ago" },
      { from: "customer", text: "Found it, thanks! That was easy.", time: "22 hours ago" },
    ],
  },
  {
    id: 1006, subject: "Integration with QuickBooks not syncing", customer: "Robert Kim", email: "robert@kimlaw.com", status: "in_progress", priority: "high", createdAt: "3 hours ago", slaMinutes: 60,
    messages: [
      { from: "customer", text: "Our QuickBooks integration stopped syncing invoices yesterday. We have month-end close this week and need this fixed ASAP.", time: "3 hours ago" },
      { from: "agent", text: "Hi Robert, I see the sync error in our logs. It looks like your QuickBooks OAuth token expired. I'm regenerating the connection now.", time: "2 hours ago" },
    ],
    aiDraft: "Hi Robert, good news — I've re-established the QuickBooks connection and triggered a full sync. All invoices from the past 48 hours are now syncing and should appear in QuickBooks within the next 15 minutes. I've also set up an alert so we'll catch any token expirations before they cause a sync failure in the future. You should be all set for month-end!",
  },
];
