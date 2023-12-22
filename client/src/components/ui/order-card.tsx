/* eslint-disable no-unused-vars */
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
import { SetStateAction, useState } from "react";
import { OrderCardProps } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function OrderCard({ lineItems }: OrderCardProps) {
  const [position, setPosition] = useState("");
  const router = useRouter();

  async function handleStatusChange(newStatus: SetStateAction<string>) {
    setPosition(newStatus);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/updateStatus`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          invoices: lineItems[0]?.id,
        }),
      },
    );

    if (response.ok) {
      const result = await response.json();
      console.log(result.message, result.status);
      // if (result.status === 'completed') {
      //   router.refresh();
      // }
    } else {
      console.error("HTTP error:", response.statusText);
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row">
        <CardTitle>Invoice number {lineItems[0]?.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Table number: {lineItems[0]?.code.slice(0, -6)}</p>
        <p>Created at: {lineItems[0]?.created_at}</p>
        <p>Comment: {lineItems[0]?.comment}</p>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="destructive">
              {position || lineItems[0]?.status}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position || lineItems[0]?.status}
              onValueChange={handleStatusChange}
            >
              <DropdownMenuRadioItem value="waiting for payment">
                Waiting for payment
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="pending">
                Pending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="preparing">
                Preparing
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="serving">
                Serving
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="completed">
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
                <TableCell className="text-right">{lineItem.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {lineItems.reduce(
                  (total, item) => total + Number(item.price) * item.quantity,
                  0,
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
