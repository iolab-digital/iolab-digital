import { NextResponse } from "next/server";
import { db } from "@/db";
import { demoTokens } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// GET — list all demo tokens
export async function GET() {
  try {
    const tokens = await db
      .select()
      .from(demoTokens)
      .orderBy(desc(demoTokens.createdAt))
      .limit(50);

    return NextResponse.json({ tokens });
  } catch (error) {
    console.error("List demos error:", error);
    return NextResponse.json({ tokens: [] }, { status: 500 });
  }
}

// POST — create a new demo token
export async function POST(request: Request) {
  try {
    const { industry, prospectName, prospectEmail } = await request.json();

    if (!industry) {
      return NextResponse.json({ error: "Industry is required" }, { status: 400 });
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await db.insert(demoTokens).values({
      token,
      industry,
      prospectName: prospectName || null,
      prospectEmail: prospectEmail || null,
      expiresAt,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://iolab.co";
    const demoUrl = `${baseUrl}/admin/demo/${token}`;

    return NextResponse.json({ success: true, token, demoUrl, expiresAt: expiresAt.toISOString() });
  } catch (error) {
    console.error("Create demo error:", error);
    return NextResponse.json({ error: "Failed to create demo" }, { status: 500 });
  }
}

// DELETE — revoke a demo token
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.delete(demoTokens).where(eq(demoTokens.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete demo error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
