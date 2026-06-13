import { feedbackRepository } from '../repositories/feedbackRepository.js';
import { analyticsService } from './analyticsService.js';

export const feedbackService = {
  async submitFeedback(payload) {
    const feedback = await feedbackRepository.create(payload);
    await analyticsService.recordFeedback({
      sessionId: payload.sessionId,
      messageId: payload.messageId,
      rating: payload.rating
    });
    return feedback;
  }
};
