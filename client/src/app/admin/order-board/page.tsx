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
    <main>
      <nav className="border border-white text-center overflow-hidden">
        Order Board
      </nav>
      <div className="flex flex-row h-full border border-red-500 overflow-x-scroll pt-3 gap-4">
        {groupedData.map(
          (lineItems: any[], index: React.Key | null | undefined) => (
            <div key={index} className="flex-initial">
              <OrderCard lineItems={lineItems} />
            </div>
          ),
        )}
      </div>
    </main>
  );
}
