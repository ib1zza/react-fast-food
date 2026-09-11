import { addToCart, deleteFromCart, editQuantity } from "../api/cartApi";
import { ICartItem, IProduct } from "../types";
import { fetchAndUpdateCart } from "../utils/fetchAndUpdateCart";
import { Button } from "./ui/Button/Button";

export const ProductsItem = ({
  product,
  cartItem,
  setCart,
}: {
  product: IProduct;
  cartItem: ICartItem | undefined;
  setCart: (cart: ICartItem[]) => void;
}) => {
  function addtocart() {
    fetchAndUpdateCart(() => addToCart(product.id, 1), setCart); //addToCart(product.id, 1);
  }

  const quantity = cartItem?.quantity || 0;

  function handleIncrement() {
    fetchAndUpdateCart(() => editQuantity(product.id, quantity + 1), setCart); //editQuantity(product.id, quantity + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      fetchAndUpdateCart(() => editQuantity(product.id, quantity - 1), setCart); //editQuantity(product.id, quantity - 1);
    } else {
      fetchAndUpdateCart(() => deleteFromCart(product.id), setCart); //deleteFromCart(product.id);
    }
  }

  return (
    <div className="card">
      <img src={product.image} className="card-image" />
      <div className="card-name">{product.name}</div>
      <div className="card-price-block">
        <div>{product.priceText}</div>
        {!quantity ? (
          <Button variant="solid" onClick={addtocart}>
            Заказать
          </Button>
        ) : (
          <div className="card-quantity-block">
            <Button variant="outline" onClick={handleDecrement}>
              -
            </Button>
            {quantity}

            <Button variant="outline" onClick={handleIncrement}>
              +
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
