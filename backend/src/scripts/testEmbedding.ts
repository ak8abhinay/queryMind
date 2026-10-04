import "dotenv/config";
import { embedText, embedTexts } from "../services/embedding.service";

async function main() {
  console.log("=== SINGLE TEXT ===");
  const vec = await embedText("The quick brown fox jumps over the lazy dog.", "RETRIEVAL_DOCUMENT");
  console.log(`Dimensions: ${vec.length}`); // expect 768
  console.log(`First 5 values: ${vec.slice(0, 5)}`);

  console.log("\n=== BATCH + ORDER CHECK ===");
  const inputs = ["apple", "banana", "a large orange citrus fruit"];
  const vecs = await embedTexts(inputs, "RETRIEVAL_DOCUMENT");
  console.log(`Vectors returned: ${vecs.length}`); // expect 3

  const cosineSim = (a: number[], b: number[]) => {
    const dot = a.reduce((s, v, i) => s + v * (b[i] ?? 0), 0);
    const magA = Math.sqrt(a.reduce((s, v) => s + v * v, 0));
    const magB = Math.sqrt(b.reduce((s, v) => s + v * v, 0));
    return dot / (magA * magB);
  };

  console.log(`apple vs banana:        ${cosineSim(vecs[0]!, vecs[1]!).toFixed(4)}`);
  console.log(`banana vs orange-desc:  ${cosineSim(vecs[1]!, vecs[2]!).toFixed(4)}`);
  console.log(`apple vs orange-desc:   ${cosineSim(vecs[0]!, vecs[2]!).toFixed(4)}`);
}

main().catch(console.error);