import { Trash2, Download } from "lucide-react";
import type { Content } from "../../types";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { fileUrl } from "../../lib/apiClient";

interface Props {
  content: Content;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ContentCard({ content, onDelete, isDeleting }: Props) {
  const hasFile = content.type === "document" || content.type === "code";

  return (
    <div className="bg-white border border-(--color-border) rounded-lg p-5 flex flex-col gap-2.5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <Badge type={content.type} />
        <Button
          variant="ghost"
          className="px-2! py-1!"
          onClick={() => onDelete(content._id)}
          disabled={isDeleting}
        >
          <Trash2 size={15} />
        </Button>
      </div>

      <h3 className="text-lg font-semibold text-(--color-text) leading-snug">
        {content.title}
      </h3>

      {content.description && (
        <p className="text-sm text-(--color-text-muted) line-clamp-2">
          {content.description}
        </p>
      )}

      {content.link && (
        <a
          href={content.link}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-(--color-accent) hover:underline truncate"
        >
          {content.link}
        </a>
      )}

      {hasFile && content.fileName && (
        <a
          href={fileUrl(content._id)}
          className="flex items-center gap-1 text-xs text-(--color-accent) hover:underline w-fit"
        >
          <Download size={13} />
          {content.fileName}
        </a>
      )}

      {content.tags.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-1">
          {content.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-(--color-text-muted)"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <span className="text-xs text-(--color-text-muted) mt-1">
        {new Date(content.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}