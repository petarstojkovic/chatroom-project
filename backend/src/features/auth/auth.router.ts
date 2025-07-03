import { Router, Request, Response } from "express";
import authController from "./auth.controller";
import { registerValidator, validateRequest } from "./auth.validator";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(...registerValidator),
  authController.registerHandler
);

authRouter.post("/login", authController.loginHandler);

authRouter.delete("/logout", authController.logoutHandler);
