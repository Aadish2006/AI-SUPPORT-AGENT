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

    const memory = await memoryService.getSessionMemory(session.id);

    const userMessage = await chatRepository.createMessage({
      sessionId: session.id,
      role: 'user',
      content: message
    });

    await analyticsService.recordQuery({
      sessionId: session.id,
      messageId: userMessage.id
    });

    const ragResult = await ragService.answerQuestion({ question: message, memory });

    const lowerMessage = message.toLowerCase();
    const unsupportedActionKeywords = [
      'refund', 'cancel my order', 'change my email', 'reset my password for me',
      'approve', 'purchase', 'charge', 'delete my account'
    ];
    const isUnsupportedAction = unsupportedActionKeywords.some(kw => lowerMessage.includes(kw));
    const noDocsFound = !ragResult.sources || ragResult.sources.length === 0;

    const lowerAnswer = (ragResult.answer || '').toLowerCase();
    const unableToAnswerPhrases = [
      'cannot find information',
      'unable to find',
      'do not have information',
      'don\'t have information',
      'should be escalated',
      'outside my knowledge',
      'not related to',
      'no relevant information',
      'i\'m not able to help',
      'beyond my scope',
      'cannot assist with',
      'i don\'t have enough information',
      'no information available'
    ];
    const isUnableToAnswer = unableToAnswerPhrases.some(phrase => lowerAnswer.includes(phrase));

    const hasHistory = memory && memory.trim().length > 0;
    const effectiveThreshold = hasHistory ? 0.5 : CONFIDENCE_THRESHOLD;
    const isBelowConfidenceThreshold = (ragResult.confidence || 0) < effectiveThreshold;

    const isGreeting = isGreetingOrPleasantry(message);
    const shouldEscalate = isUnsupportedAction || 
                           (!isGreeting && noDocsFound) || 
                           isUnableToAnswer || 
                           (!isGreeting && isBelowConfidenceThreshold);

    if (shouldEscalate) {
      const reason = isUnsupportedAction
        ? 'Action requested that AI cannot perform'
        : noDocsFound
        ? 'No relevant documents found in knowledge base'
        : isUnableToAnswer
        ? 'Query is outside the knowledge base'
        : `Low confidence score (${ragResult.confidence}) below threshold (${effectiveThreshold})`;

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

function isGreetingOrPleasantry(message) {
  const lower = message.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
  const greetings = new Set([
    'hi', 'hello', 'hey', 'greetings', 'sup', 'yo', 'hola', 'bonjour',
    'good morning', 'good afternoon', 'good evening',
    'how are you', 'how is it going', 'hows it going', 'whats up', 'whatsup',
    'thank you', 'thanks', 'thanks a lot', 'thank you so much',
    'cool', 'ok', 'okay', 'great', 'awesome', 'nice'
  ]);
  return greetings.has(lower) || (lower.split(/\s+/).length <= 2 && [...greetings].some(g => lower.includes(g)));
}
