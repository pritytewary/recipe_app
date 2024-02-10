import Recipe from "@/models/recipe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function getSingleRecipe({ id }) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) throw new Error("User not found");
    const recipe = await Recipe.findOne({ userEmail, _id: id });
    if (!recipe) {
      throw new Error("Recipe not found");
    }
    console.log(recipe);
    return JSON.parse(JSON.stringify(recipe));
  } catch (error) {
    console.log(error);
    return null;
  }
}
