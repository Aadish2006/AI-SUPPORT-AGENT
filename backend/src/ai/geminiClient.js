import { GoogleGenerativeAI } from '@google/generative-ai';
import { geminiConfig } from '../config/gemini.js';

const genAI = new GoogleGenerativeAI(geminiConfig.apiKey);

export const geminiModel = genAI.getGenerativeModel({ model: geminiConfig.model });
export const geminiEmbeddingModel = genAI.getGenerativeModel({ model: geminiConfig.embeddingModel });
