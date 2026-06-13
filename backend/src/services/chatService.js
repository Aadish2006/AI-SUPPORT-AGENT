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

    const lowerMessage = message.toLowerCase();
    const unsupportedActionKeywords = [
      'refund', 'cancel my order', 'change my email', 'reset my password for me',
      'approve', 'purchase', 'charge', 'delete my account'
    ];
    const isUnsupportedAction = unsupportedActionKeywords.some(kw => lowerMessage.includes(kw));
    const noDocsFound = !ragResult.sources || ragResult.sources.length === 0;

    const isUnableToAnswer = ragResult.answer && (
      ragResult.answer.toLowerCase().includes('cannot find information') || 
      ragResult.answer.toLowerCase().includes('unable to find') ||
      ragResult.answer.toLowerCase().includes('do not have information')
    );

    const shouldEscalate = isUnsupportedAction || noDocsFound || isUnableToAnswer;

    if (shouldEscalate) {
      const reason = isUnsupportedAction
        ? 'Action requested that AI cannot perform'
        : noDocsFound
        ? 'No relevant documents found in knowledge base'
        : 'Query is outside the knowledge base';

      const escalation = await escalationService.escalate({
        sessionId: session.id,
        latestQuestion: message,
        confidence: ragResult.confidence || 0.5,
        reason
      });

      const assistantMessage = await chatRepository.createMessage({
        sessionId: session.id,
        role: 'assistant',
        content: isUnsupportedAction 
          ? "This request requires human assistance. Connecting you to a support specialist..."
          : "I cannot find information regarding this query. Connecting you to a human agent...",
        confidence: ragResult.confidence || 0.5,
        metadata: {
          status: 'escalated',
          escalationId: escalation.id,
          sources: ragResult.sources
        }
      });

      await analyticsService.recordEscalated({
        sessionId: session.id,
        messageId: userMessage.id,
        confidence: ragResult.confidence || 0.5
      });

      return {
        sessionId: session.id,
        messageId: assistantMessage.id,
        status: 'escalated',
        confidence: ragResult.confidence || 0.5,
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
