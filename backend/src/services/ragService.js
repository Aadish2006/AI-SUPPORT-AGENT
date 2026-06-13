import { runRagAnswerChain } from '../ai/chains/ragAnswerChain.js';
import { retriever } from '../vector/retriever.js';
import { calculateConfidence } from '../utils/confidence.js';
import { embeddingService } from './embeddingService.js';

export const ragService = {
  async answerQuestion({ question, memory }) {
    const queryEmbedding = await embeddingService.embedText(question);
    const matches = await retriever.search({ embedding: queryEmbedding, topK: 5 });
    const context = matches
      .map((match, index) => `[Source ${index + 1}] ${match.content}`)
      .join('\n\n');

    const answer = await runRagAnswerChain({ question, context, memory });
    const bestRetrievalScore = matches[0]?.score ?? 0;
    const confidence = calculateConfidence({
      retrievalScore: bestRetrievalScore,
      sourceCount: matches.length,
      answer
    });

    return {
      answer,
      confidence,
      sources: matches.map((match) => match.metadata),
      retrieval: matches
    };
  }
};
