import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { getCart } from "../api/cartApi";

export const useCart = () => {
  const { cart, setCart } = useCartStore();

  async function getCartData() {
    const data = await getCart();

    if (data?.items) {
      setCart(data.items);
    }
  }

  useEffect(() => {
    if (!cart.length) getCartData();
  }, []);

  return {
    setCart,
    cart,
    getCartData,
  };
};
