import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/db";
import { demoLeads } from "@/db/schema";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

type EscalationRequest = {
  name: string;
  email: string;
  messages: { role: "user" | "assistant"; content: string }[];
  page: string;
};

export async function POST(request: Request) {
  try {
    const { name, email, messages, page } = (await request.json()) as EscalationRequest;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Store as lead
    try {
      await db.insert(demoLeads).values({
        websiteUrl: page || "live-chat-escalation",
        name: name || null,
        email,
        demoType: "live-chat-escalation",
        brandData: {
          businessName: name || "Chat Escalation",
          primaryColor: "#7B2FF7",
          accentColor: "#FF6B35",
          logoUrl: null,
          fontStyle: "sans-serif",
          industry: "business",
        },
      });
    } catch {
      // Silent
    }

    // Format conversation transcript
    const transcript = messages
      .map((m) => {
        const sender = m.role === "user" ? `<strong>${name || "Visitor"}</strong>` : "<strong>AI Assistant</strong>";
        return `<div style="margin-bottom:12px;padding:8px 12px;border-radius:8px;${
          m.role === "user"
            ? "background:#7B2FF7;color:white;"
            : "background:#f5f5f5;color:#333;"
        }"><div style="font-size:11px;opacity:0.7;margin-bottom:4px;">${sender}</div>${m.content.replace(/\n/g, "<br/>")}</div>`;
      })
      .join("");

    // Send email to Rauf
    try {
      await getResend().emails.send({
        from: "iOLab Digital <updates@updates.iolab.co>",
        to: "hello@iolab.co",
        replyTo: email,
        subject: `💬 Chat Escalation: ${name || "Website Visitor"} wants to talk`,
        html: `
          <div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            <h2 style="color:#7B2FF7;margin-bottom:4px;">Chat Escalation</h2>
            <p style="color:#666;margin-top:0;">A visitor requested to speak with you directly.</p>

            <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
              <tr><td style="padding:6px 0;font-weight:bold;color:#333;width:80px;">Name</td><td style="padding:6px 0;color:#555;">${name || "Not provided"}</td></tr>
              <tr><td style="padding:6px 0;font-weight:bold;color:#333;">Email</td><td style="padding:6px 0;color:#555;"><a href="mailto:${email}" style="color:#7B2FF7;">${email}</a></td></tr>
              <tr><td style="padding:6px 0;font-weight:bold;color:#333;">Page</td><td style="padding:6px 0;color:#555;">${page || "Unknown"}</td></tr>
              <tr><td style="padding:6px 0;font-weight:bold;color:#333;">Messages</td><td style="padding:6px 0;color:#555;">${messages.length} total</td></tr>
            </table>

            <h3 style="color:#333;border-bottom:1px solid #eee;padding-bottom:8px;">Full Conversation</h3>
            <div style="margin:16px 0;">${transcript}</div>

            <div style="margin-top:24px;padding:16px;background:#f8f5ff;border-radius:8px;border:1px solid #e8dff5;">
              <p style="margin:0;font-size:14px;color:#333;"><strong>Reply directly to this email</strong> to respond to ${name || "the visitor"} at ${email}.</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send escalation email:", emailErr);
    }

    // Send confirmation to the visitor
    try {
      await getResend().emails.send({
        from: "iOLab Digital <updates@updates.iolab.co>",
        to: email,
        subject: "Rauf from iOLab will follow up shortly",
        html: `
          <div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
            <h2 style="color:#7B2FF7;">Thanks for reaching out${name ? `, ${name}` : ""}!</h2>
            <p>I've received your conversation and will follow up within a few hours with a personalized response.</p>
            <p>In the meantime, you might find these helpful:</p>
            <ul>
              <li><a href="https://iolab.co/demos" style="color:#7B2FF7;">Try our interactive demos</a></li>
              <li><a href="https://iolab.co/tools/saas-calculator" style="color:#7B2FF7;">Calculate your SaaS costs</a></li>
              <li><a href="https://iolab.co/portfolio" style="color:#7B2FF7;">See our portfolio</a></li>
            </ul>
            <p>Talk soon,<br/><strong>Rauf Tur</strong><br/>Founder, iOLab Digital<br/>(609) 200-1127</p>
          </div>
        `,
      });
    } catch {
      // Silent
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Escalation error:", error);
    return NextResponse.json({ error: "Escalation failed" }, { status: 500 });
  }
}
