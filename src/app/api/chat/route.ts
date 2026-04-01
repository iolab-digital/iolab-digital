import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { IOLAB_KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import { db } from "@/db";
import { demoLeads } from "@/db/schema";
import {
  checkRateLimit,
  checkDailyLimit,
  checkAbuse,
  checkConversationLimit,
  sanitizeMessage,
  getClientIP,
  wantsHumanEscalation,
} from "@/lib/chat-guards";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

type Message = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);

    const { messages, visitorInfo } = (await request.json()) as {
      messages: Message[];
      visitorInfo?: { page?: string };
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    // --- GUARD 1: Rate limit per IP ---
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          reply: "You're sending messages too quickly. Please wait a moment and try again. Or reach us directly at hello@iolab.co.",
          rateLimited: true,
        },
        { status: 429 }
      );
    }

    // --- GUARD 2: Daily global limit ---
    if (!checkDailyLimit()) {
      return NextResponse.json(
        {
          reply: "Our chat is experiencing high volume right now. For immediate help, reach us at hello@iolab.co or call (609) 200-1127.",
          rateLimited: true,
        },
        { status: 429 }
      );
    }

    // --- GUARD 3: Conversation length limit ---
    const convCheck = checkConversationLimit(messages.length);
    if (convCheck.exceeded) {
      return NextResponse.json({ reply: convCheck.response, conversationLimited: true });
    }

    // --- GUARD 4: Sanitize and check abuse ---
    const lastUserMsg = messages[messages.length - 1];
    if (lastUserMsg?.role !== "user") {
      return NextResponse.json({ error: "Last message must be from user" }, { status: 400 });
    }

    const sanitized = sanitizeMessage(lastUserMsg.content);
    const userHistory = messages.filter((m) => m.role === "user").map((m) => m.content);

    const abuseCheck = checkAbuse(sanitized, userHistory);
    if (abuseCheck.blocked) {
      return NextResponse.json({ reply: abuseCheck.response, blocked: true });
    }

    // --- GUARD 5: Human escalation detection ---
    if (wantsHumanEscalation(sanitized)) {
      return NextResponse.json({
        reply: "Absolutely! I'll connect you with Rauf. Please share your name and email below, and he'll follow up within a few hours with full context from our conversation.",
        escalation: true,
      });
    }

    // --- All guards passed — call Claude ---
    let systemPrompt = IOLAB_KNOWLEDGE_BASE;
    if (visitorInfo?.page) {
      systemPrompt += `\n\nThe visitor is currently on: ${visitorInfo.page}`;
    }

    // Use sanitized message in the messages array
    const cleanedMessages = messages.map((m, i) =>
      i === messages.length - 1 && m.role === "user"
        ? { ...m, content: sanitized }
        : m
    );

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: systemPrompt,
      messages: cleanedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const reply =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Auto-capture email if shared in message
    const emailMatch = sanitized.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

    if (emailMatch) {
      try {
        await db.insert(demoLeads).values({
          websiteUrl: visitorInfo?.page || "live-chat",
          email: emailMatch[0],
          demoType: "live-chat",
          brandData: {
            businessName: "Live Chat Lead",
            primaryColor: "#7B2FF7",
            accentColor: "#FF6B35",
            logoUrl: null,
            fontStyle: "sans-serif",
            industry: "business",
          },
        });
      } catch {
        // Silent
      }
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "I'm having trouble connecting right now. You can reach us directly at hello@iolab.co or call (609) 200-1127.",
      },
      { status: 200 }
    );
  }
}
