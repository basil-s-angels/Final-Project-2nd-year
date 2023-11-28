import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const { position, fname, lname, email, password } = await request.json();
    const hashedPassword = await hash(password, 10);

    const response = await sql`
      INSERT INTO users (fname,lname,email,position,password)
      VALUES (${fname},${lname},${email},${position},${hashedPassword});
    `;
    console.log(
      `position = ${position}, fname = ${fname}, lname = ${lname}, email = ${email}, password = ${password}, hashed = ${hashedPassword}`,
    );
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
//abcd1234 password ko haahah
