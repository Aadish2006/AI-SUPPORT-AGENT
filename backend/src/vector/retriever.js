import { getPineconeIndex } from './pineconeClient.js';

export const retriever = {
  async search({ embedding, topK = 5 }) {
    const index = getPineconeIndex();
    const result = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true
    });

    const matches = result.matches ?? [];

    return matches.map((match) => {
      const { text, ...metadata } = match.metadata ?? {};
      const score = Math.max(0, match.score ?? 0);
      return {
        content: text ?? '',
        metadata,
        distance: 1 - score,
        score
      };
    });
  }
};
