import { escalationService } from '../services/escalationService.js';
import { ApiError } from '../utils/ApiError.js';
import { ok } from '../utils/ApiResponse.js';

export const escalationController = {
  async list(req, res) {
    const escalations = await escalationService.list(req.validated.query.status);
    return ok(res, escalations);
  },

  async getById(req, res) {
    const escalation = await escalationService.getById(req.validated.params.escalationId);
    if (!escalation) {
      throw new ApiError(404, 'Escalation not found.');
    }
    return ok(res, escalation);
  },

  async updateStatus(req, res) {
    const escalation = await escalationService.updateStatus({
      escalationId: req.validated.params.escalationId,
      status: req.validated.body.status,
      agentNotes: req.validated.body.agentNotes
    });
    if (!escalation) {
      throw new ApiError(404, 'Escalation not found.');
    }
    return ok(res, escalation);
  }
};
