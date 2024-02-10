"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function RegisterForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !password) {
      setError("All feilds are Necessery");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });
      if (res.ok) {
        setFullname("");
        setEmail("");
        setPassword("");
      } else {
        console.log("User Registration Failed");
      }
    } catch (error) {
      console.log("Error during Registration", error);
    }
  };

  return (
    <div className=" h-screen place-items-center grid ">
      <div className="shadow-lg p-10 rounded border-4 border-blue-700 space-y-2">
        <h1 className="text-3xl font-bold text-white">Register your Account</h1>
        <form
          action=""
          className="flex flex-col space-y-3 "
          onSubmit={handleSubmit}
        >
          <label htmlFor="" className="text-blue-500 font-medium">
            Full Name
          </label>
          <input
            type="text"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            placeholder="Enter your fullname"
            className="px-2 py-1 bg-zinc-50 shadow-md placeholder-slate-300 w-[340px] border border-gray-200 "
          />

          <label htmlFor="" className="text-blue-500 font-medium">
            Email
          </label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="px-2 py-1 bg-zinc-50 shadow-md placeholder-slate-300 w-[340px] border border-gray-200 "
          />
          <label htmlFor="" className="text-blue-500 font-medium">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type your password"
            className="px-2 py-1 bg-zinc-50 shadow-md placeholder-slate-300 w-[340px] border border-gray-200 "
          />
          <button
            className="mt-2 bg-blue-500  py-1 text-white font-bold"
            type="submit"
          >
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit rounded-md text-xs py-1 px-3 mt-3">
              {error}
            </div>
          )}
          <Link href={"/"} className="text-sm  text-right mt-3 text-white ">
            Allready have an account ? <span className="underline">Log in</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
