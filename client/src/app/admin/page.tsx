"use client";

import React, { useEffect, useState } from "react";

export default function AdminHome() {
  let [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const result = await response.json();
          setName(result.user.firstName);
          console.log("this is the result: ", result.user.firstName);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <main>
      <h1>if you see this, that means i am logged in!!!!!</h1>
      hello {name}!
    </main>
  );
}
