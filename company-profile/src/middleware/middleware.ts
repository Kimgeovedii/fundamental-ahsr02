import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value || null;
  const { pathname } = req.nextUrl;
  const isAuthPage =
    pathname.startsWith("login") || pathname.startsWith("signup");
  const isCmsRoute = pathname.startsWith("/cms");

  if (isCmsRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  if (isAuthPage && token) {
    const dashboardUrl = new URL("/cms", req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*", "signup", "login"],
};
