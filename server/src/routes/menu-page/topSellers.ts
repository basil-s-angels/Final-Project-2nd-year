import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/breakfast", async (request: Request, response: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        foods.id,
        SUM(quantity) as sum,
        foods.name,
        foods.price,
        foods.details
      FROM line_items
      INNER JOIN foods
      ON foods.id = line_items.food_id
      INNER JOIN invoices 
      ON invoices.id = line_items.invoice_id
      WHERE EXTRACT(HOUR FROM invoices.created_at) BETWEEN 7 AND 10
      GROUP BY foods.id, foods.name, foods.price, foods.details
      ORDER BY sum DESC
      LIMIT 5
    `);
    response.json(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Error fetching the amount of times each menu item was ordered.",
    });
  }
});

router.get("/lunch", async (request: Request, response: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        foods.id,
        SUM(quantity) as sum,
        foods.name,
        foods.price,
        foods.details
      FROM line_items
      INNER JOIN foods
      ON foods.id = line_items.food_id
      INNER JOIN invoices 
      ON invoices.id = line_items.invoice_id
      WHERE EXTRACT(HOUR FROM invoices.created_at) BETWEEN 11 AND 17
      GROUP BY foods.id, foods.name, foods.price, foods.details
      ORDER BY sum DESC
      LIMIT 5
    `);
    response.json(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Error fetching the amount of times each menu item was ordered.",
    });
  }
});

router.get("/dinner", async (request: Request, response: Response) => {
  try {
    const result = await pool.query(`
      SELECT
        foods.id,
        SUM(quantity) as sum,
        foods.name,
        foods.price,
        foods.details
      FROM line_items
      INNER JOIN foods
      ON foods.id = line_items.food_id
      INNER JOIN invoices 
      ON invoices.id = line_items.invoice_id
      WHERE EXTRACT(HOUR FROM invoices.created_at) BETWEEN 18 AND 23
      GROUP BY foods.id, foods.name, foods.price, foods.details
      ORDER BY sum DESC
      LIMIT 5
    `);
    response.json(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({
      error: "Error fetching the amount of times each menu item was ordered.",
    });
  }
});

export default router;
