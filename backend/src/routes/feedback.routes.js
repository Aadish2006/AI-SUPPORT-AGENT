import { Router } from 'express';
import { feedbackController } from '../controllers/feedbackController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { submitFeedbackSchema } from '../validators/feedback.validator.js';

export const feedbackRoutes = Router();

feedbackRoutes.post(
  '/',
  validateRequest(submitFeedbackSchema),
  asyncHandler(feedbackController.submit)
);
