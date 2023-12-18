"use client";
// EmployeeDashboard.jsx
import { useState } from "react";

// Interface definitions

interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
}

interface Order {
  id: number;
  tableNumber: number;
  orderDate: string;
  amount: number;
}

// Example data

const employees: Employee = {
  id: 1234,
  name: "basil amso",
  position: "waiter",
  email: "help@cpu.com",
};

const orders: Order[] = [
  {
    id: 1,
    tableNumber: 5,
    orderDate: "2023-04-06",
    amount: 35.99,
  },
  {
    id: 2,
    tableNumber: 10,
    orderDate: "2023-04-06",
    amount: 300.99,
  },
  {
    id: 3,
    tableNumber: 10,
    orderDate: "2023-04-06",
    amount: 300.99,
  },
  {
    id: 4,
    tableNumber: 10,
    orderDate: "2023-04-06",
    amount: 300.99,
  },
  {
    id: 5,
    tableNumber: 11,
    orderDate: "2020-04-06",
    amount: 1000.99,
  },
  {
    id: 5,
    tableNumber: 1,
    orderDate: "2020-04-05",
    amount: 2000,
  },
  {
    id: 5,
    tableNumber: 2,
    orderDate: "2019-04-05",
    amount: 5000,
  },
];

export default function EmployeeDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const calculateTotalAmount: () => number = () => {
    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    return parseFloat(totalAmount.toFixed(2));
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-white mb-4 md:mb-8">
          Employee Dashboard
        </h1>

        <div className="flex-1">
          <div className="mb-4 grid text-white grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-12">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-lg font-semibold text-black">
                Name: {employees.name}
              </p>
              <p className="text-lg text-black">ID: {employees.id}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-4 md:mb-8 p-3 md:p-6 bg-gradient-to-r from-green-300 via-green-500 to-green-700 rounded-lg shadow-lg">
          <button className="px-3 md:px-4 py-2 bg-transparent text-white rounded hover:bg-green-800 duration-300 ease-in-out transform hover:-translate-y-1 mr-2 md:mr-4">
            Tables
          </button>
          <button className="px-3 md:px-4 py-2 bg-transparent text-white rounded hover:bg-green-800 duration-300 ease-in-out transform hover:-translate-y-1">
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
              <div className="absolute top-14 left-0 bg-white p-4 rounded shadow-lg">
                <h3 className="text-lg md:text-xl text-center text-black font-semibold mt-2">
                  {employees.name}
                </h3>
                <p className="text-sm md:text-base text-center text-black text-gray-600">
                  {employees.position}
                </p>
                <p className="text-sm md:text-base text-black text-center">
                  {employees.email}
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    className="px-3 md:px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className="px-3 md:px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 mb-4 md:mb-8">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">
              Done Orders
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="py-2 px-4 md:py-3 md:px-6 text-left text-black">
                      Table No.
                    </th>
                    <th className="py-2 px-4 md:py-3 md:px-6 text-center text-black">
                      Date
                    </th>
                    <th className="py-2 px-4 md:py-3 md:px-6 text-right text-black">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {sortedOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4 md:py-3 md:px-6 text-left text-black">
                        Table {order.tableNumber}
                      </td>
                      <td className="py-2 px-4 md:py-3 md:px-6 text-center text-black">
                        {order.orderDate}
                      </td>
                      <td className="py-2 px-4 md:py-3 md:px-6 text-right text-black">
                        P {order.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {/* Display total amount row */}
                  <tr className="bg-gray-200">
                    <td
                      colSpan={2}
                      className="py-2 px-4 md:py-3 md:px-6 text-left text-black font-semibold"
                    >
                      Total Amount:
                    </td>
                    <td className="py-2 px-4 md:py-3 md:px-6 text-right text-black font-semibold">
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
