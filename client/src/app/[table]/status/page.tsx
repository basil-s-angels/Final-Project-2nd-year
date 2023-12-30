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
    setInterval(() => {
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
    }, 5000);
  }, [tablenum]);
  const currentStatus = foodOrders[0] ? foodOrders[0].status : "";

  function changeStatusColor(status: string) {
    if (status === "pending") {
      return "blue";
    } else if (status === "completed") {
      return "green";
    } else if (status === "serving") {
      return "pink";
    } else if (status === "waiting for order") {
      return "red";
    } else if (status === "preparing") {
      return "violet";
    }
  }

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
              <div>
                {foodOrders.map((foodOrder) => (
                  <div key={foodOrder.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p className="text-left">{foodOrder.name}</p>
                      </div>
                      <br></br>
                      <div>
                        <p className="text-right">
                          Quantity: {foodOrder.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 mb-2"></div>
              <div className="grid grid-cols-2"></div>
              <div className="p-10">
                The status of your order:
                <p style={{ color: changeStatusColor(currentStatus) }}>
                  {currentStatus}
                </p>
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
