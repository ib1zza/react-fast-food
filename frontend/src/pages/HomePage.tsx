import React, { useState } from "react";
import { CategoriesNav } from "../components/CategoryNav/CategoryNav";

import {
  AuthModal,
  AuthModalMode,
} from "../components/auth/AuthModal/AuthModal";
import { useUser } from "../data/useUser";
import { ProductsList } from "../components/ProductsList";
import { useModalStore } from "../store/useModalStore";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <CategoriesNav />
      <ProductsList />
    </div>
  );
};
