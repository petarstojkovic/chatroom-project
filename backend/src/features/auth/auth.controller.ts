import { NextFunction, Request, Response } from "express";
import userService from "../user/user.service";
import { TUser } from "../user/user.interface";
import {
  BadRequestError,
  ServerError,
} from "../../middleware/error.middleware";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../user/user.model";
import { generateToken } from "../../utils/jwt.utils";
dotenv.config({ path: "./config/.env" });

class AuthController {
  registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user: TUser = req.body;
    try {
      if (!user.password || user.password.length < 6) {
        throw new BadRequestError("Password must be at least 6 characters");
        return;
      }
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        throw new BadRequestError("Email already in use");
        return;
      }

      const saltRounds = parseInt(process.env.SALT_WORK_FACTOR || "10");
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(user.password, salt);

      const newUser = new User({
        userName: user.userName,
        email: user.email,
        password: hash,
      });
      await newUser.save();

      if (newUser) {
        generateToken({ _id: newUser._id.toString() }, res);
        await newUser.save();

        res.status(201).json({
          _id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        throw new BadRequestError("Invalid user data");
      }
    } catch (err: any) {
      next(err);
    }
  };

  loginHandler = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  logoutHandler = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };
}

export default new AuthController();
