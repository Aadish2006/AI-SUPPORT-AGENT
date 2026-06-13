import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const analyticsRoutes = Router();

analyticsRoutes.get('/summary', asyncHandler(analyticsController.summary));
analyticsRoutes.get('/unresolved-questions', asyncHandler(analyticsController.unresolvedQuestions));
analyticsRoutes.get('/topics', asyncHandler(analyticsController.topics));
analyticsRoutes.get('/feedback', asyncHandler(analyticsController.feedback));
