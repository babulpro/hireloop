import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Detect Better Auth session token cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const isAuthenticated = Boolean(sessionToken);

  // 2. Protect dashboard routes from unauthenticated users
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // 3. Redirect authenticated users away from sign-in and sign-up
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard/seeker", request.url));
    }
  }

  return NextResponse.next();
}

// Only run the proxy on routes that require auth checks or redirects
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
