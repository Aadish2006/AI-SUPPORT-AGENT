import { env } from '../config/env.js';
import { chatRepository } from '../repositories/chatRepository.js';

export const memoryService = {
  async getSessionMemory(sessionId) {
    const messages = await chatRepository.listRecentMessages(sessionId, env.maxMemoryMessages);
    return messages
      .map((message) => `${message.role}: ${message.content}`)
      .join('\n');
  },

  async getConversationContext(sessionId) {
    return chatRepository.listMessages(sessionId);
  }
};
