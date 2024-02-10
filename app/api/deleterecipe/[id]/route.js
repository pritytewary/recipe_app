import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) throw new Error("User not found");

    await Recipe.deleteOne({ userEmail: userEmail, _id: id });
    return NextResponse.json({ message: "recipe deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete Recipe" },
      { status: 500 }
    );
  }
}
