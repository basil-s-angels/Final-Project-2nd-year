/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";

interface Invoice {
  invoice_id: number;
  created_at: string;
  price: number;
}

interface Order {
  orderDate: string;
  id: number;
  InvoiceNumber: string;
  amount: number;
}

interface EmployeeData {
  id: number;
  name: string;
}

export default function EmployeeDashboard() {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [orderData] = useState<Order[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("daily");
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/employee`)
      .then((response) => response.json())
      .then((data) => {
        setEmployeeData(data);
        setInvoices(data);
        console.log(data);
      });
  }, []);

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
            Edit Menu
          </button>
          <button className="px-4 py-2 bg-transparent rounded hover:bg-green-800 duration-300 ease-in-out transform hover:-translate-y-1">
            Orders
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-8">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
              Done Orders
            </h2>
            {/* Filter buttons */}
            <div className="flex mb-4">
              <button
                className={`px-4 py-2 rounded mr-2 ${
                  timeFilter === "daily" ? "bg-green-500" : "bg-gray-500"
                }`}
                onClick={() => setTimeFilter("daily")}
              >
                Daily
              </button>
              <button
                className={`px-4 py-2 rounded mr-2 ${
                  timeFilter === "monthly" ? "bg-green-500" : "bg-gray-500"
                }`}
                onClick={() => setTimeFilter("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  timeFilter === "yearly" ? "bg-green-500" : "bg-gray-500"
                }`}
                onClick={() => setTimeFilter("yearly")}
              >
                Yearly
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-8">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
                  Done Orders
                </h2>
                {/* Filter buttons */}
                <div className="flex mb-4">
                  {/* ... (existing filter buttons) */}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-700 rounded-lg shadow overflow-hidden">
                    <thead className="bg-gray-600 text-gray-200">
                      <tr>
                        <th className="py-2 px-4 md:py-3 md:px-6 text-left">
                          Invoice No.
                        </th>
                        <th className="py-2 px-4 md:py-3 md:px-6 text-center">
                          Order Date
                        </th>
                        <th className="py-2 px-4 md:py-3 md:px-6 text-right">
                          Amount
                        </th>
                        <th className="py-2 px-4 md:py-3 md:px-6 text-right">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-200">
                      {invoices.map((invoice, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 md:py-3 md:px-6 text-left">
                            {invoice?.invoice_id}
                          </td>
                          <td className="py-2 px-4 md:py-3 md:px-6 text-center">
                            {invoice?.created_at}
                          </td>
                          <td className="py-2 px-4 md:py-3 md:px-6 text-right">
                            P{invoice?.price}
                          </td>
                          <td className="py-2 px-4 md:py-3 md:px-6 text-right">
                            {/* Calculate total amount for the specific order */}
                            {invoices
                              .filter(
                                (invoice) =>
                                  invoice.invoice_id === invoice.invoice_id,
                              )
                              .reduce(
                                (total, invoice) => total + invoice.price,
                                0,
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
