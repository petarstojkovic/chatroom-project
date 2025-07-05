import { NextFunction, Request, Response } from "express";
import User from "../user/user.model";
import Message from "./message.model";
import { TMessageDocument } from "./message.interface";
import cloudinary from "../../../config/lib/cloudinary";

class MessageController {
  getUsersSidebar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
      res.status(200).json(filteredUsers);
    } catch (err) {
      next(err);
    }
  };
  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;

      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  };
  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { text, image }: Pick<TMessageDocument, "text" | "image"> =
        req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      let imageUrl;
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });

      await newMessage.save();

      // realtime func goes here - socket.io
      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  };
}

export default new MessageController();
