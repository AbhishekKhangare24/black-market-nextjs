import { NextResponse } from "next/server";
import Address from "@/models/Address";
import { connectDB } from "@/lib/mongodb";

export async function PUT(req, { params }) {
  try {
    connectDB();

    const { userId, addressId } = params;
    const formData = await req.json();
    if (!userId || !addressId) {
      return NextResponse.json(
        {
          success: false,
          message: "User and address id is required!",
        },
        { status: 400 }
      );
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message: "Address not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: address,
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
