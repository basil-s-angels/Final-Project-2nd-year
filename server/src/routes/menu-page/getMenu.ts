import express, { Request, Response } from "express";
import { pool } from "../../server";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  try {
    const result = await pool.query("SELECT * FROM foods");
    response.json(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Error fetching the menu items." });
  }
});

export default router;
