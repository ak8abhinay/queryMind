import { Request, Response } from "express";
import { LinkModel } from "../models/link.model";
import { ContentModel } from "../models/content.model";
import { UserModel } from "../models/user.model";
import { random } from "../utils/random";
import { syncPendingContent } from "../services/brainSync.service";
import { askBrain } from "../services/brainAsk.service";
import { z } from "zod";

export const shareBrain = async (req: Request, res: Response) => {
  const { share } = req.body;
  // @ts-ignore
  const userId = req.userId;

  if (share) {
    const existingLink = await LinkModel.findOne({ userId });
    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }
    const hash = random(10);
    await LinkModel.create({ userId, hash });
    res.json({ msg: "/share/" + hash });
  } else {
    await LinkModel.deleteOne({ userId });
    res.json({ msg: "Removed link" });
  }
};

export const getSharedBrain = async (req: Request, res: Response) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({ hash });

  if (!link) {
    res.status(411).json({ msg: "Sorry incorrect input" });
    return;
  }

  const content = await ContentModel.find({ userId: link.userId }).select("-rawText");
  const user = await UserModel.findOne({ _id: link.userId });

  if (!user) {
    res.status(411).json({ msg: "user not found, error should ideally not happen" });
    return;
  }

  res.json({ username: user.username, content });
};

export const syncBrain = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.userId;
  const result = await syncPendingContent(userId);
  res.json(result);
};

const askSchema = z.object({
  question: z.string().min(1, "question is required").max(1000),
});

export const ask = async (req: Request, res: Response) => {
  const parsed = askSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid request" });
    return;
  }
  // @ts-ignoreres.status(400).json({ message: parsed.error.issues[0]?.message ?? "Invalid request" });
  const userId = req.userId;
  const result = await askBrain(userId, parsed.data.question);
  res.json(result);
};