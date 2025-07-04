import { Types } from "mongoose";
import { Document } from "mongoose";

interface IMessage {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  text: string;
  image: string;
}

interface IMessageDocument extends IMessage, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export type TMessageDocument = IMessageDocument;
