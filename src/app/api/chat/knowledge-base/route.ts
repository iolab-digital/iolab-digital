import { NextResponse } from "next/server";
import { IOLAB_KNOWLEDGE_BASE } from "@/lib/knowledge-base";

// Returns the default hardcoded knowledge base prompt
export async function GET() {
  return NextResponse.json({ prompt: IOLAB_KNOWLEDGE_BASE });
}
