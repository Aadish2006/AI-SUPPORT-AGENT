import { query } from '../database/pool.js';

export const analyticsRepository = {
  async recordEvent({ eventType, sessionId = null, messageId = null, metadata = {} }) {
    const result = await query(
      `INSERT INTO analytics_events (event_type, session_id, message_id, metadata)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [eventType, sessionId, messageId, metadata]
    );
    return result.rows[0];
  },

  async summary() {
    const result = await query(`
      SELECT
        COUNT(*) FILTER (WHERE event_type = 'query_received')::int AS total_queries,
        COUNT(*) FILTER (WHERE event_type = 'ai_resolved')::int AS ai_resolved_queries,
        COUNT(*) FILTER (WHERE event_type = 'escalated')::int AS escalated_queries,
        COUNT(*) FILTER (WHERE event_type = 'feedback_positive')::int AS positive_feedback,
        COUNT(*) FILTER (WHERE event_type = 'feedback_negative')::int AS negative_feedback
      FROM analytics_events
    `);
    return result.rows[0];
  },

  async unresolvedQuestions(limit = 10) {
    const result = await query(
      `SELECT m.content AS question, COUNT(*)::int AS count
       FROM analytics_events ae
       JOIN messages m ON m.id = ae.message_id
       WHERE ae.event_type = 'escalated'
       GROUP BY m.content
       ORDER BY count DESC
       LIMIT $1`,
      [limit]
    );
    return result.rows;
  },

  async topics(limit = 10) {
    const result = await query(
      `SELECT COALESCE(metadata->>'topic', 'general') AS topic, COUNT(*)::int AS count
       FROM analytics_events
       WHERE event_type IN ('query_received', 'ai_resolved', 'escalated')
       GROUP BY topic
       ORDER BY count DESC
       LIMIT $1`,
      [limit]
    );
    return result.rows;
  },

  async feedbackStats() {
    const result = await query(
      `SELECT rating, COUNT(*)::int AS count
       FROM feedback
       GROUP BY rating`
    );
    return result.rows;
  }
};
