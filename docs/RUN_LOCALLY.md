# Run The AI Support Agent Locally

This project has two apps:

- `backend`: Express API, PostgreSQL, ChromaDB, Gemini, LangChain
- `frontend`: Vite React UI

## 1. Start PostgreSQL and ChromaDB

From the project root:

```bash
docker compose up -d
```

Check containers:

```bash
docker ps
```

You should see:

- `ai-support-postgres`
- `ai-support-chroma`

## 2. Configure Backend Environment

Create backend `.env`:

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and set:

```txt
GEMINI_API_KEY=your_real_gemini_api_key
```

Keep these local defaults:

```txt
DATABASE_URL=postgres://postgres:postgres@localhost:5432/ai_support_agent
CHROMA_URL=http://localhost:8000
PORT=5050
GEMINI_MODEL=gemini-2.5-flash
GEMINI_EMBEDDING_MODEL=gemini-embedding-001
```

## 3. Install Backend Dependencies

```bash
cd backend
npm install
```

## 4. Create Database Tables

```bash
npm run migrate
```

## 5. Add Demo Knowledge Base Data

This sends sample support docs to ChromaDB using Gemini embeddings:

```bash
npm run seed
```

## 6. Start Backend

```bash
npm run dev
```

Backend should run on:

```txt
http://localhost:5050
```

Health check:

```bash
curl http://localhost:5050/health
```

## 7. Configure Frontend Environment

Open a second terminal:

```bash
cd frontend
cp .env.example .env
```

The default is:

```txt
VITE_API_BASE_URL=/api/v1
```

Vite will proxy `/api` requests to the backend.

## 8. Install Frontend Dependencies

```bash
npm install
```

## 9. Start Frontend

```bash
npm run dev
```

Open the URL shown by Vite, usually:

```txt
http://localhost:5173
```

## 10. Test Demo Questions

Try these in chat:

```txt
My laptop battery drains quickly.
```

Then:

```txt
How long does calibration take?
```

Try:

```txt
How do I reset my password?
```

Try an escalation case:

```txt
I was charged incorrectly and want a refund.
```

## How To Know It Is Working

- Chat replies come from backend, not mock data.
- Messages are stored in PostgreSQL.
- Knowledge answers are retrieved from ChromaDB.
- Low-confidence/refund/billing cases can escalate.
- Feedback buttons save to backend.
- Admin analytics update after real chat activity.

## Common Problems

If backend says Gemini key is missing:

```txt
Check backend/.env and restart npm run dev.
```

If seed fails:

```txt
Make sure docker compose up -d is running and GEMINI_API_KEY is valid.
```

If Gemini embeddings are unavailable for your key, the backend falls back to local deterministic embeddings so the demo can still run.

If frontend shows backend error:

```txt
Make sure backend is running on port 5050.
```

If database connection fails:

```txt
docker compose ps
docker compose logs postgres
```

If ChromaDB connection fails:

```txt
docker compose logs chroma
```
