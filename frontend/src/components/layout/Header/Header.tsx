import { useLocation } from "react-router";
import { Button } from "../../ui/Button/Button";
import { Icon } from "../../ui/Icon/Icon";

import "./Header.css";

export function Header() {
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
          <Button variant="solid">корзина</Button>

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
