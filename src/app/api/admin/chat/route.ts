import { NextResponse } from "next/server";
import { db } from "@/db";
import { chatSessions, chatMessages, siteSettings } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

// GET — list all chat sessions for admin
export async function GET() {
  try {
    const sessions = await db
      .select()
      .from(chatSessions)
      .orderBy(desc(chatSessions.lastActiveAt))
      .limit(200);

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Admin chat error:", error);
    return NextResponse.json({ sessions: [] }, { status: 500 });
  }
}

// POST — admin rates a session (and optionally extracts for learning)
export async function POST(request: Request) {
  try {
    const { sessionId, rating } = await request.json();

    if (!sessionId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "sessionId and rating (1-5) required" }, { status: 400 });
    }

    // Update admin rating
    await db
      .update(chatSessions)
      .set({ adminRating: rating })
      .where(eq(chatSessions.sessionId, sessionId));

    // If 5 stars — extract Q&A for learning
    if (rating === 5) {
      const messages = await db
        .select({ role: chatMessages.role, content: chatMessages.content })
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, sessionId))
        .orderBy(chatMessages.createdAt);

      // Build Q&A pairs from consecutive user→assistant messages
      const qaPairs: { q: string; a: string }[] = [];
      for (let i = 0; i < messages.length - 1; i++) {
        if (messages[i].role === "user" && messages[i + 1].role === "assistant") {
          qaPairs.push({
            q: messages[i].content.slice(0, 500),
            a: messages[i + 1].content.slice(0, 1000),
          });
        }
      }

      if (qaPairs.length > 0) {
        // Load existing learned Q&A
        let existing: { q: string; a: string }[] = [];
        try {
          const [learned] = await db
            .select()
            .from(siteSettings)
            .where(eq(siteSettings.key, "chatbot_learned_qa"))
            .limit(1);
          if (learned?.value) {
            existing = JSON.parse(learned.value);
          }
        } catch { /* empty */ }

        // Append new Q&A, keep max 50
        const updated = [...existing, ...qaPairs].slice(-50);
        const value = JSON.stringify(updated);

        // Upsert
        const [row] = await db
          .select()
          .from(siteSettings)
          .where(eq(siteSettings.key, "chatbot_learned_qa"))
          .limit(1);

        if (row) {
          await db
            .update(siteSettings)
            .set({ value, updatedAt: new Date() })
            .where(eq(siteSettings.key, "chatbot_learned_qa"));
        } else {
          await db.insert(siteSettings).values({ key: "chatbot_learned_qa", value });
        }
      }

      return NextResponse.json({ success: true, learned: qaPairs.length });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin chat rate error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
