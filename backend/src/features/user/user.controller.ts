import { Request, Response, NextFunction } from "express";
import { TUser } from "./user.interface";
import { NotFoundError } from "../../middleware/error.middleware";
import cloudinary from "../../../config/lib/cloudinary";
import User from "./user.model";

class UserController {
  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { profilePic }: Pick<TUser, "profilePic"> = req.body;
      const _id = req.user._id;

      if (!profilePic) {
        throw new NotFoundError("Profile picture is required");
      }
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUSer = await User.findByIdAndUpdate(
        _id,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );

      res.status(200).json(updatedUSer);
    } catch (err) {
      next(err);
    }
  };
}

export default new UserController();
