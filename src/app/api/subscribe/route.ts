import { NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validations";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = subscribeSchema.parse(body);

    // Send welcome email
    await sendWelcomeEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 400 }
    );
  }
}
