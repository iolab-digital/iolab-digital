import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_TOKEN_NAME = "iolab-admin-token";

function generateToken(): string {
  return Buffer.from(`admin:${Date.now()}:${Math.random()}`).toString("base64");
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateToken();
    const cookieStore = await cookies();

    cookieStore.set(ADMIN_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_TOKEN_NAME);
  return NextResponse.json({ success: true });
}
