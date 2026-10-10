# queryMind

A personal knowledge management app for saving notes, links, and documents in one place and asking questions about your own content.

Instead of searching through files manually, queryMind lets you retrieve information from your saved content through a chat interface. It also supports sharing a collection of saved content with others.

## Features

- **Content management:** Save notes, links, tweets, YouTube links, code snippets, and documents.
- **File uploads:** Store supported files using MongoDB GridFS, with file type and size validation.
- **Search with context:** Generate embeddings from saved content and retrieve relevant chunks using vector search.
- **Ask questions:** Get answers grounded in your saved content, with sources linked to the relevant items.
- **Content organization:** Add tags and filter content by type.
- **Authentication:** Sign up and sign in with password hashing and JWT-based authentication.
- **Content sharing:** Generate a shareable link to make selected brain content accessible to others.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| File storage | MongoDB GridFS |
| Authentication | JWT, bcrypt |
| Validation | Zod |
| Data fetching | TanStack Query, Axios |
| AI and retrieval | Gemini embeddings, MongoDB Atlas Vector Search |

## How it works

1. **Save content:** Users add notes, links, or upload supported documents.
2. **Prepare for retrieval:** The backend extracts available text, splits it into chunks, and generates embeddings.
3. **Retrieve relevant content:** When a user asks a question, queryMind embeds the query and searches for relevant chunks.
4. **Generate an answer:** The retrieved context is passed to the language model to produce an answer based on the user's saved information.
5. **Show sources:** The response includes references to the content used to answer the question.

Content storage and retrieval are separate: uploaded files are stored in GridFS, while text chunks and their embeddings support semantic retrieval.

## Project Structure

```text
queryMind/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── scripts/
└── frontend/
    └── src/
        ├── api/
        ├── components/
        ├── hooks/
        ├── lib/
        ├── pages/
        └── types/
```

The backend follows a controller-service-model structure, keeping request handling, application logic, and database operations separate.

## Running Locally

### Prerequisites

- Node.js and npm
- A MongoDB Atlas database
- A Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/ak8abhinay/queryMind.git
cd queryMind
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the environment variables required by the application:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
```

Use the exact variable names expected by the current source code. Do not commit `.env` or expose API keys.

Build and start the backend using the available npm scripts:

```bash
npm run build
npm start
```

### 3. Configure the frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend API base URL to point to the backend running locally.

## Notes

- Semantic retrieval depends on the MongoDB Atlas Vector Search index being configured and ready.
- Answers depend on the content available to the authenticated user and the quality of retrieval.
- Supported file types and upload limits are enforced by the backend.

## Author

**Abhinay Kakunuri**

GitHub: [ak8abhinay](https://github.com/ak8abhinay)
