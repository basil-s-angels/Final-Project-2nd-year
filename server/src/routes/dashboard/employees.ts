import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
      SELECT
        first_name,
        last_name,
        email,
        position
      FROM users
      WHERE position != 'admin'
      AND position != 'admin request'
      `,
    );

    client.release();
    return response.json(rows);
  } catch (error) {
    console.error(error);
    return response.json([]);
  }
});

router.delete("/:email", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
      DELETE FROM users
      WHERE email = $1
      `,
      [request.params.email],
    );

    client.release();
    return response.json(rows);
  } catch (error) {
    console.error(error);
    return response.json([]);
  }
});

router.get("/requests", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        email,
        position
      FROM users
      WHERE position = 'admin request'
      `,
    );

    client.release();
    return response.json(rows);
  } catch (error) {
    console.error(error);
    return response.json([]);
  }
});

router.patch("/requests", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { email } = request.body;
    console.log(email);

    const { rows } = await client.query(
      `
      UPDATE users
      SET position = 'admin'
      WHERE email = $1
      `,
      [email],
    );

    client.release();
    return response.json(rows);
  } catch (error) {
    console.error(error);
    return response.json([]);
  }
});

export default router;
