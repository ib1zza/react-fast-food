import { IFrontendCart } from "../types";

export type CartState = {
  cart: IFrontendCart;
  setCart: (cart: IFrontendCart) => void;
};
