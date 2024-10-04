import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  connectDB();
  return NextResponse.json({
    result: "API is working fine",
  });
}
