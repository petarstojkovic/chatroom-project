import { TUserDocument } from "./user.interface";
import User from "./user.model";

class UserService {
  createUser = async (
    input: Omit<TUserDocument, "createdAt" | "updatedAt">
  ) => {
    try {
      return await User.create(input);
    } catch (err: any) {
      console.error(`Error connecting to DB: ${err.message}`);
    }
  };
}

export default new UserService();
