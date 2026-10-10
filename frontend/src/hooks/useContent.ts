import { useQuery } from "@tanstack/react-query";
import { contentApi } from "../api/content";

export function useContent() {
  return useQuery({
    queryKey: ["content"],
    queryFn: contentApi.list,
  });
}