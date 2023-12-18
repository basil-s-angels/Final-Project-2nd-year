"use client";
import React, { useState, useEffect } from "react";

export default function EmployeeDashboard() {
  /// these are hooks
  const [isOpen, setIsOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<any | null>(null);
  const [orderData, setOrderData] = useState<any[]>([]);

  /// this is for the fetch from datbase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await fetch("/employee", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: 5 }),
        });

        if (!employeeResponse.ok) {
          throw new Error(`error! status: ${employeeResponse.status}`);
        }

        const employeeData = await employeeResponse.json();
        setEmployeeData(employeeData);

        const ordersResponse = await fetch("/orders");
        if (!ordersResponse.ok) {
          throw new Error(`error! status: ${ordersResponse.status}`);
        }

        const orderData = await ordersResponse.json();
        setOrderData(orderData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalAmount = () => {
    const totalAmount = orderData.reduce((sum, order) => sum + order.amount, 0);
    return parseFloat(totalAmount.toFixed(2));
  };

  const sortedOrders = [...orderData].sort(
    (a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
  );

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-white">
      <div className="container mx-auto bg-gray-800 rounded-lg shadow-lg p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8">
          Employee Dashboard
        </h1>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-12">
          <div className="bg-gray-700 p-4 rounded shadow">
            <p className="text-lg font-semibold">Name: {employeeData?.name}</p>
            <p className="text-lg">ID: {employeeData?.id}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-8 p-3 md:p-6 bg-gradient-to-r from-green-300 via-green-500 to-green-700 rounded-lg shadow-lg">
          <button className="px-4 py-2 bg-transparent rounded hover:bg-green-800 duration-300 ease-in-out transform hover:-translate-y-1 mb-2 md:mb-0">
            Tables
          </button>
          <button className="px-4 py-2 bg-transparent rounded hover:bg-green-800 duration-300 ease-in-out transform hover:-translate-y-1">
            Orders
          </button>
        </div>

        <div className="fixed top-0.5 left-2 w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex justify-start items-center">
              <button
                className="h-12 w-12 flex flex-col justify-center items-center group mr-4"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div
                  className={`h-1 w-6 my-1 bg-white rounded transition duration-300 ease-in-out ${
                    isOpen ? "transform rotate-45 translate-y-2.5" : ""
                  }`}
                />
                <div
                  className={`h-1 w-6 my-1 bg-white rounded transition duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <div
                  className={`h-1 w-6 my-1 bg-white rounded transition duration-300 ease-in-out ${
                    isOpen ? "transform -rotate-45 -translate-y-2.5" : ""
                  }`}
                />
              </button>
            </div>
            {isOpen && (
              <div className="absolute top-14 left-0 bg-gray-700 p-4 rounded shadow-lg">
                <h3 className="text-lg md:text-xl text-center font-semibold mt-2">
                  {employeeData?.name}
                </h3>
                <p className="text-sm md:text-base text-center">
                  {employeeData?.position}
                </p>
                <p className="text-sm md:text-base text-center">
                  {employeeData?.email}
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 rounded hover:bg-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-8">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
              Done Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg shadow overflow-hidden">
                <thead className="bg-gray-600 text-gray-200">
                  <tr>
                    <th className="py-2 px-4 md:py-3 md:px-6 text-left">
                      Table No.
                    </th>
                    <th className="py-2 px-4 md:py-3 md:px-6 text-center">
                      Date
                    </th>
                    <th className="py-2 px-4 md:py-3 md:px-6 text-center">
                      Food Name
                    </th>
                    <th className="py-2 px-4 md:py-3 md:px-6 text-center">
                      Quantity
                    </th>
                    <th className="py-2 px-4 md:py-3 md:px-6 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  {sortedOrders.map((order: any) => (
                    <tr key={order.id} className="border-b hover:bg-gray-600">
                      <td className="py-2 px-4 md:py-3 md:px-6 text-left">
                        Table {order.tableNumber}
                      </td>
                      <td className="py-2 px-4 md:py-3 md:px-6 text-center">
                        {order.orderDate}
                      </td>
                      <td className="py-2 px-4 md:py-3 md:px-6 text-center">
                        {order.foodName}
                      </td>
                      <td className="py-2 px-4 md:py-3 md:px-6 text-center">
                        {order.quantity}
                      </td>
                      <td className="py-2 px-4 md:py-3 md:px-6 text-right">
                        P {order.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-600">
                    <td
                      colSpan={3}
                      className="py-2 px-4 md:py-3 md:px-6 text-left font-semibold"
                    >
                      Total Amount:
                    </td>
                    <td className="py-2 px-4 md:py-3 md:px-6 text-center font-semibold">
                      {orderData.length > 0 && orderData[0].quantity} items
                    </td>
                    <td className="py-2 px-4 md:py-3 md:px-6 text-right font-semibold">
                      P{calculateTotalAmount()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
