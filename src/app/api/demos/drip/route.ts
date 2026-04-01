import { NextResponse } from "next/server";
import { db } from "@/db";
import { demoDripEmails, demoLeads } from "@/db/schema";
import { eq, lte, isNull, and } from "drizzle-orm";
import { Resend } from "resend";
import { generateDripEmail } from "@/lib/drip-emails";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

// This endpoint is called by a cron job every hour
// It finds unsent drip emails that are due and sends them
export async function GET(request: Request) {
  // Simple auth — check for a secret header to prevent public access
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || "cron-secret-default";

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    // Find all unsent, non-stopped emails where scheduledFor <= now
    const dueEmails = await db
      .select({
        dripId: demoDripEmails.id,
        emailNumber: demoDripEmails.emailNumber,
        leadId: demoDripEmails.leadId,
      })
      .from(demoDripEmails)
      .where(
        and(
          lte(demoDripEmails.scheduledFor, now),
          isNull(demoDripEmails.sentAt),
          eq(demoDripEmails.stopped, false)
        )
      )
      .limit(50); // Process max 50 per run to avoid timeouts

    if (dueEmails.length === 0) {
      return NextResponse.json({ sent: 0, message: "No emails due" });
    }

    let sent = 0;
    let failed = 0;

    for (const dueEmail of dueEmails) {
      try {
        // Get the lead data
        const [lead] = await db
          .select()
          .from(demoLeads)
          .where(eq(demoLeads.id, dueEmail.leadId))
          .limit(1);

        if (!lead || !lead.email) {
          // Mark as sent to skip it
          await db
            .update(demoDripEmails)
            .set({ sentAt: now })
            .where(eq(demoDripEmails.id, dueEmail.dripId));
          continue;
        }

        const leadData = {
          email: lead.email,
          name: lead.name || undefined,
          businessName: lead.brandData?.businessName || lead.websiteUrl,
          demoType: lead.demoType,
          industry: lead.brandData?.industry || "business",
        };

        const emailContent = generateDripEmail(leadData, dueEmail.emailNumber);

        await getResend().emails.send({
          from: emailContent.from,
          to: lead.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        // Mark as sent
        await db
          .update(demoDripEmails)
          .set({ sentAt: now })
          .where(eq(demoDripEmails.id, dueEmail.dripId));

        sent++;
      } catch (err) {
        console.error(`Failed to send drip email ${dueEmail.dripId}:`, err);
        failed++;
      }
    }

    return NextResponse.json({ sent, failed, total: dueEmails.length });
  } catch (error) {
    console.error("Drip cron error:", error);
    return NextResponse.json(
      { error: "Drip processing failed" },
      { status: 500 }
    );
  }
}

// Stop all drip emails for a lead (called when lead books a consultation)
export async function POST(request: Request) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json({ error: "leadId required" }, { status: 400 });
    }

    await db
      .update(demoDripEmails)
      .set({ stopped: true })
      .where(
        and(
          eq(demoDripEmails.leadId, leadId),
          isNull(demoDripEmails.sentAt)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stop drip error:", error);
    return NextResponse.json({ error: "Failed to stop drip" }, { status: 500 });
  }
}
