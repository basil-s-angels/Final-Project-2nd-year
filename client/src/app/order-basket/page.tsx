import React from "react";
import Ordercart from './order-basket'
import { redirect } from "next/navigation";

export default async function CartPage() {
  return <Ordercart />;
}
