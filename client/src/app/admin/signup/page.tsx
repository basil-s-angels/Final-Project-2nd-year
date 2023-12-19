"use client";

import Form from "./form";
import fetchUser from "@/lib/getUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { UserJWT } from "@/lib/types";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState<UserJWT | null>(null);

  useEffect(() => {
    fetchUser()
      .then((user) => setUser(user))
      .catch((error) => console.error(error));
  }, []);

  if (user == null) {
    return <Form />;
  } else {
    router.push("/admin");
  }
}
