import db from "@/database";
import User from "@/models/userSchema";
import { compare } from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { pin, accountId, uid } = await req.json();

    const currentAccount = await User.findOne({ _id: accountId });

    if (!currentAccount) {
      return NextResponse.json({
        success: false,
        message: "Account not found",
      });
    }

    const pinCheck = await compare(pin, currentAccount.pin);

    if (pinCheck) {
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
