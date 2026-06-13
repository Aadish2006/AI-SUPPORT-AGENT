import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from './pool.js';
import { logger } from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrations = ['001_init.sql'];

for (const migration of migrations) {
  const sql = await readFile(join(__dirname, 'migrations', migration), 'utf8');
  await pool.query(sql);
  logger.info(`Applied migration ${migration}`);
}

await pool.end();
