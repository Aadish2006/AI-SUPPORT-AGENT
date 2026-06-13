import { getKnowledgeCollection } from './chromaClient.js';

export const vectorStore = {
  async addChunks({ documentId, chunks, embeddings, metadatas }) {
    const collection = await getKnowledgeCollection();
    const ids = chunks.map((_, index) => `${documentId}:${index}`);

    await collection.add({
      ids,
      documents: chunks,
      embeddings,
      metadatas
    });

    return ids;
  },

  async deleteDocument(documentId) {
    const collection = await getKnowledgeCollection();
    await collection.delete({ where: { documentId } });
  }
};
