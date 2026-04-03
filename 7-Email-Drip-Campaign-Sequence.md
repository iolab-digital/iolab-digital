# iOLab Digital — 7-Email Drip Campaign Sequence

## Overview

This is the complete 7-email automated drip sequence that fires when a prospect uses any interactive demo on iolab.co and provides their email. Each email is personalized with the prospect's **business name** (from brand extraction), the **demo they used**, their **industry**, and the **SaaS tool they'd be replacing**.

**Trigger:** Prospect enters their website URL + email in a demo gate
**Duration:** 14 days (emails sent on Day 0, 2, 4, 7, 9, 12, 14)
**Stop condition:** If prospect books a consultation, the sequence stops

---

## Dynamic Variables

These placeholders are replaced per-lead:

| Variable | Source | Example |
|----------|--------|---------|
| `{businessName}` | Brand extraction from their website | "Joe's Plumbing" |
| `{name}` | Name field (optional) | "Joe" |
| `{demoLabel}` | Which demo they used | "CRM", "Customer Support", "Invoicing" |
| `{saasName}` | The SaaS competitor for that demo type | "Salesforce", "Zendesk", "QuickBooks" |
| `{saasCost}` | Typical monthly cost of that SaaS | "$300-500/mo" |
| `{industry}` | Extracted from their website | "plumbing", "restaurant", "dental" |
| `{pricing}` | Custom build price range for that module | "$25,000 - $40,000" |

### SaaS Alternatives by Demo Type

| Demo | SaaS Alternative | Monthly Cost |
|------|-----------------|-------------|
| CRM | Salesforce | $300-500/mo |
| Customer Support | Zendesk | $150-400/mo |
| Project Management | Monday.com | $200-400/mo |
| AI Chatbot | Intercom | $250-500/mo |
| Invoicing | QuickBooks | $80-200/mo |
| Booking & Scheduling | Calendly/Acuity | $50-150/mo |
| Client Portal | Custom portals | $100-300/mo |
| Analytics Dashboard | Databox/Klipfolio | $100-300/mo |
| Loyalty & Rewards | LoyaltyLion/Smile.io | $150-400/mo |
| Document Automation | PandaDoc/DocuSign | $100-300/mo |

### Custom Build Pricing by Demo Type

| Demo | Build Price Range |
|------|------------------|
| CRM | $25,000 - $40,000 |
| Customer Support | $15,000 - $25,000 |
| Project Management | $20,000 - $35,000 |
| AI Chatbot | $10,000 - $20,000 |
| Invoicing | $12,000 - $22,000 |
| Booking & Scheduling | $12,000 - $20,000 |
| Client Portal | $15,000 - $28,000 |
| Analytics Dashboard | $10,000 - $18,000 |
| Loyalty & Rewards | $15,000 - $25,000 |
| Document Automation | $12,000 - $22,000 |

---

## Email 1 — Immediate (Within 5 Minutes)

**From:** iOLab Digital <updates@updates.iolab.co>
**Subject:** Here's what {businessName}'s custom {demoLabel} could look like

**Body:**

> **{name}, thanks for trying the {demoLabel} demo!**
>
> What you saw was a preview with sample data. Now imagine the same interface with:
>
> - **Your actual data** — contacts, deals, and history from your business
> - **Your workflow** — stages, fields, and automations built for how you actually work
> - **Your integrations** — connected to the tools you already use (Stripe, QuickBooks, Google, etc.)
>
> That's what we build. Custom. Branded. Yours forever.
>
> **[Book a Free 15-Min Strategy Call →](https://iolab.co/contact)**
>
> — Rauf Tur, Founder, iOLab Digital

**Goal:** Immediate follow-up while the demo is fresh. Plant the seed that what they saw is just a preview of what's possible.

---

## Email 2 — Day 2

**From:** iOLab Digital <updates@updates.iolab.co>
**Subject:** The real cost of {saasName} vs custom

**Body:**

> **{name}, let's talk about what {saasName} really costs.**
>
> You're probably paying **{saasCost}** for {saasName}. That sounds manageable — until you do the 5-year math:
>
> | Option | Cost |
> |--------|------|
> | **{saasName}:** | {saasCost} × 60 months = **$12,000 - $30,000+** |
> | **Custom {demoLabel}:** | One-time build + $200-500/mo hosting = **you own it forever** |
>
> Custom software pays for itself. And you get exactly the features you need — not 80% bloat you'll never touch.
>
> **[See the Full Cost Breakdown →](https://iolab.co/blog/how-much-does-custom-app-cost)**

**Goal:** Hit them with the math. Make the cost of staying on SaaS feel painful.

---

## Email 3 — Day 4

**From:** iOLab Digital <updates@updates.iolab.co>
**Subject:** How {industry} businesses are replacing SaaS

**Body:**

> **Businesses like {businessName} are making the switch.**
>
> {name}, one of our clients — a luxury packaging company — was juggling 4 separate SaaS tools for customer support, project management, and order tracking. We built them one custom platform that replaced everything.
>
> The result? **60% faster response times**, real-time order visibility for their clients, and they're saving more annually than the platform cost to build.
>
> We build custom tools specifically for {industry} businesses. Here's what that looks like:
>
> **[See What We Build for {industry} →](https://iolab.co/industries)**

**Goal:** Social proof. Show them that businesses like theirs have already made the switch successfully.

---

## Email 4 — Day 7

**From:** iOLab Digital <updates@updates.iolab.co>
**Subject:** 3 features you didn't see in the demo

**Body:**

> **{name}, the demo was just the surface.**
>
> The {demoLabel} demo shows the core features. But the real power comes from what you didn't see:
>
> 1. **AI Automation** — AI drafts responses, qualifies leads, and handles routine work 24/7. [Try the AI Chatbot demo →](https://iolab.co/demos/ai-chatbot)
> 2. **Custom Integrations** — Connect with Stripe, QuickBooks, Twilio, Google, and any tool you already use
> 3. **Mobile App** — Everything works on iOS and Android, with push notifications and offline access
>
> These aren't add-ons that cost extra — they're built into the platform from day one.
>
> **[See AI Automation in Action →](https://iolab.co/services/ai-automation)**

**Goal:** Expand their vision beyond what they saw. Cross-sell AI and mobile capabilities.

---

## Email 5 — Day 9

**From:** iOLab Digital <updates@updates.iolab.co>
**Subject:** {businessName} + AI = competitive advantage

**Body:**

> **{name}, here's the opportunity most {industry} businesses are missing.**
>
> AI isn't just for big tech companies anymore. Small businesses that adopt AI now will dominate their markets — and most of your competitors haven't started yet.
>
> Here's what AI could do for {businessName}:
>
> - Respond to leads in under 60 seconds — even at 10pm on a Saturday
> - Draft personalized follow-ups that sound like you wrote them
> - Handle routine customer questions 24/7 through a chatbot
> - Predict which leads are most likely to close and prioritize them
>
> We build AI directly into your custom tools — no separate subscription, no third-party platform.
>
> **[Book a Free AI Audit →](https://iolab.co/contact)**

**Goal:** Position AI as the differentiator. Create urgency — competitors haven't moved yet, but they will.

---

## Email 6 — Day 12

**From:** Rauf Tur <updates@updates.iolab.co> *(personal, not branded)*
**Subject:** Quick question about {businessName}

**Body:**

> {name},
>
> I noticed you checked out our {demoLabel} demo for {businessName}. I'm curious — what's the biggest pain point with your current tools?
>
> No pitch, no pressure. I genuinely want to know what's not working for you. Sometimes a quick reply leads to a conversation that saves a business thousands.
>
> Hit reply and tell me — I read every email personally.
>
> — Rauf
> Founder, iOLab Digital
> (609) 200-1127

**Goal:** Break the pattern. This is a short, personal email from a real person — not a marketing blast. The goal is to start a conversation. The "from" name is just "Rauf Tur" (not "iOLab Digital") to feel personal.

---

## Email 7 — Day 14 (Final)

**From:** iOLab Digital <updates@updates.iolab.co>
**Subject:** Last thing — your custom {demoLabel} estimate

**Body:**

> **{name}, I put together a rough estimate for {businessName}.**
>
> Based on the {demoLabel} demo you tried, a custom version for a business like yours would typically cost:
>
> ## {pricing}
> *One-time investment — you own it forever*
>
> This includes:
>
> - Custom UI/UX design in your brand
> - Full-stack development
> - AI automation integration
> - Data migration from your current tools
> - 3 months of post-launch support
> - Team training and documentation
>
> We take on 2-3 new projects per quarter. If this sounds like something you want to explore, let's talk this week.
>
> **[Book Your Free Strategy Call →](https://iolab.co/contact)**
>
> *This is the last email in this sequence. If you'd like to hear from us occasionally about AI and automation tips, you're welcome to stay subscribed. Otherwise, no hard feelings.*

**Goal:** The closer. Give them a concrete number, list everything that's included, create urgency with the "2-3 projects per quarter" scarcity, and provide a clear final CTA. The unsubscribe note shows respect and builds trust.

---

## Technical Implementation

### Schedule (Hours from Lead Capture)

| Email | Delay | Day |
|-------|-------|-----|
| 1 | 0 hours (immediate) | Day 0 |
| 2 | 48 hours | Day 2 |
| 3 | 96 hours | Day 4 |
| 4 | 168 hours | Day 7 |
| 5 | 216 hours | Day 9 |
| 6 | 288 hours | Day 12 |
| 7 | 336 hours | Day 14 |

### Database Table: `demo_drip_emails`

| Column | Type | Description |
|--------|------|-------------|
| id | serial PK | |
| lead_id | integer | FK to demo_leads |
| email_number | integer | 1-7 |
| scheduled_for | timestamp | When to send |
| sent_at | timestamp | When actually sent (null if pending) |
| stopped | boolean | True if campaign was stopped |
| created_at | timestamp | |

### How It Works

1. **On lead capture** (`/api/demos/lead`): If email provided, insert 7 rows into `demo_drip_emails` with calculated `scheduled_for` timestamps
2. **Email 1 sent immediately** in the lead capture handler
3. **Cron job runs hourly** (`/api/demos/drip`): Finds unsent emails where `scheduled_for <= NOW()` and `stopped = false`, sends them via Resend, marks as `sent`
4. **Stop mechanism**: If lead books a consultation, all remaining unsent emails are marked `stopped = true`

### Email Footer (All Emails)

> iOLab Digital · Medford, NJ · (609) 200-1127
> [iolab.co](https://iolab.co) · [hello@iolab.co](mailto:hello@iolab.co)

### UTM Tracking

All CTA links include `?utm_source=drip&utm_medium=email` for GA4 attribution.

---

## Campaign Monitoring

Available in the admin dashboard at `/admin/campaigns`:

- Per-email stats: sent count, pending count, stopped count
- Campaign-level view: how many leads are at each email stage
- Email preview: see rendered HTML for each of the 7 emails
- Active/completed/stopped campaign counts

---

*Built by iOLab Digital — iolab.co*
