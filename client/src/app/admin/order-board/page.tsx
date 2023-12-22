"use client";

import React, { useEffect, useState } from "react";

import { LineItem } from "@/lib/types";
// import OrderCard from "@/components/ui/order-card";

export default function OrderBoard() {
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/invoices`)
      .then((response) => response.json())
      .then((results) => {
        setLineItems(results);
      });
  }, []);
  console.log(lineItems, "from usestate");

  // const tableNumber: number = Number(lineItems[0]?.code.slice(0, -6));

  let groupedData: { [key: number]: any[] } = {};

  lineItems.forEach((item) => {
    console.log(item, "item from foreach");
    let id = item.id;

    if (!groupedData[id]) {
      groupedData[id] = [];
    }
    groupedData[id].push(item);
  });

  console.log(groupedData, "this is grouped!!");

  return (
    // <main>
    //   <nav className="border border-white text-center">Order Board</nav>
    //   <div className="border border-slate-500 h-screen">
    //     <OrderCard
    //       lineItems={lineItems}
    //       tableNumber={tableNumber}
    //     />
    //   </div>
    // </main>
    <h1>hi</h1>
  );
}
