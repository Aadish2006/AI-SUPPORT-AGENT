import { runEscalationSummaryChain } from '../ai/chains/escalationSummaryChain.js';
import { escalationRepository } from '../repositories/escalationRepository.js';
import { sessionRepository } from '../repositories/sessionRepository.js';
import { chatRepository } from '../repositories/chatRepository.js';

export const escalationService = {
  async escalate({ sessionId, latestQuestion, confidence, reason = 'Low confidence RAG answer' }) {
    const messages = await chatRepository.listMessages(sessionId);
    const summary = await runEscalationSummaryChain({ messages, latestQuestion, confidence });
    const escalation = await escalationRepository.create({
      sessionId,
      reason,
      summary,
      confidence
    });

    await sessionRepository.markEscalated(sessionId);

    return escalation;
  },

  async list(status) {
    return escalationRepository.list(status);
  },

  async getById(escalationId) {
    const escalation = await escalationRepository.findById(escalationId);
    if (!escalation) return null;
    const messages = await chatRepository.listMessages(escalation.session_id);
    return { ...escalation, messages };
  },

  async updateStatus(payload) {
    return escalationRepository.updateStatus(payload);
  }
};
