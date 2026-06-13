import { env } from '../config/env.js';

const url = new URL('https://generativelanguage.googleapis.com/v1beta/models');
url.searchParams.set('key', env.geminiApiKey);

const response = await fetch(url);
const payload = await response.json();

if (!response.ok) {
  console.error(payload);
  process.exit(1);
}

const models = payload.models ?? [];

console.log('\nModels supporting generateContent:\n');
for (const model of models.filter((item) => item.supportedGenerationMethods?.includes('generateContent'))) {
  console.log(`- ${model.name.replace('models/', '')}`);
}

console.log('\nModels supporting embedContent:\n');
for (const model of models.filter((item) => item.supportedGenerationMethods?.includes('embedContent'))) {
  console.log(`- ${model.name.replace('models/', '')}`);
}
