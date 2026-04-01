import { NextResponse } from "next/server";
import { db } from "@/db";
import { demoLeads, demoDripEmails } from "@/db/schema";
import { Resend } from "resend";
import { generateDripEmail, DRIP_DELAYS_HOURS } from "@/lib/drip-emails";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, name, email, demoType, brandData } = body;

    if (!url || !demoType) {
      return NextResponse.json(
        { error: "URL and demoType are required" },
        { status: 400 }
      );
    }

    // Store lead in database
    const [lead] = await db
      .insert(demoLeads)
      .values({
        websiteUrl: url,
        name: name || null,
        email: email || null,
        demoType,
        brandData: brandData || null,
      })
      .returning({ id: demoLeads.id });

    const businessName = brandData?.businessName || url;

    // Send notification email to iOLab
    const demoLabels: Record<string, string> = {
      crm: "CRM", "customer-support": "Customer Support",
      "project-management": "Project Management", "ai-chatbot": "AI Chatbot",
      invoicing: "Invoicing", booking: "Booking", "client-portal": "Client Portal",
      analytics: "Analytics", loyalty: "Loyalty", documents: "Documents",
    };
    const demoLabel = demoLabels[demoType] || demoType;

    try {
      await getResend().emails.send({
        from: "iOLab Digital <updates@updates.iolab.co>",
        to: "hello@iolab.co",
        subject: `🎯 New Demo Lead: ${businessName} — ${demoLabel} Demo`,
        html: `
          <div style="max-width:600px;margin:0 auto;font-family:sans-serif;">
            <h2 style="color:#7B2FF7;">New Demo Lead</h2>
            <table style="border-collapse:collapse;width:100%;">
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Website</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="${url}">${url}</a></td></tr>
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Demo</td><td style="padding:8px;border-bottom:1px solid #eee;">${demoLabel}</td></tr>
              ${name ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>` : ""}
              ${email ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>` : ""}
              ${brandData?.industry ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Industry</td><td style="padding:8px;border-bottom:1px solid #eee;">${brandData.industry}</td></tr>` : ""}
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Drip Campaign</td><td style="padding:8px;border-bottom:1px solid #eee;">${email ? "✅ 7-email sequence scheduled" : "❌ No email provided"}</td></tr>
            </table>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send lead notification:", emailErr);
    }

    // If prospect provided email, start the 7-email drip campaign
    if (email && lead) {
      const leadData = {
        email,
        name: name || undefined,
        businessName,
        demoType,
        industry: brandData?.industry || "business",
      };

      // Send Email 1 immediately
      try {
        const email1 = generateDripEmail(leadData, 1);
        await getResend().emails.send({
          from: email1.from,
          to: email,
          subject: email1.subject,
          html: email1.html,
        });
      } catch (err) {
        console.error("Failed to send drip email 1:", err);
      }

      // Schedule emails 1-7 in the database
      const now = new Date();
      const dripRows = DRIP_DELAYS_HOURS.map((delayHours, i) => ({
        leadId: lead.id,
        emailNumber: i + 1,
        scheduledFor: new Date(now.getTime() + delayHours * 60 * 60 * 1000),
        sentAt: i === 0 ? now : null, // Email 1 already sent
      }));

      try {
        await db.insert(demoDripEmails).values(dripRows);
      } catch (err) {
        console.error("Failed to schedule drip emails:", err);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
