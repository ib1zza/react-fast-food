import React from "react";
import { CategoriesNav } from "../components/CategoryNav/CategoryNav";
import { ShowHeader } from "../components/layout/Header/Header";

export const HomePage: React.FC = () => {
  return <div className="home-page">
    <div className="header">
      <ShowHeader />
    </div>
    <CategoriesNav />
  </div>;
};
