import { NextResponse } from "next/server";
import { db } from "@/db";
import { chatSessions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { sessionId, rating } = await request.json();

    if (!sessionId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "sessionId and rating (1-5) required" }, { status: 400 });
    }

    await db
      .update(chatSessions)
      .set({
        userRating: rating,
        status: "completed",
        lastActiveAt: new Date(),
      })
      .where(eq(chatSessions.sessionId, sessionId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Rating error:", error);
    return NextResponse.json({ error: "Rating failed" }, { status: 500 });
  }
}
