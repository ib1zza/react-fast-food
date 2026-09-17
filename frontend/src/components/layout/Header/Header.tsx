import { useUser } from "../../../data/useUser";
import { Button } from "../../ui/Button/Button";
import { Icon } from "../../ui/Icon/Icon";

import "./Header.css";
import { useModalStore } from "../../../store/useModalStore";
import { IModal } from "../../../types";

export function Header() {
  const { user } = useUser();
  const { setModalOpened } = useModalStore();

  const openAuth = (mode: IModal) => {
    setModalOpened(mode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="header">
      <button className="header-logo">
        <img src="/images/logo.png" alt="Logo" />
      </button>
      <div className="header-buttons">
        <Button variant="outline" square className="search-button">
          <Icon name="search" size={32} className="search-icon" />
        </Button>
        <Button variant="outline" onClick={() => openAuth("login")} className="auth-button">
          Войти
        </Button>
        {user && <Button variant="outline" onClick={handleLogout} className="auth-button">
          Выйти
        </Button>}
        <Button variant="solid" onClick={() => openAuth("cart")} className="cart-button">
          Корзина
        </Button>
      </div>
    </div>
  );
}
