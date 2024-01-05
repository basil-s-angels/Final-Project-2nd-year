import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/menu-page", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM foods");
    client.release();
    response.json(result.rows);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "An error occurred while fetching the menu items." });
  }
});

router.get("/", async (request: Request, response: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT name, price FROM foods");
    client.release();
    response.json(result.rows);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ error: "An error occured while fetching the base price" });
  }
});

router.post("/", async (request: Request, response: Response) => {
  try {
    const { selected, comment } = await request.body;
    console.log(selected, "from orders");
    console.log(comment, "from orders");
    const client = await pool.connect();
    const res1 = await client.query(
      `
      INSERT INTO invoices 
      (created_at, status, comment, table_num)
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
    await client.query(query);
    client.release();
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "An error occurred while fetching the menu items." });
  }
});

export default router;
