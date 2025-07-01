import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Connected to DB`);
  } catch (err: any) {
    console.error(`Error connecting to DB: ${err.message}`);
    process.exit(1);
  }
};
