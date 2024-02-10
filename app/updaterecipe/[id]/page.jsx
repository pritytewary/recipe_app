//1.First fetch the data from database
// /updaterecipe/id

import RecipeForm from "@/components/RecipeForm";
import getSingleRecipe from "./getSingleRecipe";

export default async function updateRecipe({ params }) {
  const { id } = params;
  const recipe = await getSingleRecipe({ id: id });
  if (!recipe) {
    return "Sorry! we don't Find your Recipe";
  }
  return <RecipeForm recipe={recipe} />;
}
