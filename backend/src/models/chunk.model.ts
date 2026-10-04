import mongoose, { model, Schema } from "mongoose";

const ChunkSchema = new Schema(
  {
    contentId: { type: mongoose.Types.ObjectId, ref: "Content", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    chunkIndex: { type: Number, required: true },
    embedding: { type: [Number], default: undefined }, // absent until embedded
  },
  { timestamps: true }
);

ChunkSchema.index({ contentId: 1 });
ChunkSchema.index({ userId: 1 });

export const ChunkModel = model("Chunk", ChunkSchema);