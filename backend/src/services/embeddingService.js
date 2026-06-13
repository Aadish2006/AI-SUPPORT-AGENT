import { geminiEmbeddingModel } from '../ai/geminiClient.js';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

const LOCAL_EMBEDDING_DIMENSIONS = 384;

function localEmbedding(text) {
  const vector = Array.from({ length: LOCAL_EMBEDDING_DIMENSIONS }, () => 0);
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  for (const token of tokens) {
    let hash = 0;
    for (let index = 0; index < token.length; index += 1) {
      hash = (hash * 31 + token.charCodeAt(index)) >>> 0;
    }
    vector[hash % LOCAL_EMBEDDING_DIMENSIONS] += 1;
  }

  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => value / magnitude);
}

function assertEmbedding(values) {
  if (!Array.isArray(values) || values.length === 0 || values.some((value) => typeof value !== 'number')) {
    throw new ApiError(
      500,
      'Gemini did not return a valid embedding. Check GEMINI_API_KEY and GEMINI_EMBEDDING_MODEL.'
    );
  }

  return values;
}

export const embeddingService = {
  async embedText(text) {
    try {
      const result = await geminiEmbeddingModel.embedContent(text);
      return assertEmbedding(result.embedding?.values);
    } catch (error) {
      logger.warn(`Gemini embedding failed, using local fallback: ${error.message}`);
      return localEmbedding(text);
    }
  },

  async embedDocuments(texts) {
    const embeddings = [];

    for (const text of texts) {
      embeddings.push(await this.embedText(text));
    }

    return embeddings;
  }
};
