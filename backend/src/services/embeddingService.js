import { langchainEmbeddings } from '../ai/langchainClient.js';

export const embeddingService = {
  async embedText(text) {
    return langchainEmbeddings.embedQuery(text);
  },

  async embedDocuments(texts) {
    return langchainEmbeddings.embedDocuments(texts);
  }
};
