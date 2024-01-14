import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    pid: String,
    name: String,
    pin: String,
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.profileSchema || mongoose.model("Profile", profileSchema);

export default Profile;
