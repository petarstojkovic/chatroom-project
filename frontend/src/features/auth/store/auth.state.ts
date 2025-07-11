import type { TUserFull, TUserShort } from "../../user/user.interface";

interface IAuthState {
  authUser: null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  register: (data: TUserFull) => Promise<void>;
  login: (data: TUserShort) => Promise<void>;
  logout: () => Promise<void>;
}

export type TAuthState = IAuthState;
