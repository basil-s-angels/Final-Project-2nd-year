"use client";

import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { LineItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";

export default function AdminHome() {
  const [overallBest, setOverallBest] = useState<Array<LineItem>>([]);
  const [overallWorst, setOverallWorst] = useState<Array<LineItem>>([]);
  const [dailyOrders, setDailyOrders] = useState<Array<LineItem>>([]);
  const [monthlyComparison, setMonthlyComparison] = useState<Array<LineItem>>(
    [],
  );
  const [employees, setEmployees] = useState<Array<LineItem>>([]);
  const [requests, setRequests] = useState<Array<LineItem>>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/statistics/overall-best`),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/statistics/overall-worst`),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/statistics/daily-orders`),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/statistics/monthly-comparison`,
      ),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/employees`),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/employees/requests`),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(
        ([
          overallBest,
          overallWorst,
          dailyOrders,
          monthlyComparison,
          employees,
          requests,
        ]) => {
          setOverallBest(overallBest);
          setOverallWorst(overallWorst);
          setDailyOrders(dailyOrders);
          setMonthlyComparison(monthlyComparison);
          setEmployees(employees);
          setRequests(requests);
        },
      )
      .catch((error) => console.error(error));
  }, []);

  console.log(overallBest, "best seller?");
  console.log(overallWorst, "worst seller?");
  console.log(dailyOrders, "daily avg");
  console.log(monthlyComparison, "monthly");
  console.log(employees, "emps");
  console.log(requests, "req");

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Comparison
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₱
                    {Number(
                      monthlyComparison[0] &&
                        monthlyComparison[0].this_month_revenue.toLocaleString(
                          "en-US",
                        ),
                    ).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Compared to ₱
                    {Number(
                      monthlyComparison[0] &&
                        monthlyComparison[0].last_month_revenue,
                    ).toFixed(2)}{" "}
                    last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders Today
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dailyOrders[0] && dailyOrders[0].invoices_today}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Compared to{" "}
                    {dailyOrders[0] && dailyOrders[0].invoices_yesterday} orders
                    from yesterday
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-7">
              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle>Overall Best Sellers</CardTitle>
                  <CardDescription>
                    Best selling products ever sold.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {overallBest.map((item: LineItem, index: number) => (
                    <div key={index}>
                      <div>
                        {index + 1}. {item.name}, Ordered {item.total} times
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="md:col-span-3 ">
                <CardHeader>
                  <CardTitle>Overall Worst Sellers</CardTitle>
                  <CardDescription>
                    Products that aren&apos;t performing well.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {overallWorst.map((item: LineItem, index: number) => (
                    <div key={index}>
                      <div>
                        {index + 1}. {item.name}, Ordered {item.total} times
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="text-center">Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  {employees.length !== 0 ? (
                    employees.map((item: any, index: number) => (
                      <div key={index}>
                        {index + 1}. {item.first_name} {item.last_name} (
                        {item.email})
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              className="basis-[10%] text-center text-sm ml-6"
                            >
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Warning!</DialogTitle>
                              <DialogDescription>
                                Would you like to remove this user?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  variant={"destructive"}
                                  onClick={async () => {
                                    fetch(
                                      `${process.env.NEXT_PUBLIC_SERVER_URL}/employees/${item.email}`,
                                      {
                                        method: "DELETE",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                      },
                                    )
                                      .then((response) => {
                                        response.json();
                                        console.log(
                                          `${item.first_name} deleted`,
                                        );
                                      })
                                      .catch((error) => console.error(error));
                                  }}
                                >
                                  Remove
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))
                  ) : (
                    <div>No employees...</div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle className="text-center">
                    Pending Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {requests.length !== 0 ? (
                    requests.map((item: any, index: number) => (
                      <div key={index}>
                        {index + 1}. {item.first_name} {item.last_name} (
                        {item.email})
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              className="basis-[10%] text-center text-sm"
                            >
                              Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Warning!</DialogTitle>
                              <DialogDescription>
                                Would you like to approve this user as an admin?
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  variant={"destructive"}
                                  onClick={async () => {
                                    fetch(
                                      `${process.env.NEXT_PUBLIC_SERVER_URL}/employees/requests`,
                                      {
                                        method: "PATCH",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          email: item.email,
                                        }),
                                      },
                                    )
                                      .then((response) => {
                                        response.json();
                                        console.log(
                                          `${item.first_name} updated`,
                                        );
                                      })
                                      .catch((error) => console.error(error));
                                  }}
                                >
                                  Approve
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))
                  ) : (
                    <div>No requests...</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
