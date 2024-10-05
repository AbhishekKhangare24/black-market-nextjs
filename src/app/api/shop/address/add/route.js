import { NextResponse } from "next/server";
import Address from "@/models/Address";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    connectDB();

    const { userId, address, city, pincode, phone, notes } = await req.json();

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid data provided!",
        },
        { status: 400 }
      );
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    await newlyCreatedAddress.save();

    return NextResponse.json(
      {
        success: true,
        data: newlyCreatedAddress,
      },
      { status: 201 }
    );
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
