/* eslint-disable no-unused-vars */
"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";

interface Invoice {
  quantity: number;
  id: number;
  name: string;
  comment: string;
  code: string;
  created_at: string;
  price: number;
  status: string;
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
  const [activeFilter, setActiveFilter] = useState<string>("daily");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null,
  );
  const [isDetailViewVisible, setIsDetailViewVisible] =
    useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/employee`)
      .then((response) => response.json())
      .then((data) => {
        setEmployeeData(data);
        setInvoices(data);
      });
  }, []);

  const totalAmountForAllOrders = () => {
    return invoices.reduce(
      (total, invoice) => total + invoice.price * invoice.quantity,
      0,
    );
  };

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

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-8">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
              Done Orders
            </h2>

            {/* Filter buttons */}
            <div className="flex mb-4">
              <button
                className={`px-4 py-2 rounded mr-2 ${
                  activeFilter === "daily" ? "bg-green-500" : "bg-gray-500"
                }`}
                onClick={() => {
                  setTimeFilter("daily");
                  setActiveFilter("daily");
                }}
              >
                Daily
              </button>
              <button
                className={`px-4 py-2 rounded mr-2 ${
                  activeFilter === "monthly" ? "bg-green-500" : "bg-gray-500"
                }`}
                onClick={() => {
                  setTimeFilter("monthly");
                  setActiveFilter("monthly");
                }}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeFilter === "yearly" ? "bg-green-500" : "bg-gray-500"
                }`}
                onClick={() => {
                  setTimeFilter("yearly");
                  setActiveFilter("yearly");
                }}
              >
                Yearly
              </button>
            </div>

            {/* Display total amount */}
            <div className="text-xl font-semibold mb-4">
              Total Amount: P{totalAmountForAllOrders().toFixed(2)}
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
                  </tr>
                </thead>

                <tbody className="text-gray-200">
                  {invoices.map((invoice, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setSelectedInvoiceId(invoice.id);
                        setIsDetailViewVisible(!isDetailViewVisible);
                      }}
                    >
                      <td className="py-2 px-4 md:py-3 md:px-6 text-left">
                        {invoice?.id}
                      </td>
                      <td className="py-2 px-4 md:py-3 md:px-6 text-center">
                        {invoice?.created_at}
                      </td>
                      <td className="py-2 px-4 md:py-3 md:px-6 text-right">
                        P{(invoice?.price * invoice.quantity).toFixed(2)}
                      </td>

                      {selectedInvoiceId === invoice.id &&
                        isDetailViewVisible && (
                          <td colSpan={4}>
                            <div>
                              <p>Name: {invoice.name}</p>
                              <p>
                                Price: P
                                {(invoice.price * invoice.quantity).toFixed(2)}
                              </p>
                              <p>Quantity: {invoice.quantity}</p>
                              <p>Comment: {invoice.comment}</p>
                              <p>Created At: {invoice.created_at}</p>
                              <p>Status: {invoice.status}</p>
                              <button
                                className="px-4 py-2 bg-transparent rounded hover:bg-green-800"
                                onClick={() => setIsDetailViewVisible(false)}
                              >
                                Back
                              </button>
                            </div>
                          </td>
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
