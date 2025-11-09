import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/dashboard", "/blogs", "about"];

const loginUrl = "/login";

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get("user-token")?.value;

  const url = request.nextUrl.clone();

  const isProtectedRoute = protectedRoutes.some(
    (route) => url.pathname === route || url.pathname.startsWith(`${route}/`)
  );
  if (isProtectedRoute) {
    if (!userToken) {
      url.pathname = loginUrl;
      if (request.nextUrl.pathname !== loginUrl) {
        url.searchParams.set("from", request.nextUrl.pathname);
      }
      return NextResponse.next();
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/blogs:path*", "/dashboard:path*", "/about/:path*", "/login"],
};
