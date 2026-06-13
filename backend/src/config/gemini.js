import { env, requireEnv } from './env.js';

export const geminiConfig = {
  apiKey: requireEnv('GEMINI_API_KEY', env.geminiApiKey),
  model: env.geminiModel,
  embeddingModel: env.geminiEmbeddingModel
};
