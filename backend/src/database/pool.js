import pg from 'pg';
import { databaseConfig } from '../config/database.js';

const { Pool } = pg;

export const pool = new Pool(databaseConfig);

export async function query(text, params = []) {
  const result = await pool.query(text, params);
  return result;
}
