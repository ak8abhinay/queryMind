import { useMutation, useQueryClient } from "@tanstack/react-query";
import { brainApi } from "../api/brain";

export function useSync() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: brainApi.sync,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}