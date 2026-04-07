import { NextResponse } from "next/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getDemoContext } from "@/lib/demo-context";
import { generateSettings } from "@/lib/demo-mock-data";

// GET — fetch a setting (public, no auth needed for chatbot check)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "key required" }, { status: 400 });
  }

  try {
    const demo = await getDemoContext();
    if (demo.isDemo) {
      const settings = generateSettings(demo.industry!);
      const value = settings[key as keyof typeof settings] ?? null;
      return NextResponse.json({ value });
    }

    const [setting] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);

    return NextResponse.json(
      { value: setting?.value ?? null },
      { headers: { "Cache-Control": "public, max-age=30" } }
    );
  } catch {
    return NextResponse.json({ value: null });
  }
}

// POST — update a setting (admin only, checked by middleware)
export async function POST(request: Request) {
  try {
    const demo = await getDemoContext();
    if (demo.isDemo) {
      return NextResponse.json({ success: true });
    }

    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json({ error: "key and value required" }, { status: 400 });
    }

    // Upsert
    const [existing] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);

    if (existing) {
      await db
        .update(siteSettings)
        .set({ value: String(value), updatedAt: new Date() })
        .where(eq(siteSettings.key, key));
    } else {
      await db.insert(siteSettings).values({ key, value: String(value) });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
