import { analyticsService } from '../services/analyticsService.js';
import { ok } from '../utils/ApiResponse.js';

export const analyticsController = {
  async summary(_req, res) {
    return ok(res, await analyticsService.getSummary());
  },

  async unresolvedQuestions(_req, res) {
    return ok(res, await analyticsService.unresolvedQuestions());
  },

  async topics(_req, res) {
    return ok(res, await analyticsService.topics());
  },

  async feedback(_req, res) {
    return ok(res, await analyticsService.feedbackStats());
  }
};
