import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `
            SELECT 
                invoices.id,
                invoices.created_at,
                foods.price,
                line_items.quantity,
                invoices.comment,
                invoices.status
            FROM line_items
            INNER JOIN invoices ON line_items.invoice_id = invoices.id
            INNER JOIN foods ON line_items.food_id = foods.id
            WHERE invoices.status = 'completed'
            `,
    );
    client.release();
    response.json(result.rows);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "An error occurred while fetching the menu items." });
  }
});

router.get("/:description", async (request: Request, response: Response) => {
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
        WHERE invoices.id = $1
        `,
    [request.params.description],
  );

  client.release();
  return response.json({ rows });
});

router.get(
  "/:description/:year",
  async (request: Request, response: Response) => {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
        SELECT EXTRACT(YEAR FROM invoices.created_at) AS Year, COUNT(*)
        FROM line_items
        INNER JOIN invoices ON line_items.invoice_id = invoices.id
        INNER JOIN foods ON line_items.food_id = foods.id
        GROUP BY Year
        ORDER BY Year DESC
        `,
      [request.params.year],
    );
    client.release();
    return response.json({ rows });
  },
);

router.get(
  "/:description/:month",
  async (request: Request, response: Response) => {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
        SELECT EXTRACT(MONTH FROM invoices.created_at) AS Month, COUNT(*)
        FROM line_items
        INNER JOIN invoices ON line_items.invoice_id = invoices.id
        INNER JOIN foods ON line_items.food_id = foods.id
        GROUP BY Month
        ORDER BY Month DESC
        `,
      [request.params.month],
    );

    client.release();
    return response.json({ rows });
  },
);
router.get(
  "/:description/:day",
  async (request: Request, response: Response) => {
    const client = await pool.connect();
    const { rows } = await client.query(
      `
        SELECT DATE(invoices.created_at) AS Day, COUNT(*)
        FROM line_items
        INNER JOIN invoices ON line_items.invoice_id = invoices.id
        INNER JOIN foods ON line_items.food_id = foods.id
        GROUP BY Day
        ORDER BY Day DESC
        `,
      [request.params.day],
    );

    client.release();
    return response.json({ rows });
  },
);

export default router;
