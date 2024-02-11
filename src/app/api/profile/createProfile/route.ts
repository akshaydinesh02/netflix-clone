import db from "@/database";
import Profile from "@/models/profileSchema";
import { hash } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "bson";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { name, pin, uid } = await req.json();
    console.log("Data", name, uid, pin);

    const uidInObjectId = new ObjectId(uid);

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

    console.log("Hashed pin", hashedPin);

    const newProfile = await Profile.create({
      userId: uidInObjectId,
      name,
      pin: hashedPin,
    });

    console.log("New prof", newProfile);

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
