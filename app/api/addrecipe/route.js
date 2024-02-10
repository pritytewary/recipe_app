import { connectMongoDB } from "@/lib";
import Recipe from "@/models/recipe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) throw new Error("User not found");

    const { recipeName, ingredients, procedure } = await req.json();

    await connectMongoDB();
    await Recipe.create({ recipeName, ingredients, procedure, userEmail });
    console.log("Recipe added succesfully");
    return NextResponse.json({ message: "Recipe was added" }, { status: 201 });
  } catch (error) {
    console.log("not added", error);
    return NextResponse.json(
      { message: "Recipe was not added" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const recipes = await Recipe.find();
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
