import { getPineconeIndex } from '../vector/pineconeClient.js';
import { query, pool } from './pool.js';
import { logger } from '../utils/logger.js';

try {
  const index = getPineconeIndex();
  await index.deleteAll();
  logger.info('Deleted all vectors in Pinecone index');
} catch (error) {
  logger.warn(`Pinecone index reset skipped: ${error.message}`);
}

await query('DELETE FROM knowledge_documents');
logger.info('Deleted knowledge document metadata from PostgreSQL');

await pool.end();
