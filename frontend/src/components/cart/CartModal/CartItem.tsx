import React from "react";
import { ICartItem } from "../../../types";
import styles from "./CartItem.module.css";

export interface CartItemProps {
  item: ICartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const { product, quantity } = item;
  const totalPrice = (product.price * quantity).toFixed(0);

  return (
    <div className={styles.item}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.details}>
        {product.categoryName && (
          <span className={styles.category}>{product.categoryName}</span>
        )}
        <h4 className={styles.name} title={product.name}>
          {product.name}
        </h4>
        <span className={styles.unitPrice}>
          {product.priceText || `${product.price} ₽`}
        </span>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantityGroup}>
          <button
            type="button"
            className={styles.qtyButton}
            onClick={onDecrement}
            aria-label="Уменьшить количество"
            title={quantity === 1 ? "Удалить" : "Уменьшить"}
          >
            {quantity === 1 ? "✕" : "−"}
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            type="button"
            className={styles.qtyButton}
            onClick={onIncrement}
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>

        <div className={styles.priceBlock}>
          <span className={styles.totalPrice}>{totalPrice} ₽</span>
        </div>

        <button
          type="button"
          className={styles.removeButton}
          onClick={onRemove}
          aria-label="Удалить из корзины"
          title="Удалить товар"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
};
