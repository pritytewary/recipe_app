"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { GiOpenedFoodCan } from "react-icons/gi";
export default function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        console.log("error occurs");
        setError("Invalid credentials");

        return;
      }
      router.refresh();
      router.replace("addrecipe");

      console.log("Login Successfull");
    } catch (error) {
      console.log("error when logging in ", error);
    }
  };

  return (
    <div className=" h-screen   ">
      <nav>
        <div className="flex space-x-3 px-4 items-center  pt-4 ">
          <GiOpenedFoodCan size={80} className="text-yellow-600" />
          <h1 className=" text-3xl text-white font-signature">Recepies</h1>
        </div>
      </nav>
      <div className="flex items-center justify-center py-10 gap-40">
        <div>
          <Image src={"/recipe.jpg"} width={500} height={500} />
        </div>
        <div className="shadow-lg p-10 rounded border-4 border-blue-700 space-y-2">
          <h1 className="text-3xl font-bold text-white">Log In</h1>
          <form
            action=""
            className="flex flex-col space-y-3 "
            onSubmit={handleSubmit}
          >
            <label htmlFor="" className="text-blue-500 font-medium">
              Email
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="px-2 py-1 bg-zinc-50 shadow-md placeholder-slate-300 w-[300px] border border-gray-200 "
            />
            <label htmlFor="" className="text-blue-500 font-medium">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="type your password"
              className="px-2 py-1 bg-zinc-50 shadow-md placeholder-slate-300 w-[300px] border border-gray-200 "
            />
            <button
              className="mt-2 bg-blue-500 px-2 py-1 text-white font-bold"
              type="submit"
            >
              LogIn
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit rounded-md text-xs py-1 px-3 mt-3">
                {error}
              </div>
            )}
            <Link
              href={"/register"}
              className="text-sm  text-right mt-3 text-white"
            >
              Don't have an account? <span className="underline">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
