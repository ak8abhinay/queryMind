import { Readable } from "stream";

export interface UploadInput {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}

export interface StorageService {
  upload(file: UploadInput): Promise<string>; // returns fileId
  download(fileId: string): Readable;
  delete(fileId: string): Promise<void>;
}