import { CONFIDENCE_THRESHOLD } from '../constants/confidenceThresholds.js';
import { chatRepository } from '../repositories/chatRepository.js';
import { sessionRepository } from '../repositories/sessionRepository.js';
import { analyticsService } from './analyticsService.js';
import { escalationService } from './escalationService.js';
import { memoryService } from './memoryService.js';
import { ragService } from './ragService.js';

export const chatService = {
  async handleMessage({ sessionId, userId, message }) {
    const session = await sessionRepository.findOrCreate(sessionId, userId);
    const userMessage = await chatRepository.createMessage({
      sessionId: session.id,
      role: 'user',
      content: message
    });

    await analyticsService.recordQuery({
      sessionId: session.id,
      messageId: userMessage.id
    });

    const memory = await memoryService.getSessionMemory(session.id);
    const ragResult = await ragService.answerQuestion({ question: message, memory });

    if (ragResult.confidence < CONFIDENCE_THRESHOLD) {
      const escalation = await escalationService.escalate({
        sessionId: session.id,
        latestQuestion: message,
        confidence: ragResult.confidence
      });

      const assistantMessage = await chatRepository.createMessage({
        sessionId: session.id,
        role: 'assistant',
        content: "I'm connecting you with a human support agent.",
        confidence: ragResult.confidence,
        metadata: {
          status: 'escalated',
          escalationId: escalation.id,
          sources: ragResult.sources
        }
      });

      await analyticsService.recordEscalated({
        sessionId: session.id,
        messageId: userMessage.id,
        confidence: ragResult.confidence
      });

      return {
        sessionId: session.id,
        messageId: assistantMessage.id,
        status: 'escalated',
        confidence: ragResult.confidence,
        message: assistantMessage.content,
        escalationId: escalation.id
      };
    }

    const assistantMessage = await chatRepository.createMessage({
      sessionId: session.id,
      role: 'assistant',
      content: ragResult.answer,
      confidence: ragResult.confidence,
      metadata: {
        status: 'resolved_by_ai',
        sources: ragResult.sources
      }
    });

    await analyticsService.recordAiResolved({
      sessionId: session.id,
      messageId: assistantMessage.id,
      confidence: ragResult.confidence
    });

    return {
      sessionId: session.id,
      messageId: assistantMessage.id,
      response: ragResult.answer,
      confidence: ragResult.confidence,
      status: 'resolved_by_ai',
      sources: ragResult.sources,
      timestamp: assistantMessage.created_at
    };
  },

  async getMessages(sessionId) {
    return chatRepository.listMessages(sessionId);
  }
};
