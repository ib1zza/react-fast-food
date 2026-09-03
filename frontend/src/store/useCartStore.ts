import { create } from "zustand";
import { CartState } from "./useCartStore.types";

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
}));
