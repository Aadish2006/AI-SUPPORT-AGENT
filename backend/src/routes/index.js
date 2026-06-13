import { Router } from 'express';
import { analyticsRoutes } from './analytics.routes.js';
import { chatRoutes } from './chat.routes.js';
import { escalationRoutes } from './escalation.routes.js';
import { feedbackRoutes } from './feedback.routes.js';
import { knowledgeRoutes } from './knowledge.routes.js';

export const router = Router();

router.use('/chat', chatRoutes);
router.use('/knowledge', knowledgeRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/escalations', escalationRoutes);
router.use('/analytics', analyticsRoutes);
