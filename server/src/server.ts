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
import getMenu from "./routes/menu-page/getMenu";
import topSellers from "./routes/menu-page/topSellers";
import employees from "./routes/dashboard/employees";
import tableStatus from "./routes/status-page/status";
import allOrders from "./routes/done-orders/allOrders";
import orderBasket from "./routes/basket/order-basket";
import statistics from "./routes/dashboard/statistics";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function serverStart() {
  const app = express();
  const port = 8080;

  app.get("/", async (req, res) => {
    res.send(`Hello world!`);
  });

  app
    .set("trust proxy", 1)
    .use(
      cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
      }),
    )
    .use(cookieParser())
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
    .use("/admin/employee", allOrders)
    .use("/statistics", statistics)
    .use("/employees", employees)
    .use("/orders", orderBasket)
    .use("/menu-page", getMenu)
    .use("/top-sellers", topSellers);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

serverStart();
