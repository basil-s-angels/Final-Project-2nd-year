import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function OrderCard({
  lineItems,
  onRemoveOrder,
}: OrderCardProps & { onRemoveOrder: any }) {
  const [position, setPosition] = useState("");

  async function handleStatusChange(newStatus: SetStateAction<string>) {
    setPosition(newStatus);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/invoices`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          invoices: lineItems[0].id,
        }),
      },
    );

    if (response.ok) {
      const result = await response.json();
      console.log(result.status);
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
      onRemoveOrder(invoiceId);
      console.log(result.message);
    } else {
      console.error("HTTP error:", response.statusText);
    }
  }

  return (
    <Card className="bg-slate-900 w-auto md:w-[450px] max-h-full overflow-y-scroll shadow-lg shadow-slate-700/60">
      <CardHeader className="flex-row">
        <CardTitle className="flex flex-row items-center w-full">
          <div className="basis-[90%]">INVOICE #{lineItems[0].id}</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="basis-[10%] text-center text-sm"
              >
                Cancel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Warning!</DialogTitle>
                <DialogDescription>
                  Would you like to cancel this order from invoice number{" "}
                  {lineItems[0].id}?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={async () => {
                      await handleCancel(lineItems[0].id);
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
        <p className="text-sm">Table number: {lineItems[0].table_num}</p>
        <p className="text-sm">Created at: {lineItems[0].date_format}</p>
        <p className="text-sm break-all">Comment: {lineItems[0].comment}</p>
        <div className="flex justify-center mt-2 mb-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-slate-800 border-slate-600 capitalize"
              >
                {position || lineItems[0].status}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position || lineItems[0].status}
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
        </div>
        <Table className="md:text-sm text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-0">#</TableHead>
              <TableHead>food name</TableHead>
              <TableHead className="w-0">qty</TableHead>
              <TableHead className="text-right">price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map((lineItem, index) => (
              <TableRow key={index + 1}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{lineItem.name}</TableCell>
                <TableCell className="text-center">
                  {lineItem.quantity}
                </TableCell>
                <TableCell className="text-right">
                  ₱ {(lineItem.quantity * Number(lineItem.price)).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                ₱{" "}
                {Number(
                  lineItems.reduce(
                    (total, item) => total + Number(item.price) * item.quantity,
                    0,
                  ),
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
