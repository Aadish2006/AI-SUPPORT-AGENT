import { Router } from 'express';
import { escalationController } from '../controllers/escalationController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  escalationIdSchema,
  listEscalationsSchema,
  updateEscalationStatusSchema
} from '../validators/escalation.validator.js';

export const escalationRoutes = Router();

escalationRoutes.get(
  '/',
  validateRequest(listEscalationsSchema),
  asyncHandler(escalationController.list)
);

escalationRoutes.get(
  '/:escalationId',
  validateRequest(escalationIdSchema),
  asyncHandler(escalationController.getById)
);

escalationRoutes.patch(
  '/:escalationId/status',
  validateRequest(updateEscalationStatusSchema),
  asyncHandler(escalationController.updateStatus)
);
