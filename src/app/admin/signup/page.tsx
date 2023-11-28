import Form from "./form";
import { getServerSession } from "next-auth";

export default async function signUp() {
  const session = await getServerSession();
  return <Form />;
}
