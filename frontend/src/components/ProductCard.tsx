import React from 'react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="product-card">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://placehold.co/400x300/ff8200/ffffff?text=Burger+Cafe';
        }}
      />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price} ₽</span>
          <button className="add-btn" onClick={() => addToCart(product)}>
            + Добавить
          </button>
        </div>
      </div>
    </div>
  );
};
