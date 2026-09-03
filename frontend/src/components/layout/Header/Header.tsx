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
        <div>
          <Button variant="outline" square>
            <Icon name="search" size={16} className="search-icon" />
          </Button>
        </div>
        <div className="cart-button">
          <Button variant="solid" onClick={() => openAuth("cart")}>
            корзина
          </Button>

          <div style={{ display: "flex", gap: "10px", margin: "16px" }}>
            <button onClick={() => openAuth("login")}>Авторизация</button>
            <button onClick={() => openAuth("register")}>Регистрация</button>
            {user && <button onClick={handleLogout}>Выйти</button>}
          </div>

          {/* <Button variant="solid" size="s">
            корзина
          </Button>

          <Button variant="solid" size="l">
            корзина
          </Button> */}
        </div>
      </div>
    </div>
  );
}
