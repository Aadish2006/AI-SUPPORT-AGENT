import { unlink } from 'node:fs/promises';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { knowledgeRepository } from '../repositories/knowledgeRepository.js';
import { vectorStore } from '../vector/vectorStore.js';
import { parseUploadedFile } from '../utils/fileParser.js';
import { embeddingService } from './embeddingService.js';

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 900,
  chunkOverlap: 150
});

export const documentIngestionService = {
  async ingestUploadedDocument({ file, title, sourceType }) {
    try {
      const text = await parseUploadedFile(file);
      return await this.ingestText({
        title,
        sourceType,
        sourceName: file.originalname,
        text,
        metadata: { mimeType: file.mimetype }
      });
    } finally {
      await unlink(file.path).catch(() => undefined);
    }
  },

  async ingestFaq({ title, items }) {
    const text = items
      .map((item) => `Question: ${item.question}\nAnswer: ${item.answer}`)
      .join('\n\n');

    return this.ingestText({
      title,
      sourceType: 'faq',
      sourceName: title,
      text,
      metadata: { itemCount: items.length }
    });
  },

  async ingestText({ title, sourceType, sourceName, text, metadata = {} }) {
    const chunks = await splitter.splitText(text);
    const document = await knowledgeRepository.create({
      title,
      sourceType,
      sourceName,
      chunksCount: chunks.length,
      metadata
    });

    const embeddings = await embeddingService.embedDocuments(chunks);
    const metadatas = chunks.map((_, index) => ({
      documentId: document.id,
      title,
      sourceType,
      chunkIndex: index
    }));

    await vectorStore.addChunks({
      documentId: document.id,
      chunks,
      embeddings,
      metadatas
    });

    return document;
  },

  async listDocuments() {
    return knowledgeRepository.list();
  },

  async deleteDocument(documentId) {
    const document = await knowledgeRepository.delete(documentId);
    if (document) {
      await vectorStore.deleteDocument(documentId);
    }
    return document;
  }
};
