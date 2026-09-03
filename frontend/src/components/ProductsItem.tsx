import { addToCart } from "../api/cartApi";
import { IProduct } from "../types";
import { Button } from "./ui/Button/Button";

export const ProductsItem = ({ product }: { product: IProduct }) => {
  function addtocart() {
    addToCart(product.id, 1);
  }
  return (
    <div className="card">
      <img src={product.image} className="card-image" />
      <div className="card-name">{product.name}</div>
      <div className="card-price-block">
        <div>{product.priceText}</div>
        <Button variant="solid" onClick={addtocart}>
          Заказать
        </Button>
      </div>
    </div>
  );
};
