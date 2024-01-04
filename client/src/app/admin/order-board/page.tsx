"use client";

import React, { useEffect, useState, useRef } from "react";

import { LineItem } from "@/lib/types";
import OrderCard from "@/components/ui/order-card";
import OrderSearch from "@/components/ui/order-search";

export default function OrderBoard() {
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [searchResult, setSearchResult] = useState<LineItem[] | null>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const prevLineItemsLength = useRef<number>(lineItems.length);

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
          prevLineItemsLength.current = results.length;
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

  let groupedData: Array<LineItem[]> = [];

  if (!searchResult) {
    lineItems.forEach((item) => {
      let id = item.id;

      if (!groupedData[id - 1]) {
        groupedData[id - 1] = [];
      }
      groupedData[id - 1].push(item);
    });
  } else {
    searchResult.forEach((item) => {
      let id = item.id;

      if (!groupedData[id - 1]) {
        groupedData[id - 1] = [];
      }
      groupedData[id - 1].push(item);
    });
  }

  return (
    <main className="flex flex-col h-max md:h-screen w-screen md:overflow-x-scroll">
      <nav className="flex flex-col items-center text-lg text-center overflow-hidden h-[85px] md:h-[100px] px-3">
        <OrderSearch setSearchResult={setSearchResult} />
      </nav>
      <div className="w-screen flex flex-col m-auto md:flex-row md:gap-4 md:overflow-x-scroll gap-5 h-screen pt-4 pb-8 px-3">
        {groupedData.length !== 0 ? (
          groupedData.map(
            (lineItems: LineItem[], index: React.Key | null | undefined) => (
              <div key={index}>
                <OrderCard lineItems={lineItems} />
              </div>
            ),
          )
        ) : (
          <div>No orders available...</div>
        )}
      </div>
    </main>
  );
}
