import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
      SELECT
      (
        SELECT SUM(foods.price * line_items.quantity)
        FROM line_items
        INNER JOIN invoices ON line_items.invoice_id = invoices.id
        INNER JOIN foods ON line_items.food_id = foods.id
        WHERE DATE(invoices.created_at) >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
          AND DATE(invoices.created_at) < DATE_TRUNC('month', CURRENT_DATE)
      ) AS last_month_revenue,
      (
        SELECT SUM(foods.price * line_items.quantity)
        FROM line_items
        INNER JOIN invoices ON line_items.invoice_id = invoices.id
        INNER JOIN foods ON line_items.food_id = foods.id
        WHERE DATE(invoices.created_at) >= DATE_TRUNC('month', CURRENT_DATE)
      ) AS this_month_revenue;    
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
