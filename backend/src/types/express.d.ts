import { TToken } from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user: TToken;
    }
  }
}

export {};
