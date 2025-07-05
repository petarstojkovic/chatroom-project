import mongoose, { Model, Schema } from "mongoose";
import { TMessageDocument } from "./message.interface";

const messageSchema = new Schema<TMessageDocument>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message: Model<TMessageDocument> = mongoose.model<TMessageDocument>(
  "Message",
  messageSchema
);
export default Message;
