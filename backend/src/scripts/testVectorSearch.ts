import "dotenv/config";
import mongoose from "mongoose";
import { ChunkModel } from "../models/chunk.model";
import { MONGO_URL } from "../config";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to:", mongoose.connection.name);

  const sample = await ChunkModel.findOne({ embedding: { $exists: true } });
  if (!sample) {
    console.log("No chunk with an embedding found.");
    process.exit(1);
  }

  if (!sample.embedding) {
    console.log("Sample chunk has no embedding.");
    process.exit(1);
  }
  console.log("Using chunk:", sample._id.toString(), "| text snippet:", sample.text.slice(0, 50));
  console.log("Embedding length:", sample.embedding?.length);

  // No filter, no threshold — the simplest possible $vectorSearch
  const results = await ChunkModel.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: sample.embedding,
        numCandidates: 50,
        limit: 5,
      },
    },
    {
      $project: {
        text: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]);

  console.log("\n=== RESULTS ===");
  console.log("Count:", results.length);
  console.log(JSON.stringify(results, null, 2));

  process.exit(0);
}

main().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});