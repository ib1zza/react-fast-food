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
      fetch('/api/categories').then((res) => res.json()).catch(() => null),
      fetch('/api/products').then((res) => res.json()).catch(() => null),
    ]).then(([cats, prods]) => {
      if (cats && prods) {
        setCategories(cats);
        setProducts(prods);
      } else {
        // Fallback mock data if json-server isn't running yet
        const mockCategories: Category[] = [
          { id: 'burgers', name: 'Бургеры', slug: 'burgers', icon: '🍔' },
          { id: 'combos', name: 'Комбо', slug: 'combos', icon: '🍟' },
          { id: 'drinks', name: 'Напитки', slug: 'drinks', icon: '🥤' },
          { id: 'desserts', name: 'Десерты', slug: 'desserts', icon: '🍦' },
        ];
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Воппер XL',
            description: 'Легендарный говяжий бифштекс, обжаренный на открытом огне, спелые томаты, сочные огурчики.',
            price: 389,
            categoryId: 'burgers',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
            badge: 'ХИТ',
          },
          {
            id: '2',
            name: 'Чикен Кинг',
            description: 'Сочное куриное филе в хрустящей панировке с салатным листом и фирменным майонезным соусом.',
            price: 249,
            categoryId: 'burgers',
            image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=600&q=80',
          },
          {
            id: '3',
            name: 'Комбо Воппер + Фри + Напиток',
            description: 'Воппер на выбор, большая порция хрустящего картофеля фри и прохладительный напиток 0.5л.',
            price: 549,
            categoryId: 'combos',
            image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&w=600&q=80',
            badge: 'ВЫГОДА',
          },
          {
            id: '4',
            name: 'Кола 0.5л',
            description: 'Освежающий газированный напиток.',
            price: 139,
            categoryId: 'drinks',
            image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
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
            ? '🔥 Популярные позиций'
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
