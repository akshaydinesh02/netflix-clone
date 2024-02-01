import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    uid: String,
    profileID: String,
    backdrop_path: String,
    poster_path: String,
    movieID: Number,
    type: String,
  },
  { timestamps: true }
);

const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
