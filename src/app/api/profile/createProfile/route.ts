import db from "@/database";
import Profile from "@/models/profileSchema";
import { hash } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
// import { ObjectId } from "bson";
// import { ObjectId } from "mongoose";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { name, pin, uid } = await req.json();

    const allProfilesOfAccount = await Profile.find({
      userId: uid,
    }).exec();

    if (allProfilesOfAccount && allProfilesOfAccount.length === 4) {
      return NextResponse.json({
        success: false,
        message: "You can only create a maximum of 4 accounts!",
      });
    }

    const hashedPin = await hash(pin, 12);

    const newProfile = await Profile.create({
      userId: uid,
      name,
      pin: hashedPin,
    });

    if (newProfile) {
      return NextResponse.json({
        success: true,
        message: "Profile created successfully!",
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
