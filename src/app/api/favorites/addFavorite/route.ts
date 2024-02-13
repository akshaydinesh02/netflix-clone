import db from "@/database";
import { NextResponse, NextRequest } from "next/server";
import Favorite from "@/models/favoriteSchema";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await db();

    const data = await req.json();

    if (!data.uid || !data.mediaID || !data.profileID) {
      return NextResponse.json({
        success: false,
        message: "UID, mediaID and profileID are mandatory",
      });
    }

    const isAlreadyFavorite = await Favorite.find({
      uid: data.uid,
      mediaID: data.mediaID,
      profileID: data.profileID,
    }).exec();

    console.log("isAlreadyFavorite", isAlreadyFavorite);

    if (isAlreadyFavorite && isAlreadyFavorite.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Already added as favorite!",
      });
    }

    const newFavorite = await Favorite.create(data);

    if (newFavorite) {
      return NextResponse.json({
        success: true,
        message: "Added to favorites list successfully!",
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
