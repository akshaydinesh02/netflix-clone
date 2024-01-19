import db from "@/database";
import User from "@/models/userSchema";
import Profile from "@/models/profileSchema";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const allProfiles = await Profile.find({ uid: id });

    console.log("All profiles", allProfiles);

    if (allProfiles) {
      return NextResponse.json({
        success: true,
        data: allProfiles,
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
