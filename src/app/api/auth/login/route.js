import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    connectDB();

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User doesn't exist! Please register first",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incorrect password! Please try again",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = jsonwebtoken.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Logged in successfully",
        token,
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
        },
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
