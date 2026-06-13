import { analyticsRepository } from '../repositories/analyticsRepository.js';

function rate(part, total) {
  return total === 0 ? 0 : Number(((part / total) * 100).toFixed(2));
}

export const analyticsService = {
  async recordQuery({ sessionId, messageId, topic = 'general' }) {
    return analyticsRepository.recordEvent({
      eventType: 'query_received',
      sessionId,
      messageId,
      metadata: { topic }
    });
  },

  async recordAiResolved({ sessionId, messageId, confidence }) {
    return analyticsRepository.recordEvent({
      eventType: 'ai_resolved',
      sessionId,
      messageId,
      metadata: { confidence }
    });
  },

  async recordEscalated({ sessionId, messageId, confidence }) {
    return analyticsRepository.recordEvent({
      eventType: 'escalated',
      sessionId,
      messageId,
      metadata: { confidence }
    });
  },

  async recordFeedback({ sessionId, messageId, rating }) {
    return analyticsRepository.recordEvent({
      eventType: rating === 'thumbs_up' ? 'feedback_positive' : 'feedback_negative',
      sessionId,
      messageId,
      metadata: { rating }
    });
  },

  async getSummary() {
    const summary = await analyticsRepository.summary();
    const totalQueries = Number(summary.total_queries);
    const aiResolvedQueries = Number(summary.ai_resolved_queries);
    const escalatedQueries = Number(summary.escalated_queries);

    return {
      totalQueries,
      aiResolvedQueries,
      escalatedQueries,
      resolutionRate: rate(aiResolvedQueries, totalQueries),
      escalationRate: rate(escalatedQueries, totalQueries),
      positiveFeedback: Number(summary.positive_feedback),
      negativeFeedback: Number(summary.negative_feedback)
    };
  },

  async unresolvedQuestions(limit) {
    return analyticsRepository.unresolvedQuestions(limit);
  },

  async topics(limit) {
    return analyticsRepository.topics(limit);
  },

  async feedbackStats() {
    return analyticsRepository.feedbackStats();
  }
};
