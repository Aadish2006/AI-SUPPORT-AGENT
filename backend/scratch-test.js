import { ragService } from './src/services/ragService.js';
import { env } from './src/config/env.js';
async function test() {
  const result = await ragService.answerQuestion({ question: "battery drain", memory: "" });
  console.log(JSON.stringify(result, null, 2));
}
test().catch(console.error);
