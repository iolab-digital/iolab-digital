import { NextResponse } from "next/server";
import { db } from "@/db";
import { chatSessions, chatMessages } from "@/db/schema";
import { eq, and, gte } from "drizzle-orm";
import { getClientIP } from "@/lib/chat-guards";

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request: Request) {
  try {
    const { sessionId, page } = await request.json();
    const ip = getClientIP(request);

    // Try to resume existing session
    if (sessionId) {
      const cutoff = new Date(Date.now() - SESSION_TTL_MS);

      const [session] = await db
        .select()
        .from(chatSessions)
        .where(
          and(
            eq(chatSessions.sessionId, sessionId),
            gte(chatSessions.lastActiveAt, cutoff)
          )
        )
        .limit(1);

      if (session) {
        // Load messages for this session
        const messages = await db
          .select({ role: chatMessages.role, content: chatMessages.content })
          .from(chatMessages)
          .where(eq(chatMessages.sessionId, sessionId))
          .orderBy(chatMessages.createdAt);

        return NextResponse.json({
          sessionId: session.sessionId,
          messages,
          resumed: true,
          messageCount: session.messageCount,
          userRating: session.userRating,
        });
      }
    }

    // Create new session
    const newSessionId = crypto.randomUUID();

    await db.insert(chatSessions).values({
      sessionId: newSessionId,
      visitorIp: ip,
      visitorPage: page || null,
      status: "active",
    });

    return NextResponse.json({
      sessionId: newSessionId,
      messages: [],
      resumed: false,
      messageCount: 0,
      userRating: null,
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ error: "Session failed" }, { status: 500 });
  }
}
