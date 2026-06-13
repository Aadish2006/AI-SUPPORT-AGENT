import { feedbackService } from '../services/feedbackService.js';
import { created } from '../utils/ApiResponse.js';

export const feedbackController = {
  async submit(req, res) {
    const feedback = await feedbackService.submitFeedback(req.validated.body);
    return created(res, {
      feedbackId: feedback.id,
      rating: feedback.rating
    });
  }
};
