import db from "@/database";
import Account from "@/models/Account";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { name, pin, uid } = await req.json();

    const doesAccountExist = await Account.find({ uid, name });
    const allAccounts = await Account.find({});

    if (doesAccountExist) {
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
  } catch (error: any) {
    console.error("Error", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
