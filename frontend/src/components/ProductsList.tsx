import { useEffect, useState } from "react";
import { ProductsItem } from "./ProductsItem";
import { fetchProducts } from "../api/catalogApi";
import { IProduct } from "../types";
import { Fragment } from "react";

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
    <div className="products-list">
      {data.map((item, index) => {
        const isNewCategory = index === 0 || data[index - 1].categoryName !== item.categoryName;

        return (
          <Fragment key={item.id}>
            {isNewCategory && <p className="category-title">
              {item.categoryName}
            </p>}
            <ProductsItem product={item} />
          </Fragment>
        );
      })}
    </div>
  );
}
