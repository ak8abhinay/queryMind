import { apiClient } from "../lib/apiClient";
import type { AskResponse, SyncResult, SharedBrain, ShareResponse } from "../types";

export const brainApi = {
  sync: () => apiClient.post<SyncResult>("/brain/sync"),

  ask: (question: string) => apiClient.post<AskResponse>("/brain/ask", { question }),

  share: (share: boolean) =>
    apiClient.post<ShareResponse | { message: string }>("/brain/share", { share }),

  getShared: (hash: string) => apiClient.get<SharedBrain>(`/brain/${hash}`),
};