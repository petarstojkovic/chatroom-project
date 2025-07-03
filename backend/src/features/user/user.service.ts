import { TUser } from "./user.interface";
import User from "./user.model";

class UserService {
  createUser = async (input: Omit<TUser, "createdAt" | "updatedAt">) => {
    try {
      return await User.create(input);
    } catch (err: any) {
      console.error(`Error connecting to DB: ${err.message}`);
    }
  };
}

export default new UserService();
