import { query } from '../database/pool.js';

export const knowledgeRepository = {
  async create({ title, sourceType, sourceName, chunksCount, metadata = {} }) {
    const result = await query(
      `INSERT INTO knowledge_documents (title, source_type, source_name, chunks_count, metadata)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, sourceType, sourceName ?? null, chunksCount, metadata]
    );
    return result.rows[0];
  },

  async list() {
    const result = await query(
      `SELECT id, title, source_type, source_name, chunks_count, metadata, created_at
       FROM knowledge_documents
       ORDER BY created_at DESC`
    );
    return result.rows;
  },

  async findById(documentId) {
    const result = await query('SELECT * FROM knowledge_documents WHERE id = $1', [documentId]);
    return result.rows[0];
  },

  async delete(documentId) {
    const result = await query(
      'DELETE FROM knowledge_documents WHERE id = $1 RETURNING *',
      [documentId]
    );
    return result.rows[0];
  }
};
