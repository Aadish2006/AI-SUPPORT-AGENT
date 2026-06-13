import { query } from '../database/pool.js';

export const feedbackRepository = {
  async create({ sessionId, messageId, rating, comment }) {
    const result = await query(
      `INSERT INTO feedback (session_id, message_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [sessionId, messageId ?? null, rating, comment ?? null]
    );
    return result.rows[0];
  }
};
