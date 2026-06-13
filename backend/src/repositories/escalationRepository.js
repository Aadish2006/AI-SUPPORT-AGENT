import { query } from '../database/pool.js';

export const escalationRepository = {
  async create({ sessionId, reason, summary, confidence }) {
    const result = await query(
      `INSERT INTO escalations (session_id, reason, summary, confidence)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [sessionId, reason, summary, confidence]
    );
    return result.rows[0];
  },

  async list(status) {
    const params = [];
    let sql = 'SELECT * FROM escalations';
    if (status) {
      params.push(status);
      sql += ' WHERE status = $1';
    }
    sql += ' ORDER BY created_at DESC';
    const result = await query(sql, params);
    return result.rows;
  },

  async findById(escalationId) {
    const result = await query('SELECT * FROM escalations WHERE id = $1', [escalationId]);
    return result.rows[0];
  },

  async updateStatus({ escalationId, status, agentNotes }) {
    const result = await query(
      `UPDATE escalations
       SET status = $2, agent_notes = COALESCE($3, agent_notes), updated_at = NOW()
       WHERE id = $1
       RETURNING *`,
      [escalationId, status, agentNotes ?? null]
    );
    return result.rows[0];
  }
};
