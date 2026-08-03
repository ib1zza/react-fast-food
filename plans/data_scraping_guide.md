# Руководство по спарсингу данных с сайта Burger King (`burgerkingrus.ru`)

> [!NOTE]
> Данный проект является учебным. Цель парсинга — получить реальную структуру меню (названия, категории, описания, цены, изображения) для заполнения учебного `db.json` и работы с правдоподобным API.

---

## 1. Анализ источника данных

У сайта `burgerkingrus.ru` (и большинства современных сетевых ресторанов) каталог товаров загружается динамически через внутренний API.

### Как найти API Endpoint:
1. Откройте браузер Google Chrome / Firefox.
2. Перейдите на страницу меню: `https://burgerkingrus.ru/menu` или главную страницу.
3. Откройте **Инструменты разработчика** (`F12` или `Ctrl + Shift + I`) -> вкладка **Network (Сеть)** -> фильтр **Fetch/XHR**.
4. Обновите страницу (`F5`) или переключите категории меню.
5. Найдите JSON-запросы, возвращающие массивы категорий или товаров (обычно имена эндпоинтов содержат `menu`, `catalog`, `products`, `categories` или GraphQL запросы).

---

## 2. Структура получаемых данных

Обычно ответа API Burger King содержит следующий массив объектов (или граф):

```json
{
  "categories": [
    {
      "id": "cat_10",
      "name": "Новинки & Хиты",
      "slug": "novelties"
    }
  ],
  "items": [
    {
      "id": "item_992",
      "name": "Воппер",
      "description": "100% говядина на гриле...",
      "price": 329,
      "categoryId": "cat_10",
      "imageUrl": "https://orderapp-images.burgerkingrus.ru/...",
      "weight": 275,
      "calories": 650
    }
  ]
}
```

---

## 3. Скрипт-парсер на Node.js (Пример)

Ниже приведен готовый Node.js скрипт (`parse_bk.js`), который можно запустить в папке `plans/` или `backend/` для получения данных и автоматической генерации `db.json`.

```javascript
// plans/parse_bk.js
import fs from 'fs/promises';
import path from 'path';

// Заголовки для имитации запроса из браузера
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
  'Referer': 'https://burgerkingrus.ru/menu',
};

async function scrapeBKMenu() {
  console.log('🔄 Начинаем сбор данных меню...');
  
  try {
    // 1. Извлечение или эмуляция запроса к API
    // Для примера используем публичный каталог или прямое скачивание HTML/JSON
    const targetUrl = 'https://burgerkingrus.ru/api/v1/menu'; // Измените на актуальный API URL из DevTools

    const response = await fetch(targetUrl, { headers: HEADERS });
    
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();
    console.log('✅ Данные успешно получены!');

    // 2. Трансформация данных под наш формат db.json
    const categories = [];
    const products = [];

    if (rawData.categories) {
      rawData.categories.forEach((cat) => {
        categories.push({
          id: String(cat.id || cat.slug),
          name: cat.name || cat.title,
          slug: cat.slug || 'category',
          icon: '🍔'
        });
      });
    }

    if (rawData.products || rawData.items) {
      const itemsList = rawData.products || rawData.items;
      itemsList.forEach((item, index) => {
        products.push({
          id: String(item.id || index + 1),
          name: item.name || item.title,
          description: item.description || '',
          price: Number(item.price || item.cost || 0),
          weightGrams: item.weight || null,
          caloriesKcal: item.calories || null,
          categoryId: String(item.categoryId || item.category_id || 'burgers'),
          image: item.imageUrl || item.image || 'https://placehold.co/600x400/ff8200/ffffff?text=Burger',
          badge: item.isNew ? 'НОВИНКА' : item.isHit ? 'ХИТ' : undefined
        });
      });
    }

    // 3. Сохранение результата в backend/db.json
    const dbPayload = {
      categories: categories.length > 0 ? categories : getFallbackCategories(),
      products: products.length > 0 ? products : getFallbackProducts(),
    };

    const targetPath = path.resolve('../backend/db.json');
    await fs.writeFile(targetPath, JSON.stringify(dbPayload, null, 2), 'utf-8');
    console.log(`🎉 Файл db.json успешно обновлен по пути: ${targetPath}`);

  } catch (error) {
    console.error('⚠️ Не удалось распарсить напрямую по API (возможно включена защита или капча).');
    console.error('Детали ошибки:', error.message);
    console.log('ℹ️ Рекомендуемый альтернативный способ: скопировать cURL/JSON из вкладки Network DevTools и вставить в файл raw_data.json.');
  }
}

function getFallbackCategories() {
  return [
    { id: 'burgers', name: 'Бургеры из говядины', slug: 'burgers', icon: '🍔' },
    { id: 'chicken', name: 'Бургеры из курицы', slug: 'chicken', icon: '🍗' },
    { id: 'combos', name: 'Комбо Обед', slug: 'combos', icon: '🍟' },
    { id: 'snacks', name: 'Закуски', slug: 'snacks', icon: '🧅' },
    { id: 'drinks', name: 'Напитки', slug: 'drinks', icon: '🥤' }
  ];
}

function getFallbackProducts() {
  return [
    {
      id: '101',
      name: 'Воппер',
      description: '100% сочный бифштекс из говядины на гриле.',
      price: 329,
      categoryId: 'burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      badge: 'ХИТ'
    }
  ];
}

scrapeBKMenu();
```

---

## 4. Альтернативный метод: Копирование запроса из DevTools (Network Copy)

Если API защищено токенезированным заголовком или Cloudflare:
1. В браузерном DevTools -> Network кликните правой кнопкой мыши по нужному JSON-запросу.
2. Выберите **Copy** -> **Copy response**.
3. Создайте файл `plans/raw_menu.json` и вставьте скопированный JSON.
4. Запустите локальный скрипт конвертации: `node convert_raw_to_db.js`.
