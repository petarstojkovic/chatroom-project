import { NextFunction, Request, Response } from "express";
import { TUserDocument } from "../user/user.interface";
import { BadRequestError } from "../../middleware/error.middleware";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../user/user.model";
import { generateToken } from "../../utils/jwt.utils";
dotenv.config({ path: "./config/.env" });

class AuthController {
  registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user: TUserDocument = req.body;
    try {
      const existingUserName = await User.findOne({ userName: user.userName });
      if (existingUserName) {
        throw new BadRequestError("Username already in use");
      }
      const existingEmail = await User.findOne({ email: user.email });
      if (existingEmail) {
        throw new BadRequestError("Email already in use");
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
    } catch (err) {
      next(err);
    }
  };

  loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password }: Pick<TUserDocument, "userName" | "password"> =
      req.body;
    try {
      const existingUser = await User.findOne({ userName });
      if (!existingUser) {
        throw new BadRequestError("Invalid credentials");
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        throw new BadRequestError("Invalid credentials");
      }
      generateToken({ _id: existingUser._id.toString() }, res);

      res.status(200).json({
        _id: existingUser._id,
        email: existingUser.email,
        userName: existingUser.userName,
        profilePic: existingUser.profilePic,
      });
    } catch (err) {
      next(err);
    }
  };

  logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      next(err);
    }
  };
  checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(req.user);
    } catch (err) {
      next(err);
    }
  };
}

export default new AuthController();
