import { getPineconeIndex } from './pineconeClient.js';

export const vectorStore = {
  async addChunks({ documentId, chunks, embeddings, metadatas }) {
    const index = getPineconeIndex();
    const ids = chunks.map((_, idx) => `${documentId}:${idx}`);

    const records = chunks.map((text, idx) => ({
      id: ids[idx],
      values: embeddings[idx],
      metadata: {
        ...metadatas[idx],
        text
      }
    }));

    await index.upsert(records);
    return ids;
  },

  async deleteDocument(documentId, chunksCount) {
    try {
      const index = getPineconeIndex();
      const count = chunksCount || 100;
      const ids = Array.from({ length: count }, (_, idx) => `${documentId}:${idx}`);
      await index.deleteMany(ids);
    } catch (error) {
      // Ignore 404 errors (such as Namespace not found on empty indexes)
      if (error.status === 404 || error.message?.includes('Namespace not found') || error.message?.includes('404')) {
        return;
      }
      throw error;
    }
  }
};
