"use server";

import { cookies } from "next/headers";

export default async function setCookie(token: string) {
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "none",
  });
}
