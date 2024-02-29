"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";
export default async function YourRecipe({ recipes }) {
  const router = useRouter();
  const deleteRecipe = async ({ id }) => {
    try {
      const res = await fetch(`/api/deleterecipe/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.refresh();
      alert("Recipe Deleted");
    } catch (error) {
      alert(error.message);
    }
  };

 

  return (
    <div>
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="bg-yellow-500 text-white shadow-md rounded p-6 mb-4"
        >
          <h2 className="text-xl font-semibold mb-2 text-purple-800">
            {recipe.recipeName}
          </h2>
          <p className="mb-4">
            <span className="font-semibold text-purple-800">Ingredients:</span>{" "}
            {recipe.ingredients}
          </p>
          <p>
            <span className="font-semibold text-purple-800">Procedure:</span>{" "}
            {recipe.procedure}
          </p>
          <div className="flex items-center space-x-10 mt-4 justify-between">
            <button
              onClick={() => deleteRecipe({ id: recipe._id })}
              className="w-10 h-10 bg-zinc-50 flex items-center justify-center rounded-full"
            >
              <MdDelete size={25} className="text-right text-red-600" />
            </button>

            <Link
              href={`/updaterecipe/${recipe._id}`}
              className="w-10 h-10 bg-zinc-50 flex items-center justify-center rounded-full"
            >
              <MdEdit size={25} className="text-blue-700" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
