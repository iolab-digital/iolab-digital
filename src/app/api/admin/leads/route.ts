import { NextResponse } from "next/server";
import { db } from "@/db";
import { demoLeads, demoDripEmails } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { getDemoContext } from "@/lib/demo-context";
import { generateDemoLeads } from "@/lib/demo-mock-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const demo = await getDemoContext();
    if (demo.isDemo) {
      return NextResponse.json({ leads: generateDemoLeads(demo.industry!) });
    }

    const leads = await db
      .select()
      .from(demoLeads)
      .orderBy(desc(demoLeads.createdAt))
      .limit(200);

    const leadsWithDrip = await Promise.all(
      leads.map(async (lead) => {
        const [dripStatus] = await db
          .select({
            total: sql<number>`count(*)`,
            sent: sql<number>`count(${demoDripEmails.sentAt})`,
            stopped: sql<number>`sum(case when ${demoDripEmails.stopped} = true then 1 else 0 end)`,
          })
          .from(demoDripEmails)
          .where(eq(demoDripEmails.leadId, lead.id));

        return {
          ...lead,
          drip: {
            total: dripStatus?.total || 0,
            sent: dripStatus?.sent || 0,
            stopped: (dripStatus?.stopped || 0) > 0,
          },
        };
      })
    );

    return NextResponse.json(
      { leads: leadsWithDrip },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Admin leads API error:", error);
    return NextResponse.json({ leads: [] }, { status: 500 });
  }
}
