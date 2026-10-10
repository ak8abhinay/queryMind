import type { Source } from "../../types";
import { Badge } from "../ui/Badge";

export function SourceChip({ source }: { source: Source }) {
  const content = (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--color-border)] bg-white text-xs">
      <Badge type={source.type} />
      <span className="text-[var(--color-text)] truncate max-w-[160px]">{source.title}</span>
    </div>
  );

  if (source.link) {
    return (
      <a href={source.link} target="_blank" rel="noreferrer" className="hover:opacity-80">
        {content}
      </a>
    );
  }

  return content;
}