import express, { Request, Response } from "express";
import { pool } from "../../server";
import DateTimeConverter from "../../dateTimeConverter";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
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
      `,
    );

    const newRows = rows.map((item) => DateTimeConverter(item));

    console.log(newRows);
    client.release();
    return response.json(newRows);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    await client.query(
      `
      DELETE FROM invoices
      WHERE id = $1
      `,
      [request.params.id],
    );

    client.release();
    return response.json({
      message: `Invoice number ${request.params.id} deleted`,
    });
  } catch (error) {
    console.error(error);
  }
});

router.patch("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const { status, invoices } = request.body;

    await client.query(
      `
      UPDATE invoices
      SET status = $1
      FROM line_items
      WHERE invoices.id = line_items.invoice_id
      AND line_items.invoice_id = $2;
      `,
      [status, invoices],
    );

    client.release();
    return response.json({ status });
  } catch (error) {
    console.error(error);
  }
});

export default router;
