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

import { SetStateAction, useState } from "react";
import { OrderCardProps } from "@/lib/types";

export default function OrderCard({ lineItems }: OrderCardProps) {
  const [position, setPosition] = useState("");

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
    } else {
      console.error("HTTP error:", response.statusText);
    }
  }

  async function handleCancel(invoiceId: number) {
    console.log("cancelled order from invoice", invoiceId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/invoices/${invoiceId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
    } else {
      console.error("HTTP error:", response.statusText);
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row">
        <CardTitle className="flex flex-row items-center w-full">
          <div className="basis-[90%]">Invoice number {lineItems[0]?.id}</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="basis-[10%] text-center text-base"
              >
                Cancel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Warning!</DialogTitle>
                <DialogDescription>
                  Would you like to cancel this order from invoice number{" "}
                  {lineItems[0]?.id}?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={async () => {
                      await handleCancel(lineItems[0]?.id);
                    }}
                  >
                    Cancel Order
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Table number: {lineItems[0]?.table_num}</p>
        <p>Created at: {lineItems[0]?.created_at}</p>
        <p>Comment: {lineItems[0]?.comment}</p>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-slate-900">
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
