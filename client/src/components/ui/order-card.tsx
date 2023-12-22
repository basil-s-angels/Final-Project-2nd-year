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
import { useState } from "react";
import { OrderCardProps } from "@/lib/types";

export default function OrderCard({ lineItems }: OrderCardProps) {
  const [, setPosition] = useState("");
  return (
    <Card>
      <CardHeader className="flex-row">
        <CardTitle>Invoice numbr {lineItems[0]?.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Table number: {lineItems[0]?.code.slice(0, -6)}</p>
        <p>Created at: {lineItems[0]?.created_at}</p>
        <p>Comment: {lineItems[0]?.comment}</p>
        <br />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="destructive">{lineItems[0]?.status}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={lineItems[0]?.status}
              onValueChange={setPosition}
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
