import { Button } from "@/components/ui/button";

export default function signUp() {
  return (
    <main className="h-[100vh]">
      <h1 className="ml-10 mt-4 mb-4 text-lg font-bold">Sign Up as an Admin</h1>
      <form className="flex flex-col gap-2 mx-auto max-w-md">
        <label htmlFor="position" className="-mt-3 text-center">
          Select user position:
        </label>
        <select
          id="position"
          name="position"
          className="pl-3 w-40 text-center mb-3 self-center border border-black"
          required
        >
          <option value="admin">Admin</option>
          <option value="cook">Cook</option>
          <option value="waiter">Waiter</option>
        </select>
        <input
          type="text"
          placeholder="First Name"
          className="pl-2 border border-black"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="pl-2 border border-black"
          required
        />
        <input
          type="text"
          placeholder="Email"
          className="pl-2 border border-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="pl-2 border border-black"
          required
        />
        <Button
          variant={"default"}
          type="submit"
          className="w-40 self-center bg-green-800 mt-4"
        >
          Submit
        </Button>
      </form>
    </main>
  );
}
