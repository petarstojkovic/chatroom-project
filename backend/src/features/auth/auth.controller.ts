import { Request, Response } from "express";
import userService from "../user/user.service";
import { TUser } from "../user/user.interface";
import { BadRequestError } from "../../middleware/error.middleware";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../user/user.model";
dotenv.config({ path: "./config/.env" });

class AuthController {
  registerHandler = async (req: Request, res: Response) => {
    const user = (await userService.createUser(req.body)) as TUser;
    try {
      if (user.password.length < 6) {
        throw new BadRequestError("Password must be at least 6 characters");
      }

      const saltRounds = parseInt(process.env.SALT_WORK_FACTOR || "10");
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(user.password, salt);

      const newUser = new User({
        userName: user.userName,
        email: user.email,
        password: hash,
      });

      if (newUser) {
        // jwt token
      } else {
        throw new BadRequestError("Invalid user data");
      }
    } catch (error) {}
  };

  loginHandler = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  logoutHandler = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };
}

export default new AuthController();
