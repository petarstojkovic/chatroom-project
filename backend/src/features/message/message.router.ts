import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import messageController from "./message.controller";

export const messageRouter = Router();
messageRouter.use(authMiddleware);

messageRouter.get("/users", messageController.getUsersSidebar);
messageRouter.get("/:id", messageController.getMessages);
