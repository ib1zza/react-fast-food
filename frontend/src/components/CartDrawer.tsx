import React from 'react';
import { useCartStore } from '../store/useCartStore';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  if (!isCartOpen) return null;

  const totalPrice = getTotalPrice();

  return (
    <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Ваш заказ</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '40px', color: '#737373' }}>
              Корзина пока пуста 🍔<br />
              Выберите что-нибудь из меню!
            </p>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/100x100/ff8200/ffffff?text=Item';
                  }}
                />
                <div className="cart-item-info">
                  <div className="cart-item-title">{product.name}</div>
                  <div className="cart-item-price">{product.price * quantity} ₽</div>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="total-row">
              <span>Итого:</span>
              <span>{totalPrice} ₽</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                alert('Заказ успешно оформлен! (Демо)');
                clearCart();
                setCartOpen(false);
              }}
            >
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
