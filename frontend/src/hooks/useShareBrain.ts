import { useMutation } from "@tanstack/react-query";
import { brainApi } from "../api/brain";

export function useShareBrain() {
  return useMutation({
    mutationFn: (share: boolean) => brainApi.share(share),
  });
}