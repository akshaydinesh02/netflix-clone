import mongoose from "mongoose";

const DB = process?.env?.DATABASE_STRING?.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD ?? ""
);
const db = async () => {
  if (!DB) return console.log("No DB string");
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose
      .connect(DB)
      .then(() => console.log("DB connection successful"));
  } catch (error: any) {
    console.error("Error while connecting to database", error);
  }
};

export default db;
