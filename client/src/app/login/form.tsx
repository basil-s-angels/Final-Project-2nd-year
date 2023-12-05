"use client";

import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

// import React, { useState } from 'react';

// const LoginPage: React.FC = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setUsername(event.target.value);
//     };

//     const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(event.target.value);
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         // Perform login logic here
//         console.log(`Username: ${username}, Password: ${password}`);
//     };

//     return (
//         <div className="login-page">
//             <form onSubmit={handleSubmit} className="login-form">
//                 <label>
//                     Username:
//                     <input type="text" value={username} onChange={handleUsernameChange} />
//                 </label>
//                 <label>
//                     Password:
//                     <input type="password" value={password} onChange={handlePasswordChange} />
//                 </label>
//                 <input type="submit" value="Log In" />
//             </form>
//         </div>
//     );
// };

// export default LoginPage;

export default function Form() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const response = await signIn("credentials", {
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    //   redirect: false,
    // });
    // console.log({ response });
    // if (!response?.error) {
    //   router.push("/admin");
    //   router.refresh();
    // }
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
