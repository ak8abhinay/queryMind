import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";

export function useSignup() {
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authApi.signup(username, password),
  });
}