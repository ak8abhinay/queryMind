import { useQuery } from "@tanstack/react-query";
import { brainApi } from "../api/brain";

export function useSharedBrain(hash: string | undefined) {
  return useQuery({
    queryKey: ["sharedBrain", hash],
    queryFn: () => brainApi.getShared(hash!),
    enabled: !!hash, // don't fire until the route param is actually present
  });
}