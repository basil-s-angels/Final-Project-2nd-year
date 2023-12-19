"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { UserJWT } from "@/lib/types";
import fetchUser from "@/lib/getUser";
import Logout from "@/components/ui/logout";

export default function AdminHome() {
  let [user, setUser] = useState<UserJWT | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUser()
      .then((user) => {
        if (user === undefined) router.push("/admin/login");
        else setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main>
      <h1>if you see this, that means i am logged in!!!!!</h1>
      hello {user && user.firstName}!<br />
      <Logout />
    </main>
  );
}
