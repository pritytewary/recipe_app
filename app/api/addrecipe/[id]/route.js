import { connectMongoDB } from "@/lib";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  const recipe = Recipe.findOne({ _id: id });
  return NextResponse.json({ recipe }, { status: 200 });
}
