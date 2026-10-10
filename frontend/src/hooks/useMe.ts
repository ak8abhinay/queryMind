import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    retry: false,
  });
}