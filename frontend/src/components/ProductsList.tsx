import { useEffect, useState } from "react";
import { ProductsItem } from "./ProductsItem";
import { fetchProducts } from "../api/catalogApi";
import { IProduct } from "../types";

export function ProductsList() {
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchProducts();
      if (res) {
        setData(res);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="posts-list">
      {data.map((item) => (
        <ProductsItem product={item} key={item.id} />
      ))}
    </div>
  );
}
