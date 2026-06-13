import { query } from '../database/pool.js';

export const chatRepository = {
  async createMessage({ sessionId, role, content, confidence = null, metadata = {} }) {
    const result = await query(
      `INSERT INTO messages (session_id, role, content, confidence, metadata)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [sessionId, role, content, confidence, metadata]
    );
    return result.rows[0];
  },

  async listMessages(sessionId, limit = 100) {
    const result = await query(
      `SELECT *
       FROM messages
       WHERE session_id = $1
       ORDER BY created_at ASC
       LIMIT $2`,
      [sessionId, limit]
    );
    return result.rows;
  },

  async listRecentMessages(sessionId, limit) {
    const result = await query(
      `SELECT *
       FROM messages
       WHERE session_id = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [sessionId, limit]
    );
    return result.rows.reverse();
  }
};
