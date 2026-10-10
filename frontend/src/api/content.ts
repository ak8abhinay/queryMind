import { apiClient } from "../lib/apiClient";
import type { Content, CreateContentInput } from "../types";

function toFormData(input: CreateContentInput): FormData {
  const fd = new FormData();
  fd.append("type", input.type);
  fd.append("title", input.title);
  if (input.description) fd.append("description", input.description);
  if (input.link) fd.append("link", input.link);
  if (input.text) fd.append("text", input.text);
  if (input.tags?.length) fd.append("tags", input.tags.join(","));
  if (input.file) fd.append("file", input.file);
  return fd;
}

export const contentApi = {
  list: () => apiClient.get<{ content: Content[] }>("/content"),

  create: (input: CreateContentInput) => {
    const body = input.file
      ? toFormData(input)
      : {
          type: input.type,
          title: input.title,
          description: input.description,
          link: input.link,
          text: input.text,
          tags: input.tags,
        };
    return apiClient.post<{ content: Content }>("/content", body);
  },

  remove: (id: string) => apiClient.delete<{ message: string }>(`/content/${id}`),
};