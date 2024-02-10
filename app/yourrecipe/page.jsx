import YourRecipe from "./YourRecipe";
import getRecipe from "./getrecipe";

export default async function RecipePage() {
  const recipes = await getRecipe();

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Delicious Recipes
        </h1>
        <YourRecipe recipes={recipes} />
      </div>
    </div>
  );
}
