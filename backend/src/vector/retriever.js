import { getKnowledgeCollection } from './chromaClient.js';

export const retriever = {
  async search({ embedding, topK = 5 }) {
    const collection = await getKnowledgeCollection();
    const result = await collection.query({
      queryEmbeddings: [embedding],
      nResults: topK,
      include: ['documents', 'metadatas', 'distances']
    });

    const documents = result.documents?.[0] ?? [];
    const metadatas = result.metadatas?.[0] ?? [];
    const distances = result.distances?.[0] ?? [];

    return documents.map((content, index) => ({
      content,
      metadata: metadatas[index] ?? {},
      distance: distances[index] ?? 1,
      score: Math.max(0, 1 - (distances[index] ?? 1))
    }));
  }
};
