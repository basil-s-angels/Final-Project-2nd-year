"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const response = await fetch("/auth/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      console.log("Received token:", token);
      // Save the token and redirect the user
    } else {
      const { message } = await response.json();
      console.error("Login failed:", message);
      // Show an error message to the user
    }
  };

  return (
    <main className="h-[100vh] flex flex-col justify-center items-center">
      <div className="border border-white p-6 text-center text-black">
        <h1 className="text-lg font-bold mb-6 text-white">Login</h1>
        <p className="mb-3 text-white">Welcome back, see you</p>
        <form
          className="flex flex-col gap-3 mx-auto max-w-md"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Email"
            className="pl-2 border border-black text-black"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="pl-2 border border-black text-black"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant={"default"}
            type="submit"
            className="w-40 self-center bg-green-800 mt-4"
          >
            Confirm
          </Button>
        </form>
      </div>
    </main>
  );
}
