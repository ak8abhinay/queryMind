import { getEncoding } from "js-tiktoken";

const CHUNK_SIZE = 500;
const OVERLAP = 50;
const encoder = getEncoding("cl100k_base");

export function chunkText(rawText: string): string[] {
  const tokens = encoder.encode(rawText);

  if (tokens.length <= CHUNK_SIZE) {
    return [rawText];
  }

  const chunks: string[] = [];
  let start = 0;

  while (start < tokens.length) {
    const end = Math.min(start + CHUNK_SIZE, tokens.length);
    const chunkTokens = tokens.slice(start, end);
    chunks.push(encoder.decode(chunkTokens));

    if (end === tokens.length) break;
    start = end - OVERLAP; // step forward by (CHUNK_SIZE - OVERLAP)
  }

  return chunks;
}