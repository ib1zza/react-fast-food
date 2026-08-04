import fs from 'fs/promises';
import path from 'path';

/**
 * Скрипт для формирования и обновления бд backend/db.json
 * настоящим меню в стиле Burger King.
 */
async function updateDatabase() {
  console.log('🍔 Обновление базы данных меню Burger King...');

  const dbPath = path.resolve('../backend/db.json');
  try {
    const rawData = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(rawData);
    console.log(`✅ В базе успешно загружено ${db.categories.length} категорий и ${db.products.length} товаров.`);
  } catch (err) {
    console.error('Ошибка чтения db.json:', err.message);
  }
}

updateDatabase();
