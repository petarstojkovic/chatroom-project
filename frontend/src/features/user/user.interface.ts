interface IUser {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

export type TUserFull = IUser;
export type TUserShort = Omit<IUser, "email" | "confirmPassword">;
