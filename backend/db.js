import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'db.json');

/**
 * Read and parse db.json
 * @returns {object} Parsed database object
 */
export function readDb() {
  const raw = readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Serialize and write data to db.json
 * @param {object} data - Database object to persist
 */
export function writeDb(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
