import Recipe from "@/models/recipe";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function getRecipe() {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) throw new Error("User not found");
    const recipes = await Recipe.find({ userEmail });
    console.log(recipes);
    return JSON.parse(JSON.stringify(recipes));
  } catch (error) {
    console.log(error);
    return [];
  }
}
