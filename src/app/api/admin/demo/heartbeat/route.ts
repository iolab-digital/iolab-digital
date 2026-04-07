import { NextResponse } from "next/server";
import { db } from "@/db";
import { demoTokens } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// POST — heartbeat from demo banner (every 30 seconds)
export async function POST(request: Request) {
  try {
    const { token, page } = await request.json();

    if (!token) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Increment duration by 30 seconds and update last accessed
    await db
      .update(demoTokens)
      .set({
        totalDurationSeconds: sql`${demoTokens.totalDurationSeconds} + 30`,
        pagesViewed: sql`${demoTokens.pagesViewed} + 1`,
        lastAccessedAt: new Date(),
      })
      .where(eq(demoTokens.token, token));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
