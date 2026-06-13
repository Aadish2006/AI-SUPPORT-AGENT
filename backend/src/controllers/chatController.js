import { chatService } from '../services/chatService.js';
import { ok } from '../utils/ApiResponse.js';

export const chatController = {
  async sendMessage(req, res) {
    const result = await chatService.handleMessage(req.validated.body);
    return ok(res, result);
  },

  async listMessages(req, res) {
    const { sessionId } = req.validated.params;
    const messages = await chatService.getMessages(sessionId);
    return ok(res, { sessionId, messages });
  }
};
