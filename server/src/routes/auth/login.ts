import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../server";
import { User } from "../../types";

const router = express.Router();

router.post("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { email, password } = request.body;

    const { rows } = await client.query<User>(
      `
      SELECT *
      FROM users
      WHERE email = $1
      AND position != 'admin request'
      `,
      [email],
    );

    if (rows.length === 0) {
      throw new Error("No email found.");
    }

    const correctPassword = await bcrypt.compare(
      password,
      rows[0].hashed_password,
    );

    if (correctPassword) {
      const token = jwt.sign(
        {
          userId: rows[0].id,
          email: rows[0].email,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          position: rows[0].position,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
      );

      response.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      client.release();
      return response.json({ token, success: true });
    } else {
      console.log("Wrong password");
      throw new Error("Email or password is incorrect");
    }
  } catch (error) {
    console.log("Having trouble logging in...");
    if (error instanceof Error) {
      response.status(401).json({ message: error.message });
    } else {
      response.status(500).json({ message: "An unexpected error occurred" });
    }
  }
});

export default router;
