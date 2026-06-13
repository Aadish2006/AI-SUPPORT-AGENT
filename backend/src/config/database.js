import { env, requireEnv } from './env.js';

export const databaseConfig = {
  connectionString: requireEnv('DATABASE_URL', env.databaseUrl),
  ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : false
};
