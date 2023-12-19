import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import "dotenv/config";

import { User } from "./types";

async function serverStart() {
  const app = express();
  const port = 8080;

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  app
    .use(cookieParser())
    .use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
        optionsSuccessStatus: 200,
      }),
    )
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

  app.get("/", async (req, res) => {
    res.send(`Hello world!`);
  });

  app.post("/signup", async (request: Request, response: Response) => {
    try {
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

      await pool.query<User>(query, values);
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

  app.post("/login", async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;

      const { rows } = await pool.query<User>(
        "SELECT * FROM users WHERE email = $1",
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
          { expiresIn: "1h" },
        );

        response.cookie("token", token, { httpOnly: true, sameSite: "none" });
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

  app.get("/user", (request: Request, response: Response) => {
    const token = request.cookies.token;
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      console.log(user);
      return response.json({ user });
    } catch (error) {
      response.clearCookie("token");
      return response.sendStatus(401);
    }
  });

  app.delete("/user", (request: Request, response: Response) => {
    response.clearCookie("token");
    return response.json({ message: "Token deleted" });
  });

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

serverStart();
