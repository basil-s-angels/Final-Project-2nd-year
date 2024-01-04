import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
      SELECT
        SUM(quantity) as total,
        foods.name
      FROM line_items
      INNER JOIN foods
      ON line_items.food_id = foods.id
      GROUP BY foods.name
      ORDER BY total DESC
      LIMIT 3
      `,
    );

    client.release();
    return response.json(rows);
  } catch (error) {
    console.error(error);
    return response.json([]);
  }
});

export default router;
