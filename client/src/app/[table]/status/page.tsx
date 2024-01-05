"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function StatusPage({ params }: { params: { table: number } }) {
  const tableNum = params.table;
  const [foodOrders, setFoodOrders] = useState<Array<{ id: number }>>([]);
  const router = useRouter();
  interface foodDetails {
    id: number;
    name: string;
    quantity: number;
    price: number;
    status: string;
    comment: string;
    table_num: number;
  }

  useEffect(() => {
    async function fetchStatus() {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/status/${tableNum}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setFoodOrders(data.rows);
        });
    }

    fetchStatus();

    const intervalId = setInterval(() => {
      fetchStatus();
      console.log("refreshed");
    }, 5000);

    return () => {
      clearInterval(intervalId);
      console.log("cleared interval");
    };
  }, [tableNum]);

  let groupedData: Array<foodDetails[]> = [];
  foodOrders.forEach((item) => {
    let id = item.id;

    if (!groupedData[id - 1]) {
      groupedData[id - 1] = [];
    }
    groupedData[id - 1].push(item as foodDetails);
  });

  return (
    <div className="min-h-screen items-center justify-center">
      <div className="flex-grow p-10">
        <div className="box-content p-16 border-4 rounded-lg shadow-md">
          <h1 className="text-center text-3xl font-bold mb-4">
            YOUR TABLE NUMBER: {tableNum}
          </h1>
          <div className="border-t border-blue-800 mb-4"></div>
          <div className="flex items-center justify-center ">
            <div className="text-lg font-bold">
              {groupedData.map((foodOrder: foodDetails[], index: number) => (
                <div
                  key={index}
                  className="border border-slate-600 mb-7 py-3 rounded-xl text-center bg-slate-900"
                >
                  Invoice ID: {foodOrder[0].id} <br />
                  <Separator />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Food Name</TableHead>
                        <TableHead>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {foodOrder.map((lineItem, index: number) => (
                        <TableRow key={index + 1}>
                          <TableCell className="font-medium text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-left">
                            {lineItem.name}
                          </TableCell>
                          <TableCell className="text-center">
                            {lineItem.quantity}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Separator />
                  <div className="text-sm mt-3">
                    Your total bill: ₱
                    {Number(
                      foodOrder.reduce((total: number, item) => {
                        return total + item.price * item.quantity;
                      }, 0),
                    ).toFixed(2)}
                    <br />
                    Status: {foodOrder[0].status} <br />
                    Your comment/s: {foodOrder[0].comment}
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  router.push(`/${tableNum}/menu-page`);
                }}
                variant={"default"}
                className="mt-3"
              >
                Click here to order again!
              </Button>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
}
