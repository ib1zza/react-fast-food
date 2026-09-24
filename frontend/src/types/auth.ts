import { ICartItem } from "./catalog";

export interface IRegisterResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  email: string;
  createdAt: string;
}

export interface IAuthResponse {
  user: IUser;
}

export interface IBackendCart {
  id: string;
  userId: string;
  items: ICartItem[];
  updatedAt: string;
}

export type IFrontendCart = ICartItem[];

