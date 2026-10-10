import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";

export function useSignin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.signin(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}