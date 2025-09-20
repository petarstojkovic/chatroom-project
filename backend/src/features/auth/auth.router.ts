import { Router } from "express";
import authController from "./auth.controller";
import {
  loginValidator,
  registerValidator,
  validateRequest,
} from "./auth.validator";
import { authMiddleware } from "../../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(...registerValidator),
  authController.registerHandler
);

authRouter.post(
  "/login",
  validateRequest(...loginValidator),
  authController.loginHandler
);

authRouter.delete("/logout", authController.logoutHandler);

authRouter.put("/update-profile", authMiddleware, authController.updateProfile);

authRouter.get("/check", authMiddleware, authController.checkAuth);
