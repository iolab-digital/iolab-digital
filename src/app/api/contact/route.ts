import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Honeypot check
    if (data.honeypot) {
      return NextResponse.json({ success: true }); // Silently accept
    }

    // Send notification to team
    await sendContactNotification(data);

    // Send confirmation to submitter
    await sendContactConfirmation({ name: data.name, email: data.email });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 400 }
    );
  }
}
