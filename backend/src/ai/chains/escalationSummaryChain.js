import { langchainChatModel } from '../langchainClient.js';
import { buildEscalationSummaryPrompt } from '../prompts/escalationSummaryPrompt.js';

export async function runEscalationSummaryChain({ messages, latestQuestion, confidence }) {
  const response = await langchainChatModel.invoke(
    buildEscalationSummaryPrompt({ messages, latestQuestion, confidence })
  );
  return response.content;
}
