import { langchainChatModel } from '../langchainClient.js';
import { buildSupportAnswerPrompt } from '../prompts/supportAnswerPrompt.js';

export async function runRagAnswerChain({ question, context, memory }) {
  const response = await langchainChatModel.invoke(
    buildSupportAnswerPrompt({ question, context, memory })
  );
  return response.content;
}
