import type { Content } from "../../types";
import { ContentCard } from "./ContentCard";
import { EmptyState } from "../ui/EmptyState";

interface Props {
  content: Content[];
  onDelete: (id: string) => void;
  deletingId?: string;
}

export function ContentList({ content, onDelete, deletingId }: Props) {
  if (content.length === 0) {
    return (
      <EmptyState
        title="No content yet"
        description="Save a note, link, or file to start building your knowledge base."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {content.map((item) => (
        <ContentCard
          key={item._id}
          content={item}
          onDelete={onDelete}
          isDeleting={deletingId === item._id}
        />
      ))}
    </div>
  );
}