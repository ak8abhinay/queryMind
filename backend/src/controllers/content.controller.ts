import { Request, Response } from "express";
import mongoose from "mongoose";
import { ContentModel } from "../models/content.model";
import { createContentSchema } from "../validators/content.validator";
import { storage } from "../services/storage";
import { extractText, TextExtractionError } from "../services/textExtraction.service";
import { CODE_EXTENSIONS, DOCUMENT_EXTENSIONS, getExtension, mimeTypeFor } from "../utils/filePolicy";

export const createContent = async (req: Request, res: Response) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  const parsed = createContentSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const { type, title, description, link, text, tags } = parsed.data;
  const file = req.file;
  const isFileType = type === "document" || type === "code";

  if (isFileType && !file) {
    res.status(400).json({ message: "A file is required for document and code content" });
    return;
  }
  if (!isFileType && file) {
    res.status(400).json({ message: "Files are only allowed for document and code content" });
    return;
  }

  let fileId: string | undefined;
  try {
    let rawText: string;
    let fileName: string | undefined;
    let mimeType: string | undefined;

    if (file) {
      const ext = getExtension(file.originalname);
      const allowed = type === "document" ? DOCUMENT_EXTENSIONS : CODE_EXTENSIONS;
      if (!allowed.includes(ext)) {
        res.status(400).json({ message: `"${ext}" files are not valid for type "${type}"` });
        return;
      }
      rawText = await extractText(file.originalname, file.buffer); // before upload, so failures store nothing
      mimeType = mimeTypeFor(ext);
      fileName = file.originalname;
      fileId = await storage.upload({ buffer: file.buffer, filename: fileName, mimeType });
    } else if (type === "note") {
      rawText = text as string;
    } else {
      rawText = [title, description].filter(Boolean).join("\n");
    }

    const content = await ContentModel.create({
      type, title, description, link, rawText, fileId, fileName, mimeType, tags,
      // @ts-ignore
      userId: req.userId,
    });

    const { rawText: _omit, ...safe } = content.toObject();
    res.status(201).json({ content: safe });
  } catch (e) {
    if (fileId) await storage.delete(fileId).catch(() => {}); // don't leave orphaned files
    if (e instanceof TextExtractionError) {
      res.status(400).json({ message: e.message });
      return;
    }
    console.error(e);
    res.status(500).json({ message: "Failed to save content" });
  }
};

export const getContent = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({ userId })
    .select("-rawText")
    .sort({ createdAt: -1 });
  res.json({ content });
};

export const getContentFile = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid content id" });
    return;
  }
  // @ts-ignore
  const content = await ContentModel.findOne({ _id: id, userId: req.userId });
  if (!content || !content.fileId) {
    res.status(404).json({ message: "File not found" });
    return;
  }

  const stream = storage.download(content.fileId);
  res.setHeader("Content-Type", content.mimeType || "application/octet-stream");
  res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(content.fileName ?? "file")}"`);
  res.setHeader("X-Content-Type-Options", "nosniff");
  stream.on("error", () => {
    if (!res.headersSent) res.status(500).json({ message: "Could not read file" });
    else res.end();
  });
  stream.pipe(res);
};

export const deleteContent = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid content id" });
    return;
  }
  // @ts-ignore
  const content = await ContentModel.findOneAndDelete({ _id: id, userId: req.userId });
  if (!content) {
    res.status(404).json({ message: "Content not found" });
    return;
  }
  if (content.fileId) await storage.delete(content.fileId).catch(() => {});
  res.json({ message: "Deleted" });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Logged out" });
};
