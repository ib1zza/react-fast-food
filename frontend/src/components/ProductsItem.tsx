import { IProduct /*, ISolidButton */ } from "../types";
import { Button } from "./ui/Button/Button";

export const ProductsItem = ({ product }: { product: IProduct }) => {
  return (
    <div className="card">
      <img src={product.image} className="card-image" />
      <div className="card-name">{product.name}</div>
      <div className="card-price-block">
        <div className="card-price">{product.priceText}</div>
        <Button variant="solid">Заказать</Button>
      </div>
    </div>
  );
};
