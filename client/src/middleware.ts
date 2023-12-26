/* eslint-disable no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log(request, "request from midleware");
  console.log(request.cookies, "request from midleware");
  const response = await fetch(
    `https://hedgehog-discrete-raccoon.ngrok-free.app/user-middleware`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: request.cookies.get("token"),
      }),
    },
  );

  if (response.ok) {
    const user = await response.json();
    console.log(user, "gotten from middleware");
    if (pathname === "/admin/login" || pathname === "/admin/signup") {
      return NextResponse.redirect(
        `https://final-project-2nd-year.vercel.app/admin`,
      );
    } else {
      return NextResponse.next();
    }
  } else {
    console.log(request, response, "from middleware failed");
    if (
      pathname.startsWith("/admin") &&
      pathname !== "/admin/login" &&
      pathname !== "/admin/signup"
    ) {
      return NextResponse.redirect(
        `https://final-project-2nd-year.vercel.app/admin/login`,
      );
    }
    return NextResponse.next();
  }
}
