/* eslint-disable no-unused-vars */
import express, { Request, Response } from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Pool } from "pg";
import "dotenv/config";

import { User } from "./types";
import { request } from "http";

async function serverStart() {
  const app = express();
  const host = process.env.SERVER_HOST;
  const port = process.env.SERVER_PORT;

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
        );

        response.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
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

  app.post("/user-middleware", (request: Request, response: Response) => {
    const { token } = request.body;
    console.log(token["value"], "from frontend");

    jwt.verify(
      token["value"],
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: JsonWebTokenError | null, decoded: any) => {
        if (err) {
          response.clearCookie("token");
          return response.sendStatus(401);
        } else {
          console.log(decoded, "from backend!");
          return response.json({ decoded });
        }
      },
    );
  });

  app.get("/user", (request: Request, response: Response) => {
    const token = request.cookies.token;

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: JsonWebTokenError | null, decoded: any) => {
        if (err) {
          response.clearCookie("token");
          return response.sendStatus(401);
        } else {
          console.log(decoded);
          return response.json({ decoded });
        }
      },
    );
  });

  app.get("/order", async (request: Request, response: Response) => {
    try {
      const result = await pool.query("SELECT price FROM foods");
      response.json(result.rows);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({ error: "An error occured while fetching the base price" });
    }
  });

  app.post("/order", async (request: Request, response: Response) => {
    try {
      const { selected, comment } = await request.body;
      console.log(selected, "from orders");
      console.log(comment, "from orders");
      const res1 = await pool.query(
        `
      INSERT INTO invoices 
      (created_at, status, comment, table_id)
      VALUES 
      (NOW(),
      'waiting for payment',
      $1,
      5)
      RETURNING id`,
        [comment],
      );
      const invoiceId = res1.rows[0].id;
      console.log(res1.rows[0], "res rows");
      console.log(invoiceId, "res invoice id");

      // // Then, insert into line_items using the newly generated id
      const values = selected
        .map(
          (item: { id: any; quantity: any }) =>
            `(${item.quantity}, ${item.id}, ${invoiceId})`,
        )
        .join(", ");

      const query = `INSERT INTO line_items (quantity, food_id, invoice_id) VALUES ${values}`;
      console.log(query);
      const res2 = await pool.query(query);
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "An error occurred while fetching the menu items." });
    }
  });

  app.delete("/user", (request: Request, response: Response) => {
    response.clearCookie("token");
    return response.json({ message: "Token deleted" });
  });

  app.listen(port, () => {
    console.log(`Listening on http://${host}:${port}`);
  });
}

serverStart();
