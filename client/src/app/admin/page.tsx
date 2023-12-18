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
        router.push("/admin/employee-page");
      } else {
        if (response.status === 401) {
          router.push("/admin/login");
        } else {
          console.error(response.status);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Checking if logged in...</h1>
    </main>
  );
}
