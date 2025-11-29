import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;
  const { pathname } = req.nextUrl;
  
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isDigiShareProtectedRoute = 
    pathname.startsWith("/digi-share/create") ||
    pathname.startsWith("/digi-share/manage") ||
    pathname.startsWith("/digi-share/profile/settings") ||
    pathname.startsWith("/digi-share/edit");

  if (isDigiShareProtectedRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/digi-share/create/:path*",
    "/digi-share/manage/:path*",
    "/digi-share/profile/settings/:path*",
    "/digi-share/edit/:path*",
  ],
};

