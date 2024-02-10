import LogInForm from "@/components/LogInForm";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/addrecipe");
  return (
    <main className=" bg-gray-800  ">
      <LogInForm />
    </main>
  );
}
