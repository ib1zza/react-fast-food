import React from "react";
import { CategoriesNav } from "../components/CategoryNav/CategoryNav";
import { ProductsList } from "../components/ProductsList";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <CategoriesNav />
      <ProductsList />
    </div>
  );
};

