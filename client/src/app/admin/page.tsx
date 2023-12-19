"use client";

import React, { useEffect, useState } from "react";

import { UserJWT } from "@/lib/types";
import fetchUser from "@/lib/getUser";
import Logout from "@/components/ui/logout";

export default function AdminHome() {
  let [user, setUser] = useState<UserJWT | null>(null);

  useEffect(() => {
    fetchUser()
      .then((user) => setUser(user))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <h1>if you see this, that means i am logged in!!!!!</h1>
      hello {user && user.firstName}!<br />
      <Logout />
    </main>
  );
}
