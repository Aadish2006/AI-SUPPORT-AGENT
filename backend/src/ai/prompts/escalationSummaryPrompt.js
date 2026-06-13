export function buildEscalationSummaryPrompt({ messages, latestQuestion, confidence }) {
  const transcript = messages.map((message) => `${message.role}: ${message.content}`).join('\n');

  return `
Create a structured summary for a human support agent.

Latest customer question:
${latestQuestion}

AI confidence:
${confidence}

Full conversation:
${transcript}

Include: issue, attempted answer, likely product area, missing information, and recommended next step.
`;
}
