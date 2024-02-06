import db from "@/database";
import Favorite from "@/models/favoriteSchema";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const profileID = searchParams.get("profileID");

    const allFavorites = await Favorite.find({ uid: id, profileID: profileID });

    if (allFavorites) {
      return NextResponse.json({
        success: true,
        data: allFavorites,
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
