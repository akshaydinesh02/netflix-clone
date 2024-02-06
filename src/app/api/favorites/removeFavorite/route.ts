import db from "@/database";
import User from "@/models/userSchema";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Favorite item ID is mandatory",
      });
    }

    const deletedFavorite = await User.findByIdAndDelete(id);
    if (deletedFavorite) {
      return NextResponse.json({
        success: true,
        message: "Favorite item removed successfully",
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
