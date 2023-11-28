// Import necessary modules
import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

interface User {
  id: number;
  email: string;
  password: string;
}
// hello this is a tese

const pool = new Pool({
  user: "default",
  host: " ep-black-math-09864837.ap-southeast-1.postgres.vercel-storage.com",
  database: "verceldb",
  password: "jMKU1Nxr9BsL",
  port: 5432,
});

// Define the loginUser function which handles the login logic
async function loginUser(email: string, password: string): Promise<string> {
  // Query the database for a user with the provided email
  const { rows } = await pool.query<User>(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  // If no user is found, throw an error
  if (rows.length === 0) {
    throw new Error("Email or password is incorrect");
  }

  // Compare the provided password with the hashed password in the database
  const correctPassword = await bcrypt.compare(password, rows[0].password);

  // If the passwords do not match, throw an error
  if (!correctPassword) {
    throw new Error("Email or password is incorrect");
  }

  // If the passwords match, create a JWT token for the user
  const token = jwt.sign(
    { userId: rows[0].id, email: rows[0].email },
    "secret", // Replace with a more secure secret
    {
      expiresIn: "1h",
    },
  );

  // Return the token
  return token;
}

// Define the startServer function which starts the Express server
async function startServer() {
  // Create a new Express app
  const app = express();

  // Define the /login endpoint
  app.post("/login", async (request: Request, response: Response) => {
    try {
      // Extract email and password from the request body
      const { email, password } = request.body;

      // Call the loginUser function and get the token
      const token = await loginUser(email, password);

      // Send the token in the response
      response.json({ token });
    } catch (error) {
      // If an error occurs, send an error message in the response
      if (error instanceof Error) {
        response.status(401).json({ message: error.message });
      } else {
        response.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  });
}

startServer();
