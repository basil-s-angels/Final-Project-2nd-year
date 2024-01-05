import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/:tableNum", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { tableNum } = request.params;
    const { rows } = await client.query(
      `
            SELECT
                invoices.id,
                invoices.status,
                line_items.quantity,
                foods.name,
                invoices.table_num,
                foods.price
            FROM invoices
            INNER JOIN line_items
            ON invoices.id = line_items.invoice_id
            INNER JOIN foods
            ON foods.id = line_items.food_id
            WHERE invoices.table_num = $1
            `,
      [tableNum],
    );
    client.release();
    response.json({ rows });
  } catch (error) {
    console.log(error);
  }
});

export default router;
