import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const CHAT_MODEL = "gemini-3.8-flash";

export async function answerFromContext(question: string, context: string): Promise<string> {
  const systemPrompt = `You are answering questions using only the context provided below, which comes from the user's own saved notes and documents.

Rules:
- Answer only using the context. Do not use outside knowledge.
- If the context does not contain enough information to answer, say so plainly. Do not guess or fill gaps with general knowledge.
- Be concise and direct.

Context:
${context}`;

  const response = await ai.models.generateContent({
    model: CHAT_MODEL,
    contents: question,
    config: { systemInstruction: systemPrompt },
  });

  return response.text ?? "No response generated.";
}

async function generateWithRetry(question: string, systemPrompt: string, attempts = 5): Promise<string> {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await ai.models.generateContent({
        model: CHAT_MODEL,
        contents: question,
        config: { systemInstruction: systemPrompt },
      });
      return response.text ?? "No response generated.";
    } catch (e: any) {
      const isRetryable = e.message?.includes("UNAVAILABLE") || e.message?.includes("503");
      if (!isRetryable || i === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1))); // 1s, 2s, 3s, 4s backoff
    }
  }
  throw new Error("Unreachable");
}