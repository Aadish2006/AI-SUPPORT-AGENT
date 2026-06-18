import { query } from '../database/pool.js';

export const sessionRepository = {
  async findOrCreate(sessionId, userId) {
    if (sessionId) {
      const result = await query(
        `INSERT INTO sessions (id, user_id) VALUES ($1, $2)
         ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
         RETURNING *`,
        [sessionId, userId ?? null]
      );
      return result.rows[0];
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
