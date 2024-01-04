"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logout from "@/components/ui/logout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section>
      <nav className="flex flex-row items-center h-14 px-5 gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu className="w-8 h-8" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>[Position] Admin Name here...</SheetTitle>
              <SheetDescription className="flex flex-col">
                {pathname === "/admin" ? (
                  <Button disabled variant={"ghost"} className="font-bold">
                    Admin Dashboard
                  </Button>
                ) : (
                  <Button
                    variant={"ghost"}
                    className="font-bold"
                    onClick={() => {
                      router.push("/admin");
                      setOpen(false);
                    }}
                  >
                    Admin Dashboard
                  </Button>
                )}
                {pathname === "/admin/order-board" ? (
                  <Button disabled variant={"ghost"} className="font-bold">
                    Order Board
                  </Button>
                ) : (
                  <Button
                    variant={"ghost"}
                    className="font-bold"
                    onClick={() => {
                      router.push("/admin/order-board");
                      setOpen(false);
                    }}
                  >
                    Order Board
                  </Button>
                )}
                {pathname === "/admin/employee-page" ? (
                  <Button disabled variant={"ghost"} className="font-bold">
                    Done Orders
                  </Button>
                ) : (
                  <Button
                    variant={"ghost"}
                    className="font-bold"
                    onClick={() => {
                      router.push("/admin/employee-page");
                      setOpen(false);
                    }}
                  >
                    Done Orders
                  </Button>
                )}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              {pathname !== "/admin/login" && pathname !== "/admin/signup" ? (
                <SheetClose asChild>
                  <Logout setOpen={setOpen} />
                </SheetClose>
              ) : (
                <SheetClose asChild>
                  <Button disabled variant={"destructive"}>
                    Log out
                  </Button>
                </SheetClose>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
        {pathname === "/admin" && (
          <nav className="flex flex-row items-center justify-between self-center space-y-2 w-full">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </nav>
        )}
        {pathname === "/admin/order-board" && (
          <nav className="flex flex-row items-center justify-between self-center space-y-2 w-full">
            <h2 className="text-3xl font-bold tracking-tight">Order Board</h2>
          </nav>
        )}
      </nav>
      {children}
    </section>
  );
}
