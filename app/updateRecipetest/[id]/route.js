import { connectMongoDB } from "@/lib";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function POST(req, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) throw new Error("User not found");
    const body = await req.json();
    await connectMongoDB();
    await Recipe.updateOne(
      { userEmail: userEmail, _id: id },
      {
        $set: body,
      }
    );
    return NextResponse.json({ message: "Recipe Update" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Recipe not update" }, { status: 500 });
  }
}
