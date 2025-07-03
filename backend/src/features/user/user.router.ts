import { Router } from "express";
import userController from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export const userRouter = Router();
userRouter.use(authMiddleware);

userRouter.put("/update-profile", userController.updateProfile);
