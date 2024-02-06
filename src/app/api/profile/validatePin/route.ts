import db from "@/database";
import Profile from "@/models/profileSchema";
import User from "@/models/userSchema";
import { compare } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { pin, profileId, userId } = await req.json();

    const currentProfile = await Profile.findOne({
      _id: profileId,
      userId: userId,
    }).exec();

    if (!currentProfile) {
      return NextResponse.json({
        success: false,
        message: "Account not found",
      });
    }

    const isPinValid = await compare(pin, currentProfile.pin);

    if (isPinValid) {
      return NextResponse.json({
        success: true,
        message: "Logged in successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect pin",
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
