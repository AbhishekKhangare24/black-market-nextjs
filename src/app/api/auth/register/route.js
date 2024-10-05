import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { userName, email, password } = await req.json();
  console.log(userName, email, password);
  try {
    connectDB();

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User Already exists with the same email! Please try again",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Registration successful",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Some error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
