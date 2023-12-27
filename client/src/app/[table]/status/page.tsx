"use client";
import React, { useState, useEffect } from "react";

let foodArray: FoodOrder[] = [];
interface FoodOrder {
  name: string;
  quantity: number;
  id: string;
  status: string;
}

const StatusPage = ({ params }: { params: { table: string } }) => {
  const tablenum = params.table.slice(0, -6);
  const [foodOrders, setFoodOrders] = useState<FoodOrder[]>(foodArray);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${tablenum}/status`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFoodOrders([...data.data]);
      });
  }, [tablenum]);

  return (
    <div className="min-h-screen items-center justify-center bg-gray-800 text-gray-600">
      <div className="flex-grow p-10">
        <div className="box-content p-16 border-4 bg-white rounded-lg shadow-md">
          <h1 className="text-center text-3xl font-bold mb-4">
            YOUR TABLE NUMBER: {tablenum}
          </h1>
          <div className="border-t border-blue-800 mb-4"></div>

          <div className="flex items-center justify-center">
            <p className="text-lg font-bold">
              <div className="grid grid-cols-2">
                {foodOrders.map((foodOrder) => (
                  <div key={foodOrder.id}>
                    <p className="text-left">{foodOrder.name}</p>
                    <br></br>
                    <p className="text-right">Quantity: {foodOrder.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 mb-2"></div>
              <div className="grid grid-cols-2"></div>
              <div className="p-10">
                The status of your order:{" "}
                <strong className="text-blue-400 text-lg">
                  {foodOrders.map((foodOrder) => (
                    <div key={foodOrder.id}>
                      <p>{foodOrder.status}</p>
                    </div>
                  ))}{" "}
                </strong>
                <br></br>
              </div>
            </p>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
