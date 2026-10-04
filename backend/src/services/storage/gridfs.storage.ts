import mongoose from "mongoose";
import { Readable } from "stream";
import { StorageService, UploadInput } from "./storage.service";

export class GridFSStorage implements StorageService {
  private getBucket() {
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB is not connected");
    return new mongoose.mongo.GridFSBucket(db, { bucketName: "uploads" });
  }

  upload({ buffer, filename, mimeType }: UploadInput): Promise<string> {
    const bucket = this.getBucket();
    return new Promise((resolve, reject) => {
      const stream = bucket.openUploadStream(filename, { metadata: { mimeType } });
      stream.on("error", reject);
      stream.on("finish", () => resolve(stream.id.toString()));
      stream.end(buffer);
    });
  }

  download(fileId: string): Readable {
    return this.getBucket().openDownloadStream(new mongoose.Types.ObjectId(fileId));
  }

  async delete(fileId: string): Promise<void> {
    await this.getBucket().delete(new mongoose.Types.ObjectId(fileId));
  }
}