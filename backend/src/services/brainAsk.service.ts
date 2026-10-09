import mongoose from "mongoose";
import { ChunkModel } from "../models/chunk.model";
import { ContentModel } from "../models/content.model";
import { embedText } from "./embedding.service";
import { answerFromContext } from "./chat.service";

const SIMILARITY_THRESHOLD = 0.8;
const CANDIDATE_POOL = 50;
const TOP_K = 5;

interface Source {
  contentId: string;
  title: string;
  link?: string;
  type: string;
}

interface AskResult {
  answer: string;
  sources: Source[];
}

const NOTHING_FOUND: AskResult = {
  answer: "Nothing relevant found in your saved content for this question.",
  sources: [],
};

export async function askBrain(userId: string, question: string): Promise<AskResult> {
  const queryVector = await embedText(question, "RETRIEVAL_QUERY");

  const matches = await ChunkModel.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector,
        numCandidates: CANDIDATE_POOL,
        limit: TOP_K,
        filter: { userId: new mongoose.Types.ObjectId(userId) },
      },
    },
    {
      $project: {
        text: 1,
        contentId: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);

  if (matches.length === 0 || matches[0].score < SIMILARITY_THRESHOLD) {
    return NOTHING_FOUND;
  }

  const context = matches
    .map((m, i) => `[${i + 1}] ${m.text}`)
    .join("\n\n");

  const contentIds = [...new Set(matches.map((m) => m.contentId.toString()))];
  const contents = await ContentModel.find({ _id: { $in: contentIds } }).select(
    "title link type"
  );

  const sources: Source[] = contents.map((c) => ({
    contentId: c._id.toString(),
    title: c.title,
    ...(c.link ? { link: c.link } : {}),
    type: c.type,
  }));

  const answer = await answerFromContext(question, context);

  return { answer, sources };
}