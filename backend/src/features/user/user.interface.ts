interface IUSer {
  email: string;
  userName: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TUser = IUSer;
