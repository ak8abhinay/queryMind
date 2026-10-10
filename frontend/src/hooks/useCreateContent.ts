import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contentApi } from "../api/content";
import type { CreateContentInput } from "../types";

export function useCreateContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateContentInput) => contentApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}