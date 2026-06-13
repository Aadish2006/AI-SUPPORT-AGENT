import { query } from '../database/pool.js';

export const sessionRepository = {
  async findOrCreate(sessionId, userId) {
    if (sessionId) {
      const existing = await query('SELECT * FROM sessions WHERE id = $1', [sessionId]);
      if (existing.rows[0]) return existing.rows[0];
    }

    const created = await query(
      'INSERT INTO sessions (user_id) VALUES ($1) RETURNING *',
      [userId ?? null]
    );
    return created.rows[0];
  },

  async markEscalated(sessionId) {
    const result = await query(
      `UPDATE sessions
       SET status = 'escalated', escalated_at = NOW(), updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [sessionId]
    );
    return result.rows[0];
  }
};
