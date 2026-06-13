export function buildSupportAnswerPrompt({ question, context, memory }) {
  return `
You are a customer support agent. Answer only from the provided support context and conversation memory.
If the answer is not supported by the context, say that the case should be escalated.

Conversation memory:
${memory || 'No previous conversation.'}

Retrieved support context:
${context || 'No relevant support context found.'}

Customer question:
${question}

Return a concise, helpful answer. Mention practical steps when available.
`;
}
