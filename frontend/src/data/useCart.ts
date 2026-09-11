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

  function getFromCart(id: string) {
    return cart.find((item) => item.productId === id);
  }

  useEffect(() => {
    if (!cart.length) getCartData();
  }, []);

  return {
    setCart,
    cart,
    getCartData,
    getFromCart,
  };
};
