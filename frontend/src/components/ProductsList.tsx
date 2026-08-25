import { ProductsItem } from "./ProductsItem";

export function ProductsList() {

  return (
    <div className="posts-list">
      {product.map((item) => (
        <ProductsItem product={item} key={item.id} />
      ))}
    </div>
  );
}