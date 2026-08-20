import { IUser } from "../types";

export type UserState = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};
