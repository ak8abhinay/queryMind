import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(["me"], undefined);
      queryClient.clear(); // signing out should drop all cached content too, not just the user
    },
  });
}