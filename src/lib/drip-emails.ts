type LeadData = {
  email: string;
  name?: string;
  businessName: string;
  demoType: string;
  industry: string;
};

type DripEmail = {
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

// Hours from lead capture for each email
export const DRIP_DELAYS_HOURS = [0, 48, 96, 168, 216, 288, 336];

const BASE_URL = "https://iolab.co";
const FROM_EMAIL = "iOLab Digital <updates@updates.iolab.co>";

function wrap(content: string): string {
  return `
    <div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333;">
      ${content}
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#999;">
        <p>iOLab Digital · Medford, NJ · (609) 200-1127</p>
        <p><a href="${BASE_URL}" style="color:#7B2FF7;">iolab.co</a> · <a href="mailto:hello@iolab.co" style="color:#7B2FF7;">hello@iolab.co</a></p>
      </div>
    </div>
  `;
}

function cta(text: string, url: string): string {
  return `<a href="${url}?utm_source=drip&utm_medium=email" style="display:inline-block;background:#7B2FF7;color:white;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;margin:16px 0;">${text}</a>`;
}

export function generateDripEmail(lead: LeadData, emailNumber: number): DripEmail & { from: string } {
  const demoLabel = DEMO_LABELS[lead.demoType] || lead.demoType;
  const saas = SAAS_ALTERNATIVES[lead.demoType] || { name: "SaaS tools", cost: "$200-500/mo" };
  const pricing = PRICING_RANGES[lead.demoType] || "$15,000 - $35,000";
  const greeting = lead.name ? `Hi ${lead.name}` : "Hi there";
  const biz = lead.businessName;

  switch (emailNumber) {
    case 1:
      return {
        from: FROM_EMAIL,
        subject: `Here's what ${biz}'s custom ${demoLabel} could look like`,
        html: wrap(`
          <h2 style="color:#7B2FF7;">${greeting}, thanks for trying the ${demoLabel} demo!</h2>
          <p>What you saw was a preview with sample data. Now imagine the same interface with:</p>
          <ul>
            <li><strong>Your actual data</strong> — contacts, deals, and history from your business</li>
            <li><strong>Your workflow</strong> — stages, fields, and automations built for how you actually work</li>
            <li><strong>Your integrations</strong> — connected to the tools you already use (Stripe, QuickBooks, Google, etc.)</li>
          </ul>
          <p>That's what we build. Custom. Branded. Yours forever.</p>
          ${cta("Book a Free 15-Min Strategy Call", `${BASE_URL}/contact`)}
          <p style="font-size:13px;color:#666;">— Rauf Tur, Founder, iOLab Digital</p>
        `),
      };

    case 2:
      return {
        from: FROM_EMAIL,
        subject: `The real cost of ${saas.name} vs custom`,
        html: wrap(`
          <h2 style="color:#7B2FF7;">${greeting}, let's talk about what ${saas.name} really costs.</h2>
          <p>You're probably paying <strong>${saas.cost}</strong> for ${saas.name}. That sounds manageable — until you do the 5-year math:</p>
          <div style="background:#f5f5f5;padding:16px;border-radius:8px;margin:16px 0;">
            <p style="margin:4px 0;"><strong>${saas.name}:</strong> ${saas.cost} × 60 months = <span style="color:#dc2626;">$12,000 - $30,000+</span></p>
            <p style="margin:4px 0;"><strong>Custom ${demoLabel}:</strong> One-time build + $200-500/mo hosting = <span style="color:#16a34a;">you own it forever</span></p>
          </div>
          <p>Custom software pays for itself. And you get exactly the features you need — not 80% bloat you'll never touch.</p>
          ${cta("See the Full Cost Breakdown", `${BASE_URL}/blog/how-much-does-custom-app-cost`)}
        `),
      };

    case 3:
      return {
        from: FROM_EMAIL,
        subject: `How ${lead.industry} businesses are replacing SaaS`,
        html: wrap(`
          <h2 style="color:#7B2FF7;">Businesses like ${biz} are making the switch.</h2>
          <p>${greeting}, one of our clients — a luxury packaging company — was juggling 4 separate SaaS tools for customer support, project management, and order tracking. We built them one custom platform that replaced everything.</p>
          <p>The result? <strong>60% faster response times</strong>, real-time order visibility for their clients, and they're saving more annually than the platform cost to build.</p>
          <p>We build custom tools specifically for ${lead.industry} businesses. Here's what that looks like:</p>
          ${cta(`See What We Build for ${lead.industry}`, `${BASE_URL}/industries`)}
        `),
      };

    case 4:
      return {
        from: FROM_EMAIL,
        subject: "3 features you didn't see in the demo",
        html: wrap(`
          <h2 style="color:#7B2FF7;">${greeting}, the demo was just the surface.</h2>
          <p>The ${demoLabel} demo shows the core features. But the real power comes from what you didn't see:</p>
          <ol>
            <li><strong>AI Automation</strong> — AI drafts responses, qualifies leads, and handles routine work 24/7. <a href="${BASE_URL}/demos/ai-chatbot" style="color:#7B2FF7;">Try the AI Chatbot demo</a></li>
            <li><strong>Custom Integrations</strong> — Connect with Stripe, QuickBooks, Twilio, Google, and any tool you already use</li>
            <li><strong>Mobile App</strong> — Everything works on iOS and Android, with push notifications and offline access</li>
          </ol>
          <p>These aren't add-ons that cost extra — they're built into the platform from day one.</p>
          ${cta("See AI Automation in Action", `${BASE_URL}/services/ai-automation`)}
        `),
      };

    case 5:
      return {
        from: FROM_EMAIL,
        subject: `${biz} + AI = competitive advantage`,
        html: wrap(`
          <h2 style="color:#7B2FF7;">${greeting}, here's the opportunity most ${lead.industry} businesses are missing.</h2>
          <p>AI isn't just for big tech companies anymore. Small businesses that adopt AI now will dominate their markets — and most of your competitors haven't started yet.</p>
          <p>Here's what AI could do for ${biz}:</p>
          <ul>
            <li>Respond to leads in under 60 seconds — even at 10pm on a Saturday</li>
            <li>Draft personalized follow-ups that sound like you wrote them</li>
            <li>Handle routine customer questions 24/7 through a chatbot</li>
            <li>Predict which leads are most likely to close and prioritize them</li>
          </ul>
          <p>We build AI directly into your custom tools — no separate subscription, no third-party platform.</p>
          ${cta("Book a Free AI Audit", `${BASE_URL}/contact`)}
        `),
      };

    case 6:
      return {
        from: "Rauf Tur <updates@updates.iolab.co>",
        subject: `Quick question about ${biz}`,
        html: wrap(`
          <p>${greeting},</p>
          <p>I noticed you checked out our ${demoLabel} demo for ${biz}. I'm curious — what's the biggest pain point with your current tools?</p>
          <p>No pitch, no pressure. I genuinely want to know what's not working for you. Sometimes a quick reply leads to a conversation that saves a business thousands.</p>
          <p>Hit reply and tell me — I read every email personally.</p>
          <p>— Rauf<br/>Founder, iOLab Digital<br/>(609) 200-1127</p>
        `),
      };

    case 7:
      return {
        from: FROM_EMAIL,
        subject: `Last thing — your custom ${demoLabel} estimate`,
        html: wrap(`
          <h2 style="color:#7B2FF7;">${greeting}, I put together a rough estimate for ${biz}.</h2>
          <p>Based on the ${demoLabel} demo you tried, a custom version for a business like yours would typically cost:</p>
          <div style="background:#7B2FF7;color:white;padding:20px;border-radius:12px;text-align:center;margin:16px 0;">
            <div style="font-size:28px;font-weight:bold;">${pricing}</div>
            <div style="font-size:13px;opacity:0.8;margin-top:4px;">One-time investment — you own it forever</div>
          </div>
          <p>This includes:</p>
          <ul>
            <li>Custom UI/UX design in your brand</li>
            <li>Full-stack development</li>
            <li>AI automation integration</li>
            <li>Data migration from your current tools</li>
            <li>3 months of post-launch support</li>
            <li>Team training and documentation</li>
          </ul>
          <p>We take on 2-3 new projects per quarter. If this sounds like something you want to explore, let's talk this week.</p>
          ${cta("Book Your Free Strategy Call", `${BASE_URL}/contact`)}
          <p style="font-size:12px;color:#999;margin-top:24px;">This is the last email in this sequence. If you'd like to hear from us occasionally about AI and automation tips, you're welcome to stay subscribed. Otherwise, no hard feelings.</p>
        `),
      };

    default:
      return {
        from: FROM_EMAIL,
        subject: `Update from iOLab Digital`,
        html: wrap(`<p>Thanks for your interest in iOLab Digital.</p>`),
      };
  }
}
