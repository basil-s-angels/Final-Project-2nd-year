import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
      SELECT AVG(daily_orders) 
      FROM (
        SELECT DATE(created_at) AS order_date, COUNT(*) AS daily_orders
        FROM invoices
        WHERE status = 'completed'
        GROUP BY order_date
      ) AS subquery;
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
