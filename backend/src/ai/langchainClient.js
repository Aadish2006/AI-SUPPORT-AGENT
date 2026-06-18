import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { geminiConfig } from '../config/gemini.js';

export const langchainChatModel = new ChatGoogleGenerativeAI({
  apiKey: geminiConfig.apiKey,
  model: geminiConfig.model,
  temperature: 0.4,
  maxRetries: 5
});

export const langchainEmbeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: geminiConfig.apiKey,
  model: geminiConfig.embeddingModel
});
