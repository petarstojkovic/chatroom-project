import type { TUser } from "../../user/user.interface";

interface IAuthState {
  authUser: null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signUp: (data: TUser) => Promise<void>;
}

export type TAuthState = IAuthState;
