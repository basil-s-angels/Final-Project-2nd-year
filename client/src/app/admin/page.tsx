"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/admin", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newData = await response.json();
        console.log("response: ", response);
        console.log("newdata: ", newData);
      } else {
        if (response.status === 401) {
          router.push("/");
        } else {
          console.error(response.status);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>ADMIN PAGE YOU MUST BE LOGGGED IN TO ACCESS THIS TEST.</h1>
      <p>yes</p>
    </main>
  );
}
