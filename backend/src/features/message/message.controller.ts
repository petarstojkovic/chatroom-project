import { NextFunction, Request, Response } from "express";
import User from "../user/user.model";
import Message from "./message.model";

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
}

export default new MessageController();
