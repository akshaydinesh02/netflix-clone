import db from "@/database";
import User from "@/models/userSchema";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const profileID = searchParams.get("profileID");

    const allAccounts = await User.find({ uid: id });

    if (allAccounts) {
      return NextResponse.json({
        success: true,
        data: allAccounts,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error: any) {
    console.error("Error", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
