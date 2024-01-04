"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "./button";
import userLogout from "@/lib/userLogout";

export default function Logout({ setOpen }: any) {
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        userLogout();
        setOpen(false);
        router.push("/admin/login");
      }}
    >
      Log out
    </Button>
  );
}
