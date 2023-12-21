"use client";

import React, { useState } from "react";
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

const lineItems = [
  {
    num: 1,
    foodName: "Ceasar Salad",
    quantity: 3,
    price: 300,
  },
  {
    num: 2,
    foodName: "Borgir",
    quantity: 32,
    price: 230,
  },
  {
    num: 3,
    foodName: "Fried Chikn",
    quantity: 1,
    price: 60,
  },
  {
    num: 4,
    foodName: "Deluxe beef",
    quantity: 2,
    price: 500,
  },
  {
    num: 5,
    foodName: "Pizza",
    quantity: 1,
    price: 549,
  },
];

export default function OrderBoard() {
  const [position, setPosition] = useState("Waiting for payment");
  return (
    <main>
      <nav className="border border-white text-center">Order Board</nav>
      <div className="border border-slate-500 h-screen">
        <Card>
          <CardHeader className="flex-row">
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Created at: </p>
            <p>Table number: </p>
            <p>Invoice number: </p>
            <p>Comment: </p>
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
                {lineItems.map((lineItems) => (
                  <TableRow key={lineItems.num}>
                    <TableCell className="font-medium">
                      {lineItems.num}
                    </TableCell>
                    <TableCell>{lineItems.foodName}</TableCell>
                    <TableCell>{lineItems.quantity}</TableCell>
                    <TableCell className="text-right">
                      {lineItems.price}
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
