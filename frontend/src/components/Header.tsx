import React from 'react';
import { useCartStore } from '../store/useCartStore';

export const Header: React.FC = () => {
  const { toggleCart, getTotalCount } = useCartStore();
  const totalCount = getTotalCount();

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-group">
          <span>🍔 KING CAFE</span>
          <span className="logo-badge">FAST FOOD</span>
        </div>

        <nav className="nav-links">
          <a href="#" className="active">Меню</a>
          <a href="#">Акции</a>
          <a href="#">Рестораны</a>
          <a href="#">Доставка</a>
        </nav>

        <button className="cart-btn" onClick={toggleCart} aria-label="Открыть корзину">
          <span>🛒 Корзина</span>
          {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </button>
      </div>
    </header>
  );
};
