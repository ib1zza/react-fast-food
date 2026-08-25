import { useEffect, useState } from "react";
import { IProduct/*, ISolidButton */ } from "../types";
import { fetchProducts } from "../api/catalogApi";

export const ProductsItem = (product: IProduct) => {
  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchProducts();
      if (res) {
        setData(res);
      }

    };
    fetchData();
  }, [])


  return (<div className="products-cards">
    {data.map((item) => (
      <div key={item.id} className="card">
        <img src={item.image} className="card-image" />
        <div className="card-name">{item.name}</div>
        <div className="card-price-block">
          <div className="card-price">{item.priceText}</div>
          <button></button>
          {/*как применить тип ISolidButton к кнопке?*/}
        </div>
      </div>
    ))}
  </div>);
}