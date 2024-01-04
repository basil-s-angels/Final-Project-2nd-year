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

export default function AdminHome() {
  const [overallBest, setOverallBest] = useState<Array<LineItem>>([]);
  const [overallWorst, setOverallWorst] = useState<Array<LineItem>>([]);
  const [dailyAvg, setDailyAvg] = useState<Array<LineItem>>([]);
  const [monthlyComparison, setMonthlyComparison] = useState<Array<LineItem>>(
    [],
  );

  async function fetchData() {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/menu/overall-best`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((results) => {
        setOverallBest(results);
      })
      .catch((error) => console.error(error));

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/menu/overall-worst`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((results) => {
        setOverallWorst(results);
      })
      .catch((error) => console.error(error));

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/menu/daily-average`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((results) => {
        setDailyAvg(results);
      })
      .catch((error) => console.error(error));

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/menu/monthly-comparison`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((results) => {
        setMonthlyComparison(results);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(overallBest, "best seller?");
  console.log(overallWorst, "worst seller?");
  console.log(dailyAvg, "daily avg");
  console.log(monthlyComparison, "monthly");

  return (
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                          monthlyComparison[0].this_month_revenue,
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
                      Average Daily Orders
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
                      {Number(dailyAvg[0] && dailyAvg[0].avg).toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      thats not alot sad
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
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
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
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
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
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
                <Card className="col-span-3">
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
