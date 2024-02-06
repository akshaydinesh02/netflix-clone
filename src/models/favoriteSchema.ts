import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    profileID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    backdrop_path: String,
    poster_path: String,
    mediaID: Number,
    type: String,
  },
  { timestamps: true }
);

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
