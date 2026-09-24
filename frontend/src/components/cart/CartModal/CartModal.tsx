import React, { useState, useEffect, useMemo } from "react";
import { ICartItem, IProduct } from "../../../types";
import { CartItem } from "./CartItem";
import { DEFAULT_MOCK_CART_ITEMS, MOCK_RECOMMENDED_PRODUCTS } from "./mockCartData";
import styles from "./CartModal.module.css";

export interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items?: ICartItem[];
  onCheckout?: (items: ICartItem[], total: number) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onClearCart?: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items: externalItems,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [localItems, setLocalItems] = useState<ICartItem[]>(
    externalItems ?? DEFAULT_MOCK_CART_ITEMS
  );

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  // Sync external items if provided
  useEffect(() => {
    if (externalItems !== undefined) {
      setLocalItems(externalItems);
    }
  }, [externalItems]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Calculations
  const totalCount = useMemo(
    () => localItems.reduce((acc, item) => acc + item.quantity, 0),
    [localItems]
  );

  const subtotal = useMemo(
    () =>
      localItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    [localItems]
  );

  const FREE_DELIVERY_THRESHOLD = 999;
  const deliveryCost = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : 149;
  const totalSum = Math.max(0, subtotal - promoDiscount + deliveryCost);

  const progressToFreeDelivery = Math.min(
    100,
    Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)
  );

  // Quantity handlers
  const handleIncrement = (productId: string) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    const target = localItems.find((i) => i.product.id === productId);
    if (target && onUpdateQuantity) {
      onUpdateQuantity(productId, target.quantity + 1);
    }
  };

  const handleDecrement = (productId: string) => {
    const targetItem = localItems.find((i) => i.product.id === productId);
    if (!targetItem) return;

    if (targetItem.quantity <= 1) {
      handleRemove(productId);
      return;
    }

    setLocalItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    if (onUpdateQuantity) {
      onUpdateQuantity(productId, targetItem.quantity - 1);
    }
  };

  const handleRemove = (productId: string) => {
    setLocalItems((prev) => prev.filter((item) => item.product.id !== productId));
    if (onRemoveItem) {
      onRemoveItem(productId);
    }
  };

  const handleClear = () => {
    setLocalItems([]);
    setAppliedPromo(null);
    setPromoDiscount(0);
    if (onClearCart) {
      onClearCart();
    }
  };

  // Add recommended product
  const handleAddRecommended = (product: IProduct) => {
    setLocalItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Promo code handler
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (!clean) return;

    if (clean === "BURGER" || clean === "SALE10" || clean === "ВКУСНО") {
      const discount = Math.round(subtotal * 0.1);
      setAppliedPromo(clean);
      setPromoDiscount(discount > 0 ? discount : 50);
    } else {
      setAppliedPromo(clean);
      setPromoDiscount(100);
    }
    setPromoCode("");
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const handleCheckoutClick = () => {
    if (onCheckout) {
      onCheckout(localItems, totalSum);
    } else {
      alert(`Заказ на сумму ${totalSum.toFixed(0)} ₽ оформлен! (Демо-режим)`);
      onClose();
    }
  };

  if (!isOpen) return null;

  const isEmpty = localItems.length === 0;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Корзина</h2>
            {!isEmpty && <span className={styles.badge}>{totalCount} шт.</span>}
          </div>

          <div className={styles.headerActions}>
            {!isEmpty && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={handleClear}
                title="Очистить корзину"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Очистить
              </button>
            )}

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть корзину"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body */}
        {isEmpty ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h3 className={styles.emptyTitle}>В вашей корзине пусто</h3>
            <p className={styles.emptySubtitle}>
              Выберите любимые бургеры, закуски и напитки из нашего каталога
            </p>
            <button
              type="button"
              className={styles.emptyButton}
              onClick={onClose}
            >
              Перейти к меню
            </button>
          </div>
        ) : (
          <div className={styles.body}>
            {/* Delivery Progress Bar */}
            <div className={styles.deliveryPromo}>
              <div className={styles.deliveryInfo}>
                <span>
                  {subtotal >= FREE_DELIVERY_THRESHOLD
                    ? "🎉 Бесплатная доставка активна!"
                    : `До бесплатной доставки: ${(
                        FREE_DELIVERY_THRESHOLD - subtotal
                      ).toFixed(0)} ₽`}
                </span>
                <span>{progressToFreeDelivery}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className={styles.itemsList}>
              {localItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onIncrement={() => handleIncrement(item.product.id)}
                  onDecrement={() => handleDecrement(item.product.id)}
                  onRemove={() => handleRemove(item.product.id)}
                />
              ))}
            </div>

            {/* Recommended additions */}
            <div className={styles.recommendedSection}>
              <h4 className={styles.sectionTitle}>Добавить к заказу</h4>
              <div className={styles.recommendedList}>
                {MOCK_RECOMMENDED_PRODUCTS.map((rec) => (
                  <div key={rec.id} className={styles.recommendedCard}>
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className={styles.recommendedImage}
                      loading="lazy"
                    />
                    <span className={styles.recommendedName} title={rec.name}>
                      {rec.name}
                    </span>
                    <span className={styles.recommendedPrice}>
                      {rec.price} ₽
                    </span>
                    <button
                      type="button"
                      className={styles.recommendedAddBtn}
                      onClick={() => handleAddRecommended(rec)}
                    >
                      + Добавить
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code Section */}
            <div className={styles.promoSection}>
              {!appliedPromo ? (
                <form className={styles.promoForm} onSubmit={handleApplyPromo}>
                  <input
                    type="text"
                    className={styles.promoInput}
                    placeholder="Промокод (например, BURGER)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="submit" className={styles.promoApplyBtn}>
                    Применить
                  </button>
                </form>
              ) : (
                <div className={styles.promoSuccess}>
                  <span>
                    ✓ Промокод <strong>{appliedPromo}</strong> применён (-{promoDiscount} ₽)
                  </span>
                  <button
                    type="button"
                    className={styles.promoRemoveBtn}
                    onClick={handleRemovePromo}
                  >
                    Отменить
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Card */}
            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span>Товары ({totalCount} шт.)</span>
                <span className={styles.summaryRowValue}>
                  {subtotal.toFixed(0)} ₽
                </span>
              </div>

              {promoDiscount > 0 && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryDiscount}>
                    Скидка по промокоду
                  </span>
                  <span className={styles.summaryDiscount}>
                    -{promoDiscount} ₽
                  </span>
                </div>
              )}

              <div className={styles.summaryRow}>
                <span>Доставка</span>
                <span className={styles.summaryRowValue}>
                  {deliveryCost === 0 ? (
                    <strong style={{ color: "#16a34a" }}>Бесплатно</strong>
                  ) : (
                    `${deliveryCost} ₽`
                  )}
                </span>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryTotalRow}>
                <span>Итого к оплате</span>
                <span className={styles.summaryTotalAmount}>
                  {totalSum.toFixed(0)} ₽
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {!isEmpty && (
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.checkoutButton}
              onClick={handleCheckoutClick}
            >
              <span>Оформить заказ</span>
              <span>•</span>
              <span>{totalSum.toFixed(0)} ₽</span>
            </button>
            <span className={styles.footerHint}>
              🚚 Доставка от 30 минут • Оплата картой или при получении
            </span>
          </div>
        )}
      </div>
    </div>
  );
};


