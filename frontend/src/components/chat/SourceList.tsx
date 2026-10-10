import type { Source } from "../../types";
import { SourceChip } from "./SourceChip";

export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {sources.map((s) => (
        <SourceChip key={s.contentId} source={s} />
      ))}
    </div>
  );
}