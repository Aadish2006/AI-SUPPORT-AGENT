import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  apiPrefix: process.env.API_PREFIX ?? '/api/v1',
  databaseUrl: process.env.DATABASE_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL ?? 'gemini-1.5-flash',
  geminiEmbeddingModel: process.env.GEMINI_EMBEDDING_MODEL ?? 'text-embedding-004',
  pineconeApiKey: process.env.PINECONE_API_KEY,
  pineconeIndex: process.env.PINECONE_INDEX ?? 'support-agent',
  confidenceThreshold: Number(process.env.CONFIDENCE_THRESHOLD ?? 0.65),
  maxMemoryMessages: Number(process.env.MAX_MEMORY_MESSAGES ?? 12),
  uploadDir: process.env.UPLOAD_DIR ?? 'uploads'
};

export function requireEnv(name, value) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
