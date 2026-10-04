import { z } from "zod";

export const CONTENT_TYPES = ["note", "link", "tweet", "youtube", "document", "code"] as const;

const tagsField = z.preprocess(
  (v) => (typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : v),
  z.array(z.string().max(30)).max(10).default([])
);

export const createContentSchema = z
  .object({
    type: z.enum(CONTENT_TYPES),
    title: z.string().min(1, "Title is required").max(200),
    description: z.string().max(2000).optional(),
    link: z.string().url("link must be a valid URL").optional(),
    text: z.string().optional(),
    tags: tagsField,
  })
  .superRefine((data, ctx) => {
    if (["link", "tweet", "youtube"].includes(data.type) && !data.link) {
      ctx.addIssue({ code: "custom", path: ["link"], message: "link is required for link, tweet and youtube content" });
    }
    if (data.type === "note" && !data.text) {
      ctx.addIssue({ code: "custom", path: ["text"], message: "text is required for notes" });
    }
  });