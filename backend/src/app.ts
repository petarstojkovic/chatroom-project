// import "./types/express";
import express from "express";
import dotenv from "dotenv";
import { healthRouter } from "./features/health/healthcheck";
import { authRouter } from "./features/auth/auth.router";
import { connectDB } from "../config/lib/connect.db";
import { globalErrorHandler } from "./middleware/error.middleware";
import { userRouter } from "./features/user/user.router";
import cookieParser from "cookie-parser";
import { messageRouter } from "./features/message/message.router";
import { corsMiddleware } from "./middleware/cors.middleware";

dotenv.config({ path: "./src/config/.env" });

const app = express();

const port = parseInt(process.env.PORT || "5000");
const host = process.env.HOST || "localhost";

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use(globalErrorHandler);

app.listen(port, host, () => {
  console.log(`server listening on port 5000`);
  connectDB();
});
