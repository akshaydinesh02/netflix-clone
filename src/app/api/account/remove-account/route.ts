import db from "@/database";
import Account from "@/models/Account";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  try {
  } catch (error: any) {
    console.error("Error", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
