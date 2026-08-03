import React from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="category-bar">
      <div className="container">
        <div className="category-list">
          <button
            className={`category-chip ${activeCategoryId === 'all' ? 'active' : ''}`}
            onClick={() => onSelectCategory('all')}
          >
            🔥 Всё меню
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${activeCategoryId === cat.id ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.icon || '🍔'} {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
