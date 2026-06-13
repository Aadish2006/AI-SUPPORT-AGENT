import { env } from './env.js';

const chromaUrl = new URL(env.chromaUrl);

export const chromaConfig = {
  host: chromaUrl.hostname,
  port: Number(chromaUrl.port || (chromaUrl.protocol === 'https:' ? 443 : 80)),
  ssl: chromaUrl.protocol === 'https:',
  collectionName: env.chromaCollection
};
