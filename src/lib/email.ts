import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_EMAIL = "iOLab Digital <updates@updates.iolab.co>";

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  serviceInterest?: string;
  message: string;
  budgetRange?: string;
  currentTools?: string;
}) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: "hello@iolab.co",
    subject: `New Lead: ${data.name} — ${data.serviceInterest || "General Inquiry"}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.email}</td></tr>
        ${data.phone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.phone}</td></tr>` : ""}
        ${data.company ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.company}</td></tr>` : ""}
        ${data.industry ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Industry</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.industry}</td></tr>` : ""}
        ${data.serviceInterest ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.serviceInterest}</td></tr>` : ""}
        ${data.budgetRange ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Budget</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.budgetRange}</td></tr>` : ""}
        ${data.currentTools ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Current Tools</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.currentTools}</td></tr>` : ""}
      </table>
      <h3 style="margin-top:20px;">Message</h3>
      <p style="background:#f5f5f5;padding:16px;border-radius:8px;">${data.message}</p>
    `,
  });
}

export async function sendContactConfirmation(data: {
  name: string;
  email: string;
}) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Thanks for reaching out — iOLab Digital",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:sans-serif;">
        <h2 style="color:#7B2FF7;">Thanks for reaching out, ${data.name}!</h2>
        <p>We received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, here's what sets us apart:</p>
        <ul>
          <li>Custom apps built to YOUR specification — not generic SaaS</li>
          <li>AI-enhanced automation that works 24/7</li>
          <li>Enterprise-level quality at small business prices</li>
          <li>You OWN everything we build — no subscriptions</li>
        </ul>
        <p>Talk soon,<br/><strong>Rauf Tur</strong><br/>Founder, iOLab Digital<br/>(609) 200-1127</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(data: { email: string; name?: string }) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Welcome to the iOLab community",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:sans-serif;">
        <h2 style="color:#7B2FF7;">Welcome${data.name ? `, ${data.name}` : ""}!</h2>
        <p>You're now subscribed to AI & automation tips from iOLab Digital.</p>
        <p>We'll share insights on how small businesses are replacing expensive SaaS tools with custom solutions — and competing with enterprise companies like never before.</p>
        <p>— The iOLab Team</p>
      </div>
    `,
  });
}
