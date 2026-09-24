import { IBackendCart, ICartItem } from "../types";

export async function fetchAndUpdateCart(
  fetcher: () => Promise<IBackendCart | null>,
  callback: (cart: ICartItem[]) => void,
) {
  try {
    const cart = await fetcher();
    if (cart) {
      callback(cart.items);
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}
