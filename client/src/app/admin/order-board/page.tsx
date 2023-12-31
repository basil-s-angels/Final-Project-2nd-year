"use client";

import React, { useEffect, useState, useRef } from "react";

import { LineItem } from "@/lib/types";
import OrderCard from "@/components/ui/order-card";

export default function OrderBoard() {
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const prevLineItemsLength = useRef<number>(lineItems.length);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    async function fetchInvoices() {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/invoices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((results) => {
          if (!initialLoad && results.length > prevLineItemsLength.current) {
            alert("New order has arrived!");
          }
          console.log(prevLineItemsLength.current, "old");
          prevLineItemsLength.current = results.length;
          console.log(prevLineItemsLength.current, "new");
          console.log(initialLoad);
          setLineItems(results);
        })
        .catch((error) => console.error(error));
    }

    fetchInvoices();

    setInitialLoad(false);
    console.log("starting");
    const intervalId = setInterval(() => {
      fetchInvoices();
      console.log("refreshed");
    }, 5000);

    return () => {
      clearInterval(intervalId);
      console.log("cleared interval");
    };
  }, [initialLoad]);

  let groupedData: any[] = [];

  lineItems.forEach((item) => {
    let id = item.id;

    if (!groupedData[id - 1]) {
      groupedData[id - 1] = [];
    }
    groupedData[id - 1].push(item);
  });

  return (
    <main className="flex flex-col h-screen w-screen md:overflow-x-scroll border border-pink-500 ">
      <nav className="text-lg text-center overflow-hidden border border-green-500">
        Order Board
      </nav>
      <div className="border border-green-500 flex flex-col m-auto md:flex-row md:gap-4 md:overflow-x-scroll gap-5 h-full py-6 px-3">
        {groupedData.map(
          (lineItems: LineItem[], index: React.Key | null | undefined) => (
            <div key={index}>
              <OrderCard lineItems={lineItems} />
            </div>
          ),
        )}
      </div>
    </main>
  );
}
