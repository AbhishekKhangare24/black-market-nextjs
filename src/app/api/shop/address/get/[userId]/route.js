import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Address from "@/models/Address";

export async function GET(req, { params }) {
  try {
    connectDB();
    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User id is required!",
        },
        { status: 400 }
      );
    }

    const addressList = await Address.find({ userId });
    console.log("addressList ==>", addressList);
    return NextResponse.json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: "Error",
      },
      { status: 500 }
    );
  }
}
