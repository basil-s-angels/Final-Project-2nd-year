/* eslint-disable no-unused-vars */
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Pool } from "pg";
import "dotenv/config";

import signup from "./routes/auth/signup";
import login from "./routes/auth/login";
import userMiddleware from "./routes/auth/user-middleware";
import user from "./routes/auth/user";
import invoices from "./routes/invoices/currentOrders";
import invoiceIDQuery from "./routes/invoices/queries/idQuery";
import invoiceTableQuery from "./routes/invoices/queries/tableNumQuery";
import invoiceFoodQuery from "./routes/invoices/queries/foodNameQuery";
import tableStatus from "./routes/status-page/status";
import orderBasket from "./routes/basket/order-basket";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function serverStart() {
  const app = express();
  const host = process.env.SERVER_HOST;
  const port = process.env.SERVER_PORT;

  app.get("/", async (req, res) => {
    res.send(`Hello world!`);
  });

  app
    .use(cookieParser())
    .use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
        optionsSuccessStatus: 200,
      }),
    )
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use("/signup", signup)
    .use("/login", login)
    .use("/user-middleware", userMiddleware)
    .use("/user", user)
    .use("/invoices", invoices)
    .use("/invoices/invoiceID", invoiceIDQuery)
    .use("/invoices/tableNum", invoiceTableQuery)
    .use("/invoices/foodName", invoiceFoodQuery)
    .use("/status", tableStatus)
    .use("/orders", orderBasket);

  app.listen(port, () => {
    console.log(`Listening on http://${host}:${port}`);
  });
}

serverStart();
