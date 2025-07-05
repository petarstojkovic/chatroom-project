import mongoose, { Model, Schema } from "mongoose";
import { TUserDocument } from "./user.interface";

const userSchema = new Schema<TUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User: Model<TUserDocument> = mongoose.model<TUserDocument>(
  "User",
  userSchema
);
export default User;
