export const CONTENT_TYPES = ["note", "link", "tweet", "youtube", "document", "code"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export interface Content {
  _id: string;
  type: ContentType;
  title: string;
  description?: string;
  link?: string;
  fileName?: string;
  mimeType?: string;
  tags: string[];
  userId: string | { _id: string; username: string };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
}

export interface Source {
  contentId: string;
  title: string;
  link?: string;
  type: ContentType;
}

export interface AskResponse {
  answer: string;
  sources: Source[];
}

export interface SyncResult {
  synced: number;
  chunksCreated: number;
  failed: { contentId: string; error: string }[];
}

export interface SharedBrain {
  username: string;
  content: Content[];
}

export interface ShareResponse {
  hash: string;
}

export interface CreateContentInput {
  type: ContentType;
  title: string;
  description?: string;
  link?: string;
  text?: string;
  tags?: string[];
  file?: File;
}