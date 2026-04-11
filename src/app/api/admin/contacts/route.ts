import { NextResponse } from "next/server";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { desc, ne } from "drizzle-orm";
import { getDemoContext } from "@/lib/demo-context";
import { generateContacts } from "@/lib/demo-mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const demo = await getDemoContext();
    if (demo.isDemo) {
      return NextResponse.json({ contacts: generateContacts(demo.industry!) });
    }

    const { searchParams } = new URL(request.url);
    const showArchived = searchParams.get("archived") === "true";

    const contactList = showArchived
      ? await db.select().from(contacts).orderBy(desc(contacts.createdAt)).limit(200)
      : await db.select().from(contacts).where(ne(contacts.status, "archived")).orderBy(desc(contacts.createdAt)).limit(200);

    return NextResponse.json(
      { contacts: contactList },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Admin contacts API error:", error);
    return NextResponse.json({ contacts: [] }, { status: 500 });
  }
}
