import { chromaClient } from '../vector/chromaClient.js';
import { chromaConfig } from '../config/chroma.js';
import { query, pool } from './pool.js';
import { logger } from '../utils/logger.js';

try {
  await chromaClient.deleteCollection({ name: chromaConfig.collectionName });
  logger.info(`Deleted Chroma collection ${chromaConfig.collectionName}`);
} catch (error) {
  logger.warn(`Chroma collection reset skipped: ${error.message}`);
}

await query('DELETE FROM knowledge_documents');
logger.info('Deleted knowledge document metadata from PostgreSQL');

await pool.end();
