import fs from "fs";
import path from "path";

type LeadData = {
  email: string;
  name?: string;
  businessName: string;
  demoType: string;
  industry: string;
};

type DripEmail = {
  from: string;
  subject: string;
  html: string;
};

const DEMO_LABELS: Record<string, string> = {
  crm: "CRM",
  "customer-support": "Customer Support",
  "project-management": "Project Management",
  "ai-chatbot": "AI Chatbot",
  invoicing: "Invoicing",
  booking: "Booking & Scheduling",
  "client-portal": "Client Portal",
  analytics: "Analytics Dashboard",
  loyalty: "Loyalty & Rewards",
  documents: "Document Automation",
};

const SAAS_ALTERNATIVES: Record<string, { name: string; cost: string }> = {
  crm: { name: "Salesforce", cost: "$300-500/mo" },
  "customer-support": { name: "Zendesk", cost: "$150-400/mo" },
  "project-management": { name: "Monday.com", cost: "$200-400/mo" },
  "ai-chatbot": { name: "Intercom", cost: "$250-500/mo" },
  invoicing: { name: "QuickBooks", cost: "$80-200/mo" },
  booking: { name: "Calendly/Acuity", cost: "$50-150/mo" },
  "client-portal": { name: "custom portals", cost: "$100-300/mo" },
  analytics: { name: "Databox/Klipfolio", cost: "$100-300/mo" },
  loyalty: { name: "LoyaltyLion/Smile.io", cost: "$150-400/mo" },
  documents: { name: "PandaDoc/DocuSign", cost: "$100-300/mo" },
};

const PRICING_RANGES: Record<string, string> = {
  crm: "$25,000 - $40,000",
  "customer-support": "$15,000 - $25,000",
  "project-management": "$20,000 - $35,000",
  "ai-chatbot": "$10,000 - $20,000",
  invoicing: "$12,000 - $22,000",
  booking: "$12,000 - $20,000",
  "client-portal": "$15,000 - $28,000",
  analytics: "$10,000 - $18,000",
  loyalty: "$15,000 - $25,000",
  documents: "$12,000 - $22,000",
};

const SUBJECTS: Record<number, string> = {
  1: "Here's what {businessName}'s custom {demoLabel} could look like",
  2: "The real cost of {saasName} vs custom",
  3: "How {industry} businesses are replacing SaaS",
  4: "3 features you didn't see in the demo",
  5: "{businessName} + AI = competitive advantage",
  6: "Quick question about {businessName}",
  7: "Last thing — your custom {demoLabel} estimate",
};

const TEMPLATE_FILES: Record<number, string> = {
  1: "email-01-immediate.html",
  2: "email-02-day2-cost-comparison.html",
  3: "email-03-day4-social-proof.html",
  4: "email-04-day7-hidden-features.html",
  5: "email-05-day9-ai-advantage.html",
  6: "email-06-day12-personal.html",
  7: "email-07-day14-final-estimate.html",
};

// Hours from lead capture for each email
export const DRIP_DELAYS_HOURS = [0, 48, 96, 168, 216, 288, 336];

const FROM_EMAIL = "iOLab Digital <updates@updates.iolab.co>";
const FROM_PERSONAL = "Rauf Tur <updates@updates.iolab.co>";

const TEMPLATES_DIR = path.join(process.cwd(), "src/lib/email-templates");

// Cache loaded templates in memory
const templateCache = new Map<number, string>();

function loadTemplate(emailNumber: number): string {
  if (templateCache.has(emailNumber)) {
    return templateCache.get(emailNumber)!;
  }

  const filename = TEMPLATE_FILES[emailNumber];
  if (!filename) return "";

  const filePath = path.join(TEMPLATES_DIR, filename);

  try {
    const html = fs.readFileSync(filePath, "utf-8");
    templateCache.set(emailNumber, html);
    return html;
  } catch {
    // Template file not found — return empty (will fall back to simple email)
    return "";
  }
}

function replaceVariables(
  template: string,
  vars: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    // Replace both {var} and {{var}} patterns
    result = result.replace(new RegExp(`\\{\\{?${key}\\}\\}?`, "g"), value);
  }
  return result;
}

export function generateDripEmail(lead: LeadData, emailNumber: number): DripEmail {
  const demoLabel = DEMO_LABELS[lead.demoType] || lead.demoType;
  const saas = SAAS_ALTERNATIVES[lead.demoType] || { name: "SaaS tools", cost: "$200-500/mo" };
  const pricing = PRICING_RANGES[lead.demoType] || "$15,000 - $35,000";
  const greeting = lead.name || "there";
  const biz = lead.businessName;

  const vars: Record<string, string> = {
    name: greeting,
    businessName: biz,
    demoLabel,
    saasName: saas.name,
    saasCost: saas.cost,
    industry: lead.industry,
    pricing,
    unsubscribe_url: "#", // Placeholder — Resend handles actual unsubscribe
  };

  // Build subject with variable replacement
  const subjectTemplate = SUBJECTS[emailNumber] || "Update from iOLab Digital";
  const subject = replaceVariables(subjectTemplate, vars);

  // Load HTML template
  let html = loadTemplate(emailNumber);

  if (html) {
    // Replace all variables in the HTML template
    html = replaceVariables(html, vars);
  } else {
    // Fallback: simple HTML if template file is missing
    html = buildFallbackEmail(lead, emailNumber, vars);
  }

  const from = emailNumber === 6 ? FROM_PERSONAL : FROM_EMAIL;

  return { from, subject, html };
}

// Fallback email builder (used only if HTML template files are missing)
function buildFallbackEmail(
  lead: LeadData,
  emailNumber: number,
  vars: Record<string, string>
): string {
  const wrap = (content: string) => `
    <div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333;">
      ${content}
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#999;">
        <p>iOLab Digital · Medford, NJ · (609) 200-1127</p>
        <p><a href="https://iolab.co" style="color:#7B2FF7;">iolab.co</a></p>
      </div>
    </div>
  `;

  const cta = (text: string, url: string) =>
    `<a href="${url}?utm_source=drip&utm_medium=email" style="display:inline-block;background:#7B2FF7;color:white;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;margin:16px 0;">${text}</a>`;

  switch (emailNumber) {
    case 1:
      return wrap(`<h2 style="color:#7B2FF7;">Hi ${vars.name}, thanks for trying the ${vars.demoLabel} demo!</h2><p>What you saw was a preview. Imagine it with your data, your workflow, your integrations.</p>${cta("Book a Free Strategy Call", "https://iolab.co/contact")}<p style="font-size:13px;color:#666;">— Rauf Tur, Founder</p>`);
    case 2:
      return wrap(`<h2 style="color:#7B2FF7;">The real cost of ${vars.saasName} vs custom</h2><p>${vars.saasName}: ${vars.saasCost} × 60 months. Custom: one-time build, you own it forever.</p>${cta("See the Cost Breakdown", "https://iolab.co/blog/how-much-does-custom-app-cost")}`);
    case 3:
      return wrap(`<h2 style="color:#7B2FF7;">Businesses like ${vars.businessName} are switching</h2><p>We built a custom platform for a luxury packaging company that replaced 4 SaaS tools. 60% faster response times.</p>${cta("See What We Build", "https://iolab.co/industries")}`);
    case 4:
      return wrap(`<h2 style="color:#7B2FF7;">3 features you didn't see</h2><p>AI Automation, Custom Integrations, and Mobile Apps — all built in from day one.</p>${cta("See AI Automation", "https://iolab.co/services/ai-automation")}`);
    case 5:
      return wrap(`<h2 style="color:#7B2FF7;">${vars.businessName} + AI = competitive advantage</h2><p>AI responds to leads in 60 seconds, drafts follow-ups, handles support 24/7.</p>${cta("Book a Free AI Audit", "https://iolab.co/contact")}`);
    case 6:
      return wrap(`<p>Hi ${vars.name},</p><p>What's the biggest pain point with your current tools? Hit reply — I read every email personally.</p><p>— Rauf<br/>Founder, iOLab Digital<br/>(609) 200-1127</p>`);
    case 7:
      return wrap(`<h2 style="color:#7B2FF7;">Your custom ${vars.demoLabel} estimate: ${vars.pricing}</h2><p>One-time investment. Includes design, development, AI, data migration, and 3 months support.</p>${cta("Book Your Strategy Call", "https://iolab.co/contact")}`);
    default:
      return wrap(`<p>Thanks for your interest in iOLab Digital.</p>`);
  }
}
