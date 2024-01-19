import db from "@/database";
import User from "@/models/userSchema";
import { hash } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { name, pin, uid } = await req.json();

    const doesAccountExist = await User.find({ uid, name });
    const allAccounts = await User.find({});

    if (doesAccountExist && doesAccountExist.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Please try with a different name!",
      });
    }

    if (allAccounts && allAccounts.length === 4) {
      return NextResponse.json({
        success: false,
        message: "You can only add a maximum of 4 accounts!",
      });
    }

    const hashedPin = await hash(pin, 12);

    const newAccount = await User.create({
      name,
      ping: hashedPin,
      uid,
    });
    console.log("New account", newAccount);

    if (newAccount) {
      return NextResponse.json({
        success: true,
        message: "Account created successfully!",
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
