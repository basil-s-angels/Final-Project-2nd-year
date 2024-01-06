"use client";

import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const User = z.object({
  first_name: z.string().min(1).max(18),
  last_name: z.string().min(1).max(18),
  email: z.string().email({ message: "Must be a valid email." }),
  password: z
    .string()
    .min(6, { message: "Must be at least 6 characters long" })
    .max(10, { message: "Must be less than 10 characters long" }),
});

export default function Form() {
  const router = useRouter();

  const validateUser = (inputs: unknown) => {
    return User.safeParse(inputs);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const parsedData = validateUser({
        position: formData.get("position"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });

      if (parsedData.success) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              position: formData.get("position"),
              first_name: formData.get("first_name"),
              last_name: formData.get("last_name"),
              email: formData.get("email"),
              password: formData.get("password"),
            }),
          },
        );

        if (response.ok) {
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log("success!", data);
            router.push("/admin/login");
          } else {
            console.error("Unexpected response format");
          }
        }
      } else {
        console.error("Validation error:", parsedData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="h-[100vh]">
      <h1 className="ml-10 mt-4 mb-4 text-lg font-bold">
        Sign Up! Already have an account?
        <Button variant="link" onClick={() => router.push("/admin/login")}>
          Log in
        </Button>
      </h1>
      <form
        className="flex flex-col gap-2 mx-auto max-w-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="position" className="-mt-3 text-center">
          Select user position:
        </label>
        <select
          id="position"
          name="position"
          className="pl-3 w-40 text-center mb-3 self-center border border-black rounded-lg h-10 dark:text-black"
          required
        >
          <option value="admin request">Request Admin Privileges</option>
          <option value="cook">Cook</option>
          <option value="service">Service</option>
        </select>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          className="pl-2 border border-black rounded-lg h-10 dark:text-black"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="pl-2 border border-black rounded-lg h-10 dark:text-black"
          required
        />
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
