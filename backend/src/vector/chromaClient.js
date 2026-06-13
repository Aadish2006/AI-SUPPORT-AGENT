import { ChromaClient } from 'chromadb';
import { chromaConfig } from '../config/chroma.js';

export const chromaClient = new ChromaClient({
  host: chromaConfig.host,
  port: chromaConfig.port,
  ssl: chromaConfig.ssl
});

export async function getKnowledgeCollection() {
  return chromaClient.getOrCreateCollection({
    name: chromaConfig.collectionName
  });
}
