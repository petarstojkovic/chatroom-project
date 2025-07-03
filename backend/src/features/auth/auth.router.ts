import { Router } from "express";
import authController from "./auth.controller";
import {
  loginValidator,
  registerValidator,
  validateRequest,
} from "./auth.validator";

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
