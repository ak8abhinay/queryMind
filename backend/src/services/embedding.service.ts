import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const MODEL = "gemini-embedding-001";
const DIMENSIONS = 768;

export type EmbedTaskType = "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY";

export async function embedText(text: string, taskType: EmbedTaskType): Promise<number[]> {
  const response = await ai.models.embedContent({
    model: MODEL,
    contents: text,
    config: { taskType, outputDimensionality: DIMENSIONS },
  });
  const embedding = response.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("Gemini returned no embedding");
  }

  return embedding;
  }

export async function embedTexts(texts: string[], taskType: EmbedTaskType): Promise<number[][]> {
  if (texts.length === 0) return [];
  // No native batch endpoint in this SDK path — parallel requests instead of one round trip
  return Promise.all(texts.map((t) => embedText(t, taskType)));
}