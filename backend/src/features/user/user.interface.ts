import { Document, Types } from "mongoose";

interface IUser {
  email: string;
  userName: string;
  password: string;
  profilePic: string;
}

interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type TUserDocument = IUserDocument;
