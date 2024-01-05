"use client";
import { TableRow, TableCell } from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const StatusPage = ({ params }: { params: { table: number } }) => {
  const tableNum = params.table;
  const [foodOrders, setFoodOrders] = useState<Array<{ id: number }>>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchStatus() {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/status/${tableNum}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

  let groupedData: any = [];

  foodOrders.forEach((item) => {
    let id = item.id;

    if (!groupedData[id - 1]) {
      groupedData[id - 1] = [];
    }
    groupedData[id - 1].push(item);
  });

  const orderAgain = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(`/${tableNum}/menu-page`);
  };

  return (
    <div className="min-h-screen items-center justify-center bg-gray-800 text-gray-600">
      <div className="flex-grow p-10">
        <div className="box-content p-16 border-4 bg-white rounded-lg shadow-md">
          <h1 className="text-center text-3xl font-bold mb-4">
            YOUR TABLE NUMBER: {tableNum}
          </h1>
          <div className="border-t border-blue-800 mb-4"></div>
          <div className="flex items-center justify-center ">
            <p className="text-lg font-bold">
              <div className="flex flex-col items-start"></div>
              {groupedData.map((foodOrder: any) => (
                <div
                  key={foodOrder.id}
                  style={{ border: "1px solid black", marginTop: "10px" }}
                >
                  <div className="flex space-x-4">
                    <div>
                      <p className="text-left">Invoice ID :{foodOrder[0].id}</p>
                      <p className="text-left">
                        Status :<br></br>
                        {foodOrder[0].status}
                      </p>
                    </div>
                    <div>
                      {foodOrder.map(
                        (
                          lineItem: {
                            name: string;
                            quantity: number;
                            price: number;
                          },
                          index: number,
                        ) => (
                          <TableRow key={index + 1}>
                            <TableCell className="font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell>{lineItem.name}</TableCell>
                            <TableCell className="text-center">
                              Quantity: {lineItem.quantity}
                            </TableCell>
                          </TableRow>
                        ),
                      )}
                      Your total bill: ₱
                      {Number(
                        foodOrder.reduce(
                          (total: number, item: any) =>
                            total + Number(item.price) * item.quantity,
                          0,
                        ),
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-300 mb-2"></div>
              <div className="grid grid-cols-2"></div>
              <div className="p-10"></div>
              <button onClick={orderAgain}>Click here to order again!</button>
            </p>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default StatusPage;
