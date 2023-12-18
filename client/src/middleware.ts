/* eslint-disable no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("token");

  if (cookie) {
    console.log(cookie);
    return NextResponse.next();
  } else {
    return NextResponse.rewrite(new URL("/admin/login", request.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
