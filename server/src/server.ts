import express from "express";
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import 'dotenv/config';

async function serverStart() {
  const app = express();
  const port = 8080;

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  app.get('/', async (req, res) => {
    res.send(`Hello world!`);
  });

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

serverStart();