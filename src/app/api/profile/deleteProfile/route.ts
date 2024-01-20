import db from "@/database";
import Profile from "@/models/profileSchema";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!id || !userId) {
      return NextResponse.json({
        success: false,
        message: "Profile ID and user ID are mandatory",
      });
    }

    const deletedProfile = await Profile.findByIdAndDelete({
      _id: id,
      userId: userId,
    });
    if (deletedProfile) {
      return NextResponse.json({
        success: true,
        message: "Profile deleted successfully",
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
