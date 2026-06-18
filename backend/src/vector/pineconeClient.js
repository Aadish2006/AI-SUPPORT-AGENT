import { Pinecone } from '@pinecone-database/pinecone';
import { env, requireEnv } from '../config/env.js';

let pinecone;
let pineconeIndex;

export function getPineconeIndex() {
  if (!pineconeIndex) {
    const apiKey = requireEnv('PINECONE_API_KEY', env.pineconeApiKey);
    pinecone = new Pinecone({ apiKey });
    pineconeIndex = pinecone.index(env.pineconeIndex);
  }
  return pineconeIndex;
}
