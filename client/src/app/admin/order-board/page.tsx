"use client";

import React, { useEffect, useState } from "react";

import { LineItem } from "@/lib/types";
import OrderCard from "@/components/ui/order-card";

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

  let groupedData: any[] = [];

  lineItems.forEach((item) => {
    console.log(item, "item from foreach");
    let id = item.id;

    if (!groupedData[id - 1]) {
      groupedData[id - 1] = [];
    }
    groupedData[id - 1].push(item);
  });

  console.log(groupedData, "this is grouped!!");

  return (
    <main>
      <nav className="border border-white text-center">Order Board</nav>
      <div className="border border-slate-500 h-screen">
        {groupedData.map(
          (lineItems: any[], index: React.Key | null | undefined) => (
            <div key={index}>
              <OrderCard lineItems={lineItems} />
            </div>
          ),
        )}
      </div>
    </main>
  );
}
