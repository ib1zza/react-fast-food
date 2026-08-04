import fs from 'fs/promises';
import path from 'path';

/**
 * Преобразует оригинальный относительный путь из API Бургер Кинг (например catalog/dish/abc.png)
 * в соответствующий URL на статическом CDN.
 */
export function formatBkImageUrl(rawPath) {
  if (!rawPath) return undefined;
  if (rawPath.startsWith('http')) return rawPath;

  let formatted = rawPath;
  if (formatted.startsWith('catalog/') && !formatted.startsWith('catalog/images/')) {
    formatted = formatted.replace(/^catalog\//, 'catalog/images/');
  }

  return `https://orderapp-app-static.burgerkingrus.ru/x256/${formatted}`;
}

export function convertBkApiToDb(bkData) {
  const resultData = bkData.result || bkData;
  const rawCategories = resultData.categories || [];
  const rawDishes = resultData.dishes || resultData.items || [];
  const rawGroups = resultData.groups || [];
  const rawBadges = resultData.badges || [];

  const badgeMap = new Map();
  rawBadges.forEach((b) => {
    badgeMap.set(b.id, b.name);
  });

  const categories = [];
  const products = [];

  // Обработка категорий с сохранением уникальных путей к картинкам
  rawCategories.forEach((cat) => {
    const catId = String(cat.id);
    const imgPath = formatBkImageUrl(cat.image?.name);
    
    categories.push({
      id: catId,
      name: cat.name,
      slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
      icon: getCategoryIcon(cat.name),
      image: imgPath,
    });

    if (Array.isArray(cat.subcategories)) {
      cat.subcategories.forEach((sub) => {
        categories.push({
          id: `${catId}-${sub.id}`,
          parentId: catId,
          name: `${cat.name}: ${sub.name}`,
          slug: `${cat.name}-${sub.name}`.toLowerCase().replace(/\s+/g, '-'),
          icon: getCategoryIcon(sub.name),
        });
      });
    }
  });

  // Обработка блюд (dishes) - каждое сохраняет свою оригинальную уникальную картинку
  rawDishes.forEach((dish) => {
    const rawImg = dish.image?.name || dish.photo;
    const imgPath = formatBkImageUrl(rawImg);
    const badgeName = dish.badge_id ? badgeMap.get(dish.badge_id) : dish.badge || undefined;

    products.push({
      id: String(dish.id),
      name: dish.name || dish.title,
      description: dish.description || dish.composition || 'Сочное блюдо от Burger King',
      price: Math.round(Number(dish.price || dish.cost || 0) / (dish.price > 1000 ? 100 : 1)),
      weightGrams: dish.weight || dish.weight_g || null,
      caloriesKcal: dish.calories || dish.energy_kcal || null,
      categoryId: String(dish.category_id || dish.categoryId || categories[0]?.id || '23'),
      image: imgPath,
      badge: badgeName,
      isPopular: Boolean(dish.is_popular || dish.hit),
    });
  });

  // Обработка групп (groups)
  rawGroups.forEach((group) => {
    if (!products.some((p) => p.id === String(group.id))) {
      const imgPath = formatBkImageUrl(group.image?.name);

      products.push({
        id: String(group.id),
        name: group.name,
        description: group.description || 'Позиция из меню Burger King',
        price: Math.round(Number(group.price || 299)),
        categoryId: String(group.category_id || categories[0]?.id || '23'),
        image: imgPath,
      });
    }
  });

  return { categories, products };
}

function getCategoryIcon(name) {
  const lower = name.toLowerCase();
  if (lower.includes('новинк')) return '✨';
  if (lower.includes('комбо')) return '🍱';
  if (lower.includes('бургер')) return '🍔';
  if (lower.includes('говядин')) return '🥩';
  if (lower.includes('куриц') || lower.includes('рыб')) return '🍗';
  if (lower.includes('остр')) return '🌶️';
  if (lower.includes('картоф') || lower.includes('закус')) return '🍟';
  if (lower.includes('напит') || lower.includes('кофе')) return '🥤';
  if (lower.includes('десерт')) return '🍦';
  if (lower.includes('соус')) return '🥫';
  if (lower.includes('ролл')) return '🌯';
  return '🍽️';
}

async function main() {
  const rawPath = path.resolve('../plans/raw_bk_api.json');
  const targetPath = path.resolve('../backend/db.json');

  try {
    const fileContent = await fs.readFile(rawPath, 'utf-8');
    const bkJson = JSON.parse(fileContent);
    const db = convertBkApiToDb(bkJson);

    await fs.writeFile(targetPath, JSON.stringify(db, null, 2), 'utf-8');
    console.log(`✅ База данных успешно обновлена! Категорий: ${db.categories.length}, Товаров: ${db.products.length}`);
  } catch (err) {
    console.error('Ошибка в скрипте:', err.message);
  }
}

main();
