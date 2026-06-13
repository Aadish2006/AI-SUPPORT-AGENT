# AI Support Agent Backend

Express backend for a RAG-based customer support agent.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run dev
```

The API is exposed under `/api/v1`.

## Main Modules

- `routes`: HTTP endpoint definitions only.
- `controllers`: Request/response orchestration.
- `services`: Business use cases such as chat, RAG, memory, escalation, analytics.
- `repositories`: PostgreSQL access.
- `ai`: Gemini and LangChain prompt/chain integration.
- `vector`: ChromaDB client and retrieval helpers.
- `database`: PostgreSQL pool and migrations.
