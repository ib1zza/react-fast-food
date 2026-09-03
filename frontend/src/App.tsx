import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { useUser } from "./data/useUser";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import { TestPage } from "./pages/TestPage";
import { HeaderlessLayout } from "./components/layout/HeaderlessLayout";
import { AuthModal } from "./components/auth/AuthModal/AuthModal";
import { CartModal } from "./components/cart/CartModal/CartModal";
import { useModalStore } from "./store/useModalStore";
import { useCart } from "./data/useCart";

export const App: React.FC = () => {
  useUser();
  const { cart } = useCart();

  const { modalOpened, setModalOpened } = useModalStore();

  const closeModal = () => {
    setModalOpened(null);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="test" element={<TestPage />} />
          </Route>
          <Route path="/user" element={<HeaderlessLayout />}>
            <Route path="test" element={<TestPage />} />
          </Route>
        </Routes>
      </Router>

      <AuthModal
        isOpen={modalOpened === "login" || modalOpened === "register"}
        onClose={closeModal}
        mode={modalOpened}
        onSwitchMode={setModalOpened}
      />

      <CartModal
        items={cart}
        isOpen={modalOpened === "cart"}
        onClose={closeModal}
      />
    </div>
  );
};

export default App;
