"use client";

import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Form() {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })
  };

  return (
    <main>
      <h1 className="ml-10 mt-4 mb-4 text-lg font-bold">
        Sign Up as an Admin.
      </h1>
      <form
        className="flex flex-col gap-2 mx-auto max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="pl-2 border border-black rounded-lg h-10 dark:text-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="pl-2 border border-black rounded-lg h-10 dark:text-black"
          required
        />
        <Button
          variant={"default"}
          type="submit"
          className="w-40 self-center bg-green-800 mt-4 dark:text-white"
        >
          Submit
        </Button>
      </form>
    </main>
  );
}
