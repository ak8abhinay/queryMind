import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contentApi } from "../api/content";

export function useDeleteContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => contentApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}