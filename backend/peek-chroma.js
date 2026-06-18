import { ChromaClient } from 'chromadb';

// Connect to your local ChromaDB container
const client = new ChromaClient({ path: "http://localhost:8000" });

async function peek() {
  try {
    // Grab the collection defined in your .env
    const collection = await client.getCollection({ name: "support_knowledge_base" });
    
    const count = await collection.count();
    console.log(`✅ Success! Total chunks currently stored in ChromaDB: ${count}`);

    if (count > 0) {
      console.log("\n--- Fetching a sample of 3 chunks ---");
      // Get the first 3 chunks stored
      const results = await collection.get({ limit: 3 });
      
      results.documents.forEach((doc, idx) => {
        console.log(`\n📦 [Chunk ID: ${results.ids[idx]}]`);
        console.log(`🏷️ Metadata:`, results.metadatas[idx]);
        console.log(`📝 Text Preview: "${doc.substring(0, 150)}..."`);
      });
    }
  } catch (err) {
    console.error("❌ Error accessing ChromaDB. Make sure Docker is running!", err.message);
  }
}

peek();
