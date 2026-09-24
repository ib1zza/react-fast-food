import React from "react";
import { CategoriesNav } from "../components/layout/CategoryNav/CategoryNav";
import { ProductsList } from "../components/product/ProductsList";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <CategoriesNav />
      <ProductsList />
    </div>
  );
};

