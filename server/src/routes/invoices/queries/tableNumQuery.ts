import express, { Request, Response } from "express";
import { pool } from "../../../server";
import DateTimeConverter from "../../../dateTimeConverter";

const router = express.Router();

router.get("/:query", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
      SELECT
        invoices.*,
        foods.name,
        line_items.quantity,
        foods.price
      FROM line_items
      INNER JOIN invoices
      ON line_items.invoice_id = invoices.id
      INNER JOIN foods
      ON line_items.food_id = foods.id
      WHERE invoices.status != 'completed'
      AND invoices.table_num = $1
      `,
      [request.params.query],
    );

    const newRows = rows.map((item) => DateTimeConverter(item));
    client.release();
    return response.json(newRows);
  } catch (error) {
    console.error(error);
    return response.json([]);
  }
});

export default router;
