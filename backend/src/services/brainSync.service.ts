import { ContentModel } from "../models/content.model";
import { ChunkModel } from "../models/chunk.model";
import { chunkText } from "./chunking.service";
import { embedTexts } from "./embedding.service";

interface SyncResult {
  synced: number;
  chunksCreated: number;
  failed: { contentId: string; error: string }[];
}

export async function syncContent(content: any): Promise<number> {
  await ChunkModel.deleteMany({ contentId: content._id });

  const combinedText = [content.title, content.description, content.rawText]
    .filter(Boolean)
    .join("\n\n");

  if (!combinedText.trim()) {
    return 0;
  }

  const pieces = chunkText(combinedText);
  const embeddings = await embedTexts(pieces, "RETRIEVAL_DOCUMENT");

  const docs = pieces.map((text, i) => ({
    contentId: content._id,
    userId: content.userId,
    text,
    chunkIndex: i,
    embedding: embeddings[i],
  }));

  await ChunkModel.insertMany(docs);
  
  return docs.length;
}

export async function syncPendingContent(userId: string): Promise<SyncResult> {

  const allContent = await ContentModel.find({ userId });

  // Fetch the latest chunk timestamp per content in one query, rather than one query per item
  const latestChunkByContent = await ChunkModel.aggregate([
    { $match: { userId: new (require("mongoose").Types.ObjectId)(userId) } },
    { $group: { _id: "$contentId", latest: { $max: "$createdAt" } } },
  ]);
  const chunkTimeMap = new Map(
    latestChunkByContent.map((c) => [c._id.toString(), c.latest])
  );

  const pending = allContent.filter((c) => {
    const latestChunkTime = chunkTimeMap.get(c._id.toString());
    return !latestChunkTime || c.updatedAt > latestChunkTime;
  });

  const result: SyncResult = { synced: 0, chunksCreated: 0, failed: [] };

  for (const content of pending) {
    try {
      const count = await syncContent(content);
      result.synced += 1;
      result.chunksCreated += count;
    } catch (e: any) {
      result.failed.push({ contentId: content._id.toString(), error: e.message ?? "Unknown error" });
    }
  }

  return result;
}