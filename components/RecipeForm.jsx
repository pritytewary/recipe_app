"use client";

import { IoFastFoodOutline } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function RecipeForm({ recipe }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    recipeName: recipe ? recipe.recipeName : "",
    ingredients: recipe ? recipe.ingredients : "",
    procedure: recipe ? recipe.procedure : "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    if (!form.recipeName || !form.ingredients || !form.procedure) {
      setError("All fields are necessery");
      return;
    }

    try {
      const res = await fetch(
        recipe ? `/api/updaterecipe/${recipe._id}` : "/api/addrecipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
          }),
        }
      );
      if (res.ok) {
        router.refresh();
        alert("Recipe Added");

        console.log("recipe added");
      } else {
        const errorMessage = await res.text();
        alert("Recipe add failed");
        console.log("Recipe add failed:", errorMessage);
      }
    } catch (error) {
      alert("Recipe does not Add");
      console.log("Error during added recipe", error);
    }
  };

  return (
    <div className="pt-4   bg-gray-800  ">
      <div className="flex items-center justify-between px-24 ">
        <div className="text-yellow-500">
          <IoFastFoodOutline size={100} className="" />
        </div>
        <h1 className="text-white text-5xl font-signature font-bold">Foodcy</h1>

        <nav className="text-right flex gap-3">
          <Link href={"/yourrecipe"}>
            <button className="bg-yellow-400 text-white px-3 py-2 rounded-md font-bold ">
              Your Recipe
            </button>
          </Link>
          <button
            className="bg-yellow-400 text-white px-3 py-2 rounded-md font-bold "
            onClick={() => signOut()}
          >
            Logout
          </button>
        </nav>
      </div>
      <div className=" h-screen flex items-center justify-center ">
        <div className="shadow-lg px-10 py-8  rounded border-4 border-blue-700 space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {" "}
            {recipe ? "Update Your Recipe" : "Add your Recipe"}
          </h1>
          <div className="flex flex-col space-y-3 ">
            <label htmlFor="" className="text-blue-500 font-medium">
              Recipe Name
            </label>
            <input
              type="text"
              value={form.recipeName}
              onChange={(e) => setForm({ ...form, recipeName: e.target.value })}
              placeholder="Enter Recipe Name"
              className="px-2 py-1 bg-zinc-50 shadow-md placeholder-slate-300 w-[500px] border border-gray-200 "
            />

            <label htmlFor="" className="text-blue-500 font-medium">
              Ingredinents
            </label>
            <textarea
              type="text"
              value={form.ingredients}
              onChange={(e) =>
                setForm({ ...form, ingredients: e.target.value })
              }
              placeholder="Write the ingredinents"
              className="px-2 py-1 bg-zinc-50 shadow-md placeholder-slate-300 w-[500px] border border-gray-200 "
              rows={5}
            ></textarea>
            <label htmlFor="" className="text-blue-500 font-medium">
              Procedure
            </label>
            <textarea
              rows={5}
              type="text"
              value={form.procedure}
              onChange={(e) => setForm({ ...form, procedure: e.target.value })}
              placeholder=" write your Procedure"
              className="px-2 py-1 bg-zinc-50 shadow-md placeholder-slate-300 w-[500px] border border-gray-200 "
            ></textarea>
            <button
              className="mt-2 bg-blue-500 px-2 py-1 text-white font-bold"
              type="submit"
              onClick={handleSubmit}
            >
              {recipe ? "Update" : "Add"}
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit rounded-md text-xs py-1 px-3 mt-3">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
