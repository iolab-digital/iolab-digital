import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Pass-through routes (no auth required)
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/demo/") // Entry point + expired page
  ) {
    return NextResponse.next();
  }

  // Check for real admin auth
  const adminToken = request.cookies.get("iolab-admin-token");
  if (adminToken) {
    // Real admin — pass through with no demo header
    return NextResponse.next();
  }

  // Check for demo auth
  const demoCookie = request.cookies.get("iolab-demo-token");
  if (demoCookie) {
    try {
      const demoData = JSON.parse(demoCookie.value);
      const { industry, prospectName, expiresAt } = demoData;

      // Check expiry client-side (lightweight — full validation happens in demo-context)
      if (expiresAt && new Date(expiresAt) > new Date()) {
        // Set demo mode headers on the request so server components can read them
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-demo-mode", industry || "restaurants");
        requestHeaders.set("x-demo-prospect", prospectName || "");

        return NextResponse.next({
          request: { headers: requestHeaders },
        });
      }
    } catch {
      // Invalid cookie — fall through to redirect
    }

    // Expired or invalid — clear cookie and redirect to expired page
    const response = NextResponse.redirect(new URL("/admin/demo/expired", request.url));
    response.cookies.delete("iolab-demo-token");
    return response;
  }

  // No auth at all — redirect to login
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
