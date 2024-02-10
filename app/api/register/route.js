import { connectMongoDB } from "@/lib";
import User from "@/models/user";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { fullname, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({ fullname, email, password: hashedPassword });
    return NextResponse.json({ message: "User Registered " }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An Error while Registration" },
      { status: 500 }
    );
  }
}
