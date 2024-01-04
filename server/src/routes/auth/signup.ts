import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../../server";
import { User } from "../../types";

const router = express.Router();

router.post("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { position, first_name, last_name, email, password } = request.body;
    const hashed_password = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (
        first_name,
        last_name,
        email,
        position,
        hashed_password)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [first_name, last_name, email, position, hashed_password];

    await client.query<User>(query, values);
    client.release();
    response.json({ message: "Successfully added!" });
    console.log(request.body);
  } catch (error) {
    console.log("Having trouble signing in...");
    if (error instanceof Error) {
      response.status(401).json({ message: error.message });
    } else {
      response.status(500).json({ message: "An unexpected error occurred" });
    }
  }
});

export default router;
