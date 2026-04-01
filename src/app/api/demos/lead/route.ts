import { NextResponse } from "next/server";
import { db } from "@/db";
import { demoLeads } from "@/db/schema";
import { Resend } from "resend";

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
    await db.insert(demoLeads).values({
      websiteUrl: url,
      name: name || null,
      email: email || null,
      demoType,
      brandData: brandData || null,
    });

    // Send notification email to iOLab
    const demoNames: Record<string, string> = {
      crm: "CRM",
      "customer-support": "Customer Support",
      "project-management": "Project Management",
      "ai-chatbot": "AI Chatbot",
      invoicing: "Invoicing",
    };

    const demoLabel = demoNames[demoType] || demoType;
    const businessName = brandData?.businessName || url;

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
              <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Demo Viewed</td><td style="padding:8px;border-bottom:1px solid #eee;">${demoLabel}</td></tr>
              ${name ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>` : ""}
              ${email ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>` : ""}
              ${brandData?.industry ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Industry</td><td style="padding:8px;border-bottom:1px solid #eee;">${brandData.industry}</td></tr>` : ""}
              ${brandData?.primaryColor ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Brand Color</td><td style="padding:8px;border-bottom:1px solid #eee;"><span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${brandData.primaryColor};vertical-align:middle;margin-right:6px;"></span>${brandData.primaryColor}</td></tr>` : ""}
            </table>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Failed to send lead notification email:", emailErr);
      // Don't fail the request just because email didn't send
    }

    // If prospect provided email, send them a follow-up
    if (email) {
      try {
        await getResend().emails.send({
          from: "iOLab Digital <updates@updates.iolab.co>",
          to: email,
          subject: `Here's what a custom ${demoLabel} could do for ${businessName}`,
          html: `
            <div style="max-width:600px;margin:0 auto;font-family:sans-serif;">
              <h2 style="color:#7B2FF7;">Thanks for checking out the ${demoLabel} demo${name ? `, ${name}` : ""}!</h2>
              <p>What you saw is just a preview. Imagine that same system — but built around <strong>your</strong> exact workflow, with <strong>your</strong> branding, and integrated with the tools you already use.</p>
              <p>Here's what we typically build for businesses like yours:</p>
              <ul>
                <li>Custom ${demoLabel.toLowerCase()} tailored to your process</li>
                <li>AI automation that handles repetitive work 24/7</li>
                <li>Mobile-friendly — works on any device</li>
                <li>You own everything — no monthly SaaS fees</li>
              </ul>
              <p>Want to see a more detailed proposal? Reply to this email or <a href="https://iolab.co/contact" style="color:#7B2FF7;">book a free consultation</a>.</p>
              <p>— Rauf Tur<br/>Founder, iOLab Digital<br/>(609) 200-1127</p>
            </div>
          `,
        });
      } catch (followUpErr) {
        console.error("Failed to send follow-up email:", followUpErr);
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
