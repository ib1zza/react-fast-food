import { useUser } from "../../../data/useUser";
import { Button } from "../../ui/Button/Button";
import { Icon } from "../../ui/Icon/Icon";

import "./Header.css";
import { useModalStore } from "../../../store/useModalStore";
import { IModal } from "../../../types";
import { useState } from "react";

export function Header() {
  const { user } = useUser();
  const { setModalOpened } = useModalStore();

  const [searchOpened, setSearchOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openAuth = (mode: IModal) => {
    setModalOpened(mode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleOpenSearch = () => {
    setSearchOpened(true);
  }

  const handleCloseSearch = () => {
    setSearchOpened(false);
    setSearchQuery("");
  }

  return (
    <div className="header-wrapper">
      <div className="page__content header ">
        <button className="header-logo">
          <img src="/images/logo.png" alt="Logo" />
        </button>
        <div className="header-buttons">
          <div className={`search-wrapper ${searchOpened ? "open" : ""}`}>

            <Button variant="transparent" square className="search-button" onClick={handleOpenSearch}>
              <Icon name="search" size={32} className="search-icon" />
            </Button>

            {<div className="search-input-wrapper">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="поиск" className="search-input" />
              <Button variant="transparent" onClick={handleCloseSearch} className="search-button">
                X
              </Button>
            </div>}
          </div>



          {!user &&<Button variant="outline" onClick={() => openAuth("login")} className="auth-button">
            Войти
          </Button>}
          {user && <Button variant="outline" onClick={handleLogout} className="auth-button">
            Выйти
          </Button>}
          <Button variant="solid" onClick={() => openAuth("cart")} className="cart-button">
            Корзина
          </Button>
        </div>
      </div>
    </div>
  );
}
