import pdf from "pdf-parse";
import { getExtension } from "../utils/filePolicy";

export class TextExtractionError extends Error {}

export async function extractText(filename: string, buffer: Buffer): Promise<string> {
  const ext = getExtension(filename);
  let text: string;

  if (ext === ".pdf") {
    try {
      text = (await pdf(buffer)).text;
    } catch {
      throw new TextExtractionError("Could not read this PDF");
    }
  } else {
    text = buffer.toString("utf-8");
  }

  text = text.replace(/\u0000/g, "").trim();
  if (!text) {
    throw new TextExtractionError(
      ext === ".pdf" ? "PDF contains no extractable text" : "File is empty"
    );
  }
  return text;
}