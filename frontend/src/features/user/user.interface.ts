interface IUser {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  profilePic: string;
}

export type TUserFull = IUser;
export type TUserShort = Omit<IUser, "email" | "confirmPassword">;
export type TUpdateProfile = Pick<IUser, "profilePic">;
