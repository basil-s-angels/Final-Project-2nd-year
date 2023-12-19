/* eslint-disable no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const signedIn = request.cookies.get("token");
  const { pathname } = new URL(request.url);

  console.log("cookie gotten from middleware: ", signedIn);
  console.log("pathname gotten from middleware: ", pathname);
  console.log("req url gotten from middleware: ", new URL(request.url));

  if (signedIn) {
    if (pathname === "/admin/login" || pathname === "/admin/signup") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/admin`,
      );
    }
    return NextResponse.next();
  } else {
    if (
      pathname.startsWith("/admin") &&
      pathname !== "/admin/login" &&
      pathname !== "/admin/signup"
    ) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/admin/login`,
      );
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/admin/:path*",
};
