import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../features/user/user.model";
import { NextFunction, Request, Response } from "express";
import {
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "./error.middleware";
import dotenv from "dotenv";
import { TToken } from "../utils/jwt.utils";
dotenv.config({ path: "./src/config/.env" });

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new UnauthorizedError("Unauthorized");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TToken;

    if (!decoded) {
      throw new UnauthorizedError("Unauthorized");
    }

    const userFound = await User.findById(decoded._id).select("-password");

    if (!userFound) {
      throw new NotFoundError("User Not Found");
    }

    req.user = {
      ...userFound.toObject(),
      _id: userFound._id.toString(),
    };

    next();
  } catch (err) {
    next(err);
  }
};
