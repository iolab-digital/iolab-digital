import { NextResponse } from "next/server";
import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getDemoContext } from "@/lib/demo-context";
import { generateChatMessages } from "@/lib/demo-mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId required" }, { status: 400 });
  }

  try {
    const demo = await getDemoContext();
    if (demo.isDemo) {
      return NextResponse.json({ messages: generateChatMessages(demo.industry!, sessionId) });
    }

    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Messages error:", error);
    return NextResponse.json({ messages: [] }, { status: 500 });
  }
}
