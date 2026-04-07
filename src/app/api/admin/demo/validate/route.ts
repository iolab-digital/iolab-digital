import { NextResponse } from "next/server";
import { db } from "@/db";
import { demoTokens } from "@/db/schema";
import { eq, and, gte } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ valid: false, error: "Token required" }, { status: 400 });
    }

    const now = new Date();

    const [demo] = await db
      .select()
      .from(demoTokens)
      .where(and(eq(demoTokens.token, token), gte(demoTokens.expiresAt, now)))
      .limit(1);

    if (!demo) {
      return NextResponse.json({ valid: false, error: "Invalid or expired token" });
    }

    // Update access stats
    await db
      .update(demoTokens)
      .set({
        lastAccessedAt: now,
        accessCount: demo.accessCount + 1,
      })
      .where(eq(demoTokens.id, demo.id));

    return NextResponse.json({
      valid: true,
      industry: demo.industry,
      prospectName: demo.prospectName,
      expiresAt: demo.expiresAt.toISOString(),
    });
  } catch (error) {
    console.error("Validate demo error:", error);
    return NextResponse.json({ valid: false, error: "Validation failed" }, { status: 500 });
  }
}
