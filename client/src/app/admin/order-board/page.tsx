"use client";

import React, { useEffect, useState } from "react";

import { LineItem } from "@/lib/types";
import OrderCard from "@/components/ui/order-card";

export default function OrderBoard() {
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [prevLineItemsLength, setPrevLineItemsLength] = useState<number>(0);
  // const [initialLoad, setInitialLoad] = useState<boolean>(true);
  async function fetchInvoices() {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/invoices`)
      .then((response) => response.json())
      .then((results) => {
        console.log(results.length, "new");
        setPrevLineItemsLength(results.length);
        console.log(prevLineItemsLength, "old");
        // if (results.length > prevLineItemsLength) {
        //   alert("New order has arrived");
        // }
        setLineItems(results);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchInvoices();

    console.log("starting");
    const intervalId = setInterval(() => {
      fetchInvoices();
      console.log("refreshed");
    }, 5000);

    return () => {
      clearInterval(intervalId);
      console.log("cleared interval");
    };
  }, []);

  // console.log(lineItems.length, "from usestate");

  let groupedData: any[] = [];

  lineItems.forEach((item) => {
    // console.log(item, "item from foreach");
    let id = item.id;

    if (!groupedData[id - 1]) {
      groupedData[id - 1] = [];
    }
    groupedData[id - 1].push(item);
  });

  // console.log(groupedData, "this is grouped!!");

  // if (resultLength > lineItems.length) {
  //   alert("New order has arrived");
  // }

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
