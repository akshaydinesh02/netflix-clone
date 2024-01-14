import db from "@/database";
import Account from "@/models/profileSchema";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
  } catch (error: any) {
    console.error("Error", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
