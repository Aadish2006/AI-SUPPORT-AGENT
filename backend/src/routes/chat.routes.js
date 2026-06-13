import { Router } from 'express';
import { chatController } from '../controllers/chatController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { sendMessageSchema, sessionMessagesSchema } from '../validators/chat.validator.js';

export const chatRoutes = Router();

chatRoutes.post(
  '/message',
  validateRequest(sendMessageSchema),
  asyncHandler(chatController.sendMessage)
);

chatRoutes.get(
  '/sessions/:sessionId/messages',
  validateRequest(sessionMessagesSchema),
  asyncHandler(chatController.listMessages)
);
