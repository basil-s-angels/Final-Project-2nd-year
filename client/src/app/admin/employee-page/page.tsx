/* eslint-disable no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Invoice {
  total_price: number;
  quantity: number;
  id: number;
  name: string;
  comment: string;
  code: string;
  created_at: string;
  price: number;
  status: string;
}

interface EmployeeData {
  id: number;
  name: string;
}

export default function EmployeeDashboard() {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [groupData, setGroupData] = useState<any[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/employee`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "from useeffect");
        setEmployeeData(data);
        setInvoices(data);
        setGroupData(data);
      });
  }, []);

  async function handleClick(invoiceId: number) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/employee/${invoiceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "rows from the database");
        setSelectedInvoice(data);
      });
  }

  async function handleYearClick(year: number) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/employee/${year}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "rows from the database");
        setSelectedYear(year.toString()); // Set the selected year
      });
  }

  async function handleMonthClick(month: string) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/employee/${month}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "rows from the database");
        setSelectedMonth(month); // Set the selected month
      });
  }

  async function handleDayClick(day: string) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/employee/${day}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "rows from the database");
        setSelectedDay(day); // Set the selected day
      });
  }

  const totalAmountForAllOrders = () => {
    return invoices.reduce(
      (total, invoice) => total + invoice.price * invoice.quantity,
      0,
    );
  };

  let groupedData: any[] = [];

  groupData.forEach((item) => {
    let id = item.id;

    if (!groupedData[id - 1]) {
      groupedData[id - 1] = [];
    }
    groupedData[id - 1].push(item);
  });

  useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      // Filter the data based on the selected year, month, and day
      const filtered = groupedData.filter((item) => {
        const date = new Date(item[0].created_at);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based in JS
        const day = date.getDate();
        const yearMatches = year.toString() === selectedYear;
        const monthMatches = month.toString() === selectedMonth;
        const dayMatches = day.toString() === selectedDay;
        return yearMatches && monthMatches && dayMatches;
      });
      setFilteredData(filtered);
    }
  }, [selectedYear, selectedMonth, selectedDay]); // Removed groupedData from the dependency array

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
            Filter Orders
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => {
                  setSelectedYear(null);
                  setSelectedMonth(null);
                  setSelectedDay(null);
                  setFilteredData(groupedData); // Set filteredData to groupedData when "All" button is clicked
                }}
                className="bg-gray-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                All
              </Button>
              <Popover>
                <PopoverTrigger
                  className="bg-gray-500 hover:bg-green-700 text-white font-bold py-2 
                px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                  {selectedYear ? `Year: ${selectedYear}` : "Year"}
                </PopoverTrigger>
                <PopoverContent>
                  {[2020, 2021, 2022, 2023, 2024].map((year, index) => (
                    <button
                      key={index}
                      onClick={() => handleYearClick(year)}
                      className="block w-full text-left px-4 py-2 hover:bg-green-500 hover:text-white"
                    >
                      {year}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger
                  className="bg-gray-500 hover:bg-green-700 text-white font-bold py-2 
                px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                  {selectedMonth ? `Month: ${selectedMonth}` : "Month"}
                </PopoverTrigger>
                <PopoverContent className="max-h-60 overflow-auto">
                  {[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                  ].map((month, index) => (
                    <button
                      key={index}
                      onClick={() => handleMonthClick(month)}
                      className="block w-full text-left px-4 py-2 hover:bg-green-500 hover:text-white"
                    >
                      {month}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger
                  className="bg-gray-500 hover:bg-green-700 text-white font-bold py-2 
                px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                  {selectedDay ? `Day: ${selectedDay}` : "Day"}
                </PopoverTrigger>
                <PopoverContent className="max-h-60 overflow-auto">
                  {Array.from({ length: 31 }, (_, i) =>
                    (i + 1).toString().padStart(2, "0"),
                  ).map((day, index) => (
                    <button
                      key={index}
                      onClick={() => handleDayClick(day)}
                      className="block w-full text-left px-4 py-2 hover:bg-green-500 hover:text-white"
                    >
                      {day}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            {/* Display total amount for "Done" orders */}
            <div className="mb-4 text-left">
              <p className="text-2xl font-bold">
                Total Amount: P{totalAmountForAllOrders().toFixed(2)}
              </p>
            </div>
            {/* Display Done Orders table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg shadow overflow-hidden">
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="py-2 px-4 md:py-3 md:px-6 text-left">
                        Invoice No.
                      </TableHead>
                      <TableHead className="py-2 px-4 md:py-3 md:px-6 text-center">
                        Created at
                      </TableHead>
                      <TableHead className="py-2 px-4 md:py-3 md:px-6 text-right">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((invoice: any, index) => (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <div>
                            <TableRow
                              className="py-2 px-4 md:py-3 md:px-6 text-left hover:bg-gray-500 cursor-pointer"
                              onClick={async () => {
                                console.log("Clicked Invoice:", invoice[0]);
                                await handleClick(invoice[0]?.id);
                              }}
                            >
                              <TableCell>{invoice[0]?.id}</TableCell>
                              <TableCell className="py-2 px-4 md:py-3 md:px-6 text-center">
                                {invoice[0]?.created_at}
                              </TableCell>
                              <TableCell className="py-2 px-4 md:py-3 md:px-6 text-right">
                                P
                                {Number(
                                  invoice.reduce(
                                    (
                                      total: number,
                                      item: {
                                        price: any;
                                        quantity: number;
                                      },
                                    ) =>
                                      total +
                                      Number(item.price) * item.quantity,
                                    0,
                                  ),
                                ).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Invoice #{invoice[0]?.id}</DialogTitle>
                            <DialogDescription>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[100px] text-left">
                                      Num
                                    </TableHead>
                                    <TableHead className="text-left">
                                      Food Name
                                    </TableHead>
                                    <TableHead className="text-center">
                                      Quantity
                                    </TableHead>
                                    <TableHead className="text-right">
                                      Price
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {selectedInvoice &&
                                    selectedInvoice.rows.map(
                                      (lineItem: any, index: any) => (
                                        <TableRow key={index + 1}>
                                          <TableCell className="font-medium text-left">
                                            {index + 1}
                                          </TableCell>
                                          <TableCell className="text-left">
                                            {lineItem.name}
                                          </TableCell>
                                          <TableCell className="text-center">
                                            {lineItem.quantity}
                                          </TableCell>
                                          <TableCell className="text-right">
                                            {(
                                              lineItem.price * lineItem.quantity
                                            ).toFixed(2)}
                                          </TableCell>
                                        </TableRow>
                                      ),
                                    )}
                                </TableBody>
                                <TableFooter>
                                  <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">
                                      {selectedInvoice &&
                                        Number(
                                          selectedInvoice.rows.reduce(
                                            (
                                              total: number,
                                              item: {
                                                price: any;
                                                quantity: number;
                                              },
                                            ) =>
                                              total +
                                              Number(item.price) *
                                                item.quantity,
                                            0,
                                          ),
                                        ).toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                </TableFooter>
                              </Table>
                              <br />
                              Comments: {invoice[0].comment} <br />
                              Status: {invoice[0].status}
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </TableBody>
                </Table>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
