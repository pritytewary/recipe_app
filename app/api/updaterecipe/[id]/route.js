import Recipe from "@/models/recipe";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib";

export async function POST(req, { params }) {
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

    return NextResponse.json({ message: "Recipe Updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
