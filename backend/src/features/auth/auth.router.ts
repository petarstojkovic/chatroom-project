import { Router, Request, Response } from "express";
import authController from "./auth.controller";

export const authRouter = Router();

authRouter.post("/register", authController.registerHandler);

authRouter.post("/login", authController.loginHandler);

authRouter.delete("/logout", authController.logoutHandler);
