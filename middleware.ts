import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("synapsis_login")?.value;

  const isLoggedIn = !!token;
  const isLoginPage = request.nextUrl.pathname === "/log-in";

  // If user is not logged in and not already on the login page → redirect
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  // If user is logged in and tries to access /log-in → redirect to dashboard
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/log-in"],
};
