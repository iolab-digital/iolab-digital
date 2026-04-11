import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  demoLeads,
  demoDripEmails,
  contacts,
  chatSessions,
  chatMessages,
  demoTokens,
} from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { getDemoContext } from "@/lib/demo-context";

export async function POST(request: Request) {
  try {
    const demo = await getDemoContext();
    if (demo.isDemo) {
      return NextResponse.json({ success: true });
    }

    const { table, ids, action } = await request.json();

    if (!table || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "table and ids[] required" }, { status: 400 });
    }

    if (action === "delete") {
      switch (table) {
        case "demo_leads":
          // Also delete associated drip emails
          for (const id of ids) {
            await db.delete(demoDripEmails).where(eq(demoDripEmails.leadId, id));
          }
          await db.delete(demoLeads).where(inArray(demoLeads.id, ids));
          break;

        case "contacts":
          await db.delete(contacts).where(inArray(contacts.id, ids));
          break;

        case "chat_sessions":
          // Delete messages first, then sessions
          for (const id of ids) {
            // id here is the sessionId string
            await db.delete(chatMessages).where(eq(chatMessages.sessionId, String(id)));
            await db.delete(chatSessions).where(eq(chatSessions.sessionId, String(id)));
          }
          break;

        case "demo_tokens":
          await db.delete(demoTokens).where(inArray(demoTokens.id, ids));
          break;

        default:
          return NextResponse.json({ error: "Invalid table" }, { status: 400 });
      }
    } else if (action === "archive") {
      // Archive = update status field
      switch (table) {
        case "contacts":
          await db
            .update(contacts)
            .set({ status: "archived", updatedAt: new Date() })
            .where(inArray(contacts.id, ids));
          break;

        case "chat_sessions":
          for (const id of ids) {
            await db
              .update(chatSessions)
              .set({ status: "archived" })
              .where(eq(chatSessions.sessionId, String(id)));
          }
          break;

        default:
          return NextResponse.json({ error: "Archive not supported for this table" }, { status: 400 });
      }
    } else {
      return NextResponse.json({ error: "action must be 'delete' or 'archive'" }, { status: 400 });
    }

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (error) {
    console.error("Admin manage error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
