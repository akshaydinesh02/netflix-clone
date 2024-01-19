import db from "@/database";
// import User from "@/models/userSchema";
import Profile from "@/models/profileSchema";
import { hash } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { name, pin, uid } = await req.json();

    const doesProfileExist = await Profile.find({ uid, name });
    const allProfiles = await Profile.find({});

    if (doesProfileExist && doesProfileExist.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Please try with a different name!",
      });
    }

    if (allProfiles && allProfiles.length === 4) {
      return NextResponse.json({
        success: false,
        message: "You can only add a maximum of 4 accounts!",
      });
    }

    const hashedPin = await hash(pin, 12);

    const newProfile = await Profile.create({
      name,
      pin: hashedPin,
      uid,
    });
    console.log("New Profile", newProfile);

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
