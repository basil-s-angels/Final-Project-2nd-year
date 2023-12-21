"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineItem } from "@/lib/types";

export default function OrderBoard() {
  const [position, setPosition] = useState("Waiting for payment");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/invoices`)
      .then((response) => response.json())
      .then((results) => {
        setLineItems(results);
      });
  }, []);
  console.log(lineItems, "from usestate");

  const tableNumber: number = Number(lineItems[0]?.code.slice(0, -6));

  return (
    <main>
      <nav className="border border-white text-center">Order Board</nav>
      <div className="border border-slate-500 h-screen">
        <Card>
          <CardHeader className="flex-row">
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Created at: {lineItems[0]?.created_at}</p>
            <p>Table number: {tableNumber}</p>
            <p>Invoice number: {lineItems[0]?.id}</p>
            <p>Comment: {lineItems[0]?.comment}</p>
            <br />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{position}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="Waiting for payment">
                    Waiting for payment
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Pending">
                    Pending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Preparing">
                    Preparing
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Serving">
                    Serving
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Completed">
                    Completed
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <br />
            <br />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">num</TableHead>
                  <TableHead>food name</TableHead>
                  <TableHead>quantity</TableHead>
                  <TableHead className="text-right">price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineItems.map((lineItem, index) => (
                  <TableRow key={index + 1}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{lineItem.name}</TableCell>
                    <TableCell>{lineItem.quantity}</TableCell>
                    <TableCell className="text-right">
                      {lineItem.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">idk math </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
