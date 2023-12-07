import express, { response } from "express";
import cors from "cors";
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

  app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))

  app.get('/', async (req, res) => {
    res.send(`Hello world!`);
  });

  app.post('/signup', async (request, response) => {
    try {
      const {
        position,
        first_name,
        last_name,
        email,
        password
      } = request.body;
      const hashed_password = await bcrypt.hash(password, 10);

      const query = `
        INSERT INTO users (
          first_name,
          last_name,
          email,
          position,
          hashed_password)
        VALUES ($1, $2, $3, $4, $5)
      `;

      const values = [
        first_name,
        last_name,
        email,
        position,
        hashed_password
      ]

      const { rows } = await pool.query(query, values);
      response.json({ message: "Successfully added!" });
      console.log(request.body);
    } catch (error) {
      console.log("Error logging in...");
      // If an error occurs, send an error message in the response
      if (error instanceof Error) {
        response.status(401).json({ message: error.message });
      } else {
        response.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  });

  app.post("/login", async (request, response) => {
    try {
      const { email, password } = request.body;

      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (rows.length === 0) {
        throw new Error("No email found.");
      }

      const correctPassword = await bcrypt.compare(password, rows[0].hashed_password);

      if (correctPassword) {
        const token = jwt.sign(
          { userId: rows[0].id, email: rows[0].email },
          "secret", // Replace with a more secure secret
          {
            expiresIn: "1h",
          },
        );
        console.log(token, "successfully logged in")
        return response.json({ token })
      } else {
        console.log('Wrong password');
        throw new Error("Email or password is incorrect");
      }
    } catch (error) {
      // If an error occurs, send an error message in the response
      if (error instanceof Error) {
        response.status(401).json({ message: error.message });
      } else {
        response.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  });

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

serverStart();