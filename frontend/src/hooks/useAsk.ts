import { useMutation } from "@tanstack/react-query";
import { brainApi } from "../api/brain";

export function useAsk() {
  return useMutation({
    mutationFn: (question: string) => brainApi.ask(question),
  });
}