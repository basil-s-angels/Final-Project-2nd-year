"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "./button";

export default function Logout() {
  const router = useRouter();

  async function userLogout() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        userLogout();
      }}
    >
      Log out
    </Button>
  );
}
