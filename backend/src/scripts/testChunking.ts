import { chunkText } from "../services/chunking.service";

const short = "This is a short note about RAG pipelines.";
const long = Array.from({ length: 700 }, (_, i) => `word${i}`).join(" "); // ~1800 words

console.log("=== SHORT TEXT ===");
const shortChunks = chunkText(short);
console.log(`Chunks: ${shortChunks.length}`); // expect 1

console.log("\n=== LONG TEXT ===");
const longChunks = chunkText(long);
console.log(`Chunks: ${longChunks.length}`); // expect more than 1
longChunks.forEach((c, i) => {
  console.log(`\nChunk ${i} (${c.length} chars):`);
  console.log(c.slice(0, 80) + "...");
});