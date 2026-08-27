import React, { useState } from "react";
import { CategoriesNav } from "../components/CategoryNav/CategoryNav";

import {
  AuthModal,
  AuthModalMode,
} from "../components/auth/AuthModal/AuthModal";
import { useUser } from "../data/useUser";
import { ProductsList } from "../components/ProductsList";

export const HomePage: React.FC = () => {
  const { user } = useUser();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthModalMode>("login");

  const openAuth = (mode: AuthModalMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="home-page">
      <div style={{ display: "flex", gap: "10px", margin: "16px" }}>
        <button onClick={() => openAuth("login")}>Авторизация</button>
        <button onClick={() => openAuth("register")}>Регистрация</button>
        {user && <button onClick={handleLogout}>Выйти</button>}
      </div>

      <CategoriesNav />
      <ProductsList />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuth}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};
