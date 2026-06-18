<p align="center">
  <h1 align="center">AI-Powered Customer Support Agent</h1>
  <p align="center">
    A full-stack, context-aware support system built on Retrieval-Augmented Generation.<br/>
    Resolves Tier-1 queries autonomously · Escalates edge cases with structured handoffs · Learns from feedback.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/gemini-2.5--flash-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/postgres-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/chromadb-vector--store-FF6F00?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Demo & Testing](#demo--testing)
- [Troubleshooting](#troubleshooting)

---

## Overview

Support teams spend **60–80 %** of their time answering the same 20 questions. This system replaces Tier-1 support with an intelligent agent that:

1. **Retrieves** relevant knowledge from product docs, FAQs, and past tickets using semantic search.
2. **Generates** accurate, context-aware responses via Google Gemini with full conversation memory.
3. **Escalates** edge cases — low confidence, out-of-scope queries, or actionable requests — to a human queue with a complete context summary so the agent never re-reads the thread.
4. **Learns** from user feedback to surface knowledge gaps and continuously improve the knowledge base.

---

## Architecture

```mermaid
graph TD
    User([Customer]) -->|Sends Message| Frontend[React + Vite Frontend]
    Frontend -->|HTTP POST /api/v1/chat| Backend[Express API Server]

    subgraph "RAG Pipeline"
        Backend -->|1 · Embed query| EmbedService{Embedding Service}
        EmbedService -->|Primary| GeminiEmbed[Gemini gemini-embedding-001]
        EmbedService -.->|Fallback| LocalEmbed[Local TF Hashing Vectorizer]
        Backend -->|2 · Semantic search top-5| ChromaDB[(ChromaDB)]
        ChromaDB -->|Ranked chunks| Backend
        Backend -->|3 · Prompt + Memory + Context| GeminiLLM[Gemini 2.5 Flash]
        GeminiLLM -->|Generated answer| Backend
    end

    subgraph "Confidence & Guardrails"
        Backend -->|4 · Score & classify| Guard{Guardrails Engine}
        Guard -->|Below threshold / keyword trigger| EscQ[Escalation Queue]
        Guard -->|Above threshold| Frontend
    end

    subgraph "Persistence"
        Backend -->|Audit trail| Postgres[(PostgreSQL)]
        Backend -->|Feedback signals| Postgres
    end

    Admin([Admin / Agent]) -->|Dashboard| AdminUI[Admin Panel]
    AdminUI --> Postgres
    AdminUI --> ChromaDB
```

**Data flow in a single request:**

| Step | Component | Action |
|:----:|:----------|:-------|
| 1 | Embedding Service | Convert user query to a 768-dim vector (Gemini) or 384-dim fallback |
| 2 | ChromaDB | Return top-5 semantically similar knowledge chunks |
| 3 | LangChain + Gemini | Generate answer using retrieved context + conversation memory |
| 4 | Guardrails Engine | Compute confidence score; check keyword triggers; decide resolve vs. escalate |
| 5 | PostgreSQL | Persist message, analytics event, and optional escalation record |

---

## Key Features

### 1 · RAG Knowledge Base

- Ingest product docs via **PDF upload**, **plain text**, or **manual article entry**.
- Documents are sentence-split using LangChain text splitters and embedded into ChromaDB.
- Each query retrieves the **top-5** most relevant chunks before generation.
- **Deterministic fallback embeddings** — when the Gemini API is unavailable, the system switches to a local 384-dimensional term-frequency hashing vectorizer to prevent downtime.

### 2 · Multi-Turn Conversation Memory

- Maintains a sliding window of the last **12 messages** per session (configurable via `MAX_MEMORY_MESSAGES`).
- Follow-up questions are resolved in context without requiring the user to repeat themselves.

### 3 · Confidence Scoring & Intelligent Escalation

Every AI response receives a composite confidence score:

$$\text{Confidence} = \underbrace{(\text{RetrievalScore} \times 0.65)}_{\text{Semantic relevance}} + \underbrace{(\min(\tfrac{\text{SourceCount}}{3},\, 1) \times 0.20)}_{\text{Evidence breadth}} + \underbrace{(\text{LengthFactor} \times 0.15)}_{\text{Answer quality}}$$

Escalation triggers automatically under any of these conditions:

| Trigger | Example |
|:--------|:--------|
| **Keyword safeguard** | `refund`, `cancel my order`, `delete my account`, `charge` |
| **Low confidence score** | Composite score falls below the configurable `CONFIDENCE_THRESHOLD` (default 0.65) |
| **Zero retrieval matches** | Query has no relevant documents in the knowledge base |
| **LLM self-assessment** | Model responds with "cannot find information", "beyond my scope", or equivalent |

> **Note:** For multi-turn follow-up queries, the confidence threshold is dynamically relaxed to `0.50` to prevent false-positive escalations on short contextual questions.

On escalation, the system generates a **structured handoff summary** via a dedicated LangChain chain so the human agent has complete context on arrival.

### 4 · Live Chat Interface

- Real-time chat UI with **typing indicators**, **message timestamps**, and **markdown rendering**.
- Visual distinction between AI-generated responses and human-agent messages.
- **Escalation banner** displayed when a conversation is routed to the human queue.
- **Confidence pill** on each AI message showing the computed score.
- **Feedback buttons** (👍 / 👎) on every AI response.

### 5 · Admin Analytics Dashboard

- **Query Volume Trends** — daily request counts (interactive line chart).
- **Resolution Ratios** — AI-resolved vs. human-escalated (interactive pie chart).
- **Topic Breakdown** — category-wise distribution (interactive bar chart).
- **Unresolved Questions Tracker** — surfaces queries that triggered escalations to highlight knowledge gaps.
- **Feedback Statistics** — positive vs. negative rating breakdown.

### 6 · Knowledge Base Management

- **Upload** PDF or text files — documents are automatically chunked and embedded.
- **Search, filter, edit, or add** articles manually via the admin panel.
- Changes are synchronized to ChromaDB in real time.

### 7 · Agent Persona Configuration

- Customize bot name, welcome message, and system instructions.
- Adjust the **confidence threshold** via a sliding scale.
- Modify fallback responses — all changes take effect immediately.

---

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Runtime** | Node.js (ES Modules) + Express |
| **AI / LLM** | Google Gemini API (`@google/generative-ai`), LangChain (`@langchain/core`, `@langchain/google-genai`) |
| **Vector Store** | ChromaDB |
| **Database** | PostgreSQL 16 (via `pg`) |
| **Validation** | Zod |
| **File Processing** | `pdf-parse`, `multer` |
| **Frontend** | React 19 + Vite |
| **Styling** | TailwindCSS + Lucide Icons |
| **Charts** | Recharts |
| **Markdown** | `react-markdown` + `remark-gfm` |
| **Routing** | `react-router-dom` |
| **Infrastructure** | Docker Compose (PostgreSQL + ChromaDB) |

---

## Project Structure

```
AI-SUPPORT-AGENT/
├── backend/
│   ├── src/
│   │   ├── ai/                # Gemini client, LangChain prompt chains
│   │   │   ├── chains/        # RAG answer chain, escalation summary chain
│   │   │   └── prompts/       # Prompt templates
│   │   ├── config/            # Environment & database connection config
│   │   ├── constants/         # Confidence thresholds, system constants
│   │   ├── controllers/       # Express request handlers
│   │   ├── database/          # SQL migrations & demo seed scripts
│   │   ├── middleware/        # Error handling, logging, validation
│   │   ├── repositories/     # PostgreSQL data access layer
│   │   ├── routes/            # Express router definitions
│   │   ├── services/          # Core business logic
│   │   │   ├── chatService.js
│   │   │   ├── ragService.js
│   │   │   ├── embeddingService.js
│   │   │   ├── escalationService.js
│   │   │   ├── analyticsService.js
│   │   │   ├── feedbackService.js
│   │   │   ├── memoryService.js
│   │   │   └── documentIngestionService.js
│   │   ├── utils/             # Confidence scoring, logger, error classes
│   │   ├── validators/        # Zod request payload schemas
│   │   └── vector/            # ChromaDB client & retrieval helpers
│   ├── uploads/               # Uploaded document staging directory
│   ├── package.json
│   └── nodemon.json
│
├── frontend/
│   ├── src/
│   │   ├── api/               # Axios API connectors
│   │   ├── components/
│   │   │   ├── admin/         # Dashboard, charts, KB manager, settings
│   │   │   ├── chat/          # Chat page, message bubbles, input bar
│   │   │   └── layout/        # App shell, responsive sidebar
│   │   ├── hooks/             # Custom React hooks for API state
│   │   ├── data/              # Static/mock data assets
│   │   ├── utils/             # Frontend utility helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── docs/
│   └── RUN_LOCALLY.md         # Detailed setup guide & test cases
├── docker-compose.yml         # PostgreSQL 16 + ChromaDB containers
└── README.md
```

---

## Getting Started

### Prerequisites

| Tool | Version |
|:-----|:--------|
| **Node.js** | ≥ 18 |
| **Docker** & **Docker Compose** | Latest |
| **Google Gemini API Key** | [Get one here](https://aistudio.google.com/apikey) |

### 1 — Start Infrastructure

```bash
docker compose up -d
```

Verify both containers are running:

```bash
docker ps
# Expected: ai-support-postgres, ai-support-chroma
```

### 2 — Configure & Launch Backend

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and set your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Install dependencies, run migrations, seed the demo knowledge base, and start the server:

```bash
npm install
npm run migrate    # Create PostgreSQL tables
npm run seed       # Load sample support docs into ChromaDB
npm run dev        # Start on http://localhost:5050
```

Verify the backend is healthy:

```bash
curl http://localhost:5050/health
```

### 3 — Launch Frontend

In a new terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev        # Start on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|:---------|:--------|:------------|
| `NODE_ENV` | `development` | Runtime environment |
| `PORT` | `5050` | API server port |
| `API_PREFIX` | `/api/v1` | Base path for all API routes |
| `DATABASE_URL` | `postgres://postgres:postgres@localhost:5432/ai_support_agent` | PostgreSQL connection string |
| `GEMINI_API_KEY` | — | **Required.** Google Gemini API key |
| `GEMINI_MODEL` | `gemini-2.5-flash` | LLM model for answer generation |
| `GEMINI_EMBEDDING_MODEL` | `gemini-embedding-001` | Embedding model for vector search |
| `CHROMA_URL` | `http://localhost:8000` | ChromaDB server URL |
| `CHROMA_COLLECTION` | `support_knowledge_base` | ChromaDB collection name |
| `CONFIDENCE_THRESHOLD` | `0.65` | Minimum score before escalation |
| `MAX_MEMORY_MESSAGES` | `12` | Conversation memory window size |
| `UPLOAD_DIR` | `uploads` | Directory for uploaded documents |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|:---------|:--------|:------------|
| `VITE_API_BASE_URL` | `/api/v1` | Backend API base URL (proxied by Vite) |

---

## API Reference

| Endpoint | Method | Description |
|:---------|:------:|:------------|
| `/health` | `GET` | System health check |
| `/api/v1/chat/message` | `POST` | Send a message — triggers the full RAG pipeline |
| `/api/v1/chat/sessions/:sessionId/messages` | `GET` | Retrieve message history for a session |
| `/api/v1/knowledge/documents` | `GET` | List all knowledge base documents |
| `/api/v1/knowledge/documents/:documentId` | `DELETE` | Remove a document from the knowledge base |
| `/api/v1/knowledge/documents` | `POST` | Upload a PDF or text file for ingestion (multipart) |
| `/api/v1/knowledge/faqs` | `POST` | Add a new FAQ article manually |
| `/api/v1/feedback` | `POST` | Submit thumbs-up / thumbs-down feedback |
| `/api/v1/escalations` | `GET` | List escalated conversations (filterable by status) |
| `/api/v1/escalations/:escalationId` | `GET` | Get details for a specific escalation |
| `/api/v1/escalations/:escalationId/status` | `PATCH` | Resolve or update an escalation status |
| `/api/v1/analytics/summary` | `GET` | Fetch dashboard summary metrics |
| `/api/v1/analytics/topics` | `GET` | Topic breakdown distribution |
| `/api/v1/analytics/unresolved-questions` | `GET` | Queries that triggered escalation |
| `/api/v1/analytics/feedback` | `GET` | Feedback statistics |

---

## Demo & Testing

After setup, open the chat interface and try these queries to verify the full pipeline:

### ✅ Successful RAG Resolution

> **User:** _"My laptop battery drains quickly."_
>
> **Expected:** The agent retrieves relevant knowledge chunks and responds with specific troubleshooting steps (background apps, battery saver mode, calibration). Confidence score should be high.

### ✅ Multi-Turn Follow-Up

> **User:** _"How long does calibration take?"_
>
> **Expected:** Without re-stating the topic, the agent understands "calibration" refers to the laptop battery discussion and provides a direct answer using conversation memory.

### 🚨 Keyword-Based Escalation

> **User:** _"I was charged incorrectly and want a refund."_
>
> **Expected:** The keyword `refund` triggers an automatic escalation. The user sees a handoff message and the escalation appears in the admin queue with a generated context summary.

### 🚨 Knowledge Gap Escalation

> **User:** _"How do I fix a broken spaceship engine?"_
>
> **Expected:** Retrieved documents have very low semantic similarity. The confidence score (≈ 0.29) falls below the 0.65 threshold, triggering automatic escalation. The user sees a handoff message and the query is logged as an unresolved question in the admin dashboard.

### Success Criteria

| Metric | Target |
|:-------|:-------|
| Autonomous resolution rate | ≥ 70 % of test queries |
| Out-of-scope detection | 100 % of escalation test cases |
| Admin dashboard | Renders real data from the demo session |
| Follow-up handling | Correctly references earlier turns |
| Knowledge base refresh | Updates reflected in ≤ 60 seconds |

---

## Troubleshooting

| Problem | Solution |
|:--------|:---------|
| `Gemini key is missing` | Check `backend/.env` has a valid `GEMINI_API_KEY` and restart the backend |
| `npm run seed` fails | Ensure Docker containers are running (`docker compose up -d`) and the API key is valid |
| Gemini embeddings unavailable | The backend automatically falls back to local deterministic embeddings — the demo will still run |
| Frontend shows network errors | Verify the backend is running on port `5050` |
| Database connection refused | Run `docker compose ps` and check `docker compose logs postgres` |
| ChromaDB connection refused | Run `docker compose logs chroma` |

---

<p align="center">
  Built with ❤️ using Google Gemini, LangChain, React, and PostgreSQL
</p>
