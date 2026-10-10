import type { Content } from "../../types";
import { Badge } from "../ui/Badge";
import { EmptyState } from "../ui/EmptyState";

export function SharedContentList({ content }: { content: Content[] }) {
  if (content.length === 0) {
    return <EmptyState title="This brain has no saved content yet." />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {content.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-[var(--color-border)] rounded-lg p-4 flex flex-col gap-2"
        >
          <Badge type={item.type} />
          <h3 className="text-sm font-semibold">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">{item.description}</p>
          )}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[var(--color-accent)] hover:underline truncate"
            >
              {item.link}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}