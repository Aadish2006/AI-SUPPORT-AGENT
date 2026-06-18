import { getPineconeIndex } from '../src/vector/pineconeClient.js';
import { env } from '../src/config/env.js';

async function run() {
  try {
    const index = getPineconeIndex();
    console.log("Index client loaded.");
    
    // Attempt deleting a test ID
    console.log("Testing index.deleteMany(['test-id-123'])...");
    await index.deleteMany(['test-id-123']);
    console.log("Success with deleteMany!");
  } catch (err) {
    console.error("deleteMany failed:", err);
  }

  try {
    const index = getPineconeIndex();
    console.log("Testing index.delete(['test-id-123'])...");
    // Some versions of the SDK use index.delete()
    await index.delete(['test-id-123']);
    console.log("Success with index.delete!");
  } catch (err) {
    console.error("index.delete failed:", err);
  }
}

run().catch(console.error);
