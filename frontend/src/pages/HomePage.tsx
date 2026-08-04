import React, { useEffect, useState } from 'react';
import { Category, Product } from '../types';
import { CategoryNav } from '../components/CategoryNav';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch categories and products from JSON server backend or fallback
    Promise.all([
      fetch('/api/categories').then((res) => (res.ok ? res.json() : null)).catch(() => null),
      fetch('/api/products').then((res) => (res.ok ? res.json() : null)).catch(() => null),
    ]).then(([cats, prods]) => {
      if (Array.isArray(cats) && cats.length > 0 && Array.isArray(prods) && prods.length > 0) {
        setCategories(cats);
        setProducts(prods);
      } else {
        // Fallback mock data if json-server isn't running yet
        const mockCategories: Category[] = [
          { id: 'burgers-beef', name: 'Бургеры из говядины', slug: 'beef-burgers', icon: '🍔' },
          { id: 'angus-collection', name: 'Ангус Коллекция', slug: 'angus-collection', icon: '👑' },
          { id: 'burgers-chicken', name: 'Курица и Рыба', slug: 'chicken-fish', icon: '🍗' },
          { id: 'combos', name: 'Комбо Обед', slug: 'combos', icon: '🍱' },
          { id: 'snacks', name: 'Закуски и Фри', slug: 'snacks-fries', icon: '🍟' },
          { id: 'drinks', name: 'Напитки и Кофе', slug: 'drinks-coffee', icon: '🥤' },
          { id: 'desserts', name: 'Десерты', slug: 'desserts', icon: '🍦' },
          { id: 'sauces', name: 'Соусы', slug: 'sauces', icon: '🥫' },
        ];
        const mockProducts: Product[] = [
          {
            id: '101',
            name: 'Воппер',
            description: 'Легендарный Воппер — 100% сочный бифштекс из говядины на открытом огне, спелые томаты, салат, огурчики, лук и майонез.',
            price: 349,
            weightGrams: 275,
            caloriesKcal: 650,
            categoryId: 'burgers-beef',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
            badge: 'ЛЕГЕНДА',
          },
          {
            id: '102',
            name: 'Двойной Воппер',
            description: 'Два сочных бифштекса из 100% говядины на гриле, свежие томаты, маринованные огурчики и майонез.',
            price: 469,
            weightGrams: 380,
            caloriesKcal: 920,
            categoryId: 'burgers-beef',
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
            badge: 'ХИТ',
          },
          {
            id: '201',
            name: 'Ангус Шеф',
            description: 'Премиальный котлета из 100% мраморной говядины Блэк Ангус, соус Гриль, бекон и сыр Гауда.',
            price: 499,
            weightGrams: 320,
            caloriesKcal: 850,
            categoryId: 'angus-collection',
            image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?auto=format&fit=crop&w=600&q=80',
            badge: 'PREMIUM',
          },
          {
            id: '301',
            name: 'Чикен Кинг',
            description: 'Сочное куриное филе в хрустящей панировке, салат Айсберг и мягкий фирменный соус.',
            price: 259,
            weightGrams: 210,
            caloriesKcal: 510,
            categoryId: 'burgers-chicken',
            image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=600&q=80',
          },
          {
            id: '401',
            name: 'Воппер Комбо XL',
            description: 'Легендарный Воппер, гранд-порция Кингер Фри и прохладительный напиток 0.8л.',
            price: 599,
            weightGrams: 750,
            caloriesKcal: 1150,
            categoryId: 'combos',
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=600&q=80',
            badge: 'ВЫГОДА 25%',
          },
          {
            id: '501',
            name: 'Кингер Фри (Средний)',
            description: 'Золотистый, хрустящий снаружи и мягкий внутри картофель фри с морской солью.',
            price: 139,
            weightGrams: 110,
            caloriesKcal: 320,
            categoryId: 'snacks',
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
          },
          {
            id: '601',
            name: 'Кола 0.5л',
            description: 'Легендарный прохладительный газированный напиток со льдом.',
            price: 149,
            weightGrams: 500,
            caloriesKcal: 210,
            categoryId: 'drinks',
            image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
          },
          {
            id: '701',
            name: 'Пирожок с Вишней',
            description: 'Горячий хрустящий пирожок из слоеного теста со спелой вишневой начинкой.',
            price: 129,
            weightGrams: 80,
            caloriesKcal: 260,
            categoryId: 'desserts',
            image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=600&q=80',
          },
        ];
        setCategories(mockCategories);
        setProducts(mockProducts);
      }
      setLoading(false);
    });
  }, []);

  const filteredProducts =
    activeCategoryId === 'all'
      ? products
      : products.filter((p) => p.categoryId === activeCategoryId);

  return (
    <main>
      <div className="container">
        <section className="hero">
          <div className="hero-text">
            <h1 className="hero-title">
              Вкус огня <span>в каждом бургере!</span>
            </h1>
            <p className="hero-subtitle">
              Сочное 100% говяжье мясо на гриле, свежие овощи и фирменные соусы. Заказывайте с бесплатной доставкой.
            </p>
            <button className="hero-action">Выбрать сочный бургер 🍔</button>
          </div>
        </section>
      </div>

      <CategoryNav
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={setActiveCategoryId}
      />

      <div className="container">
        <h2 className="section-title">
          {activeCategoryId === 'all'
            ? '🔥 Популярные позиции'
            : categories.find((c) => c.id === activeCategoryId)?.name}
        </h2>

        {loading ? (
          <p>Загрузка меню...</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
