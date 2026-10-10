import type { ContentType } from "../../types";
import {
  StickyNote,
  Link2,
  MessageCircle,
  PlayCircle,
  FileText,
  Code2,
} from "lucide-react";

const typeStyles: Record<ContentType, string> = {
  note: "bg-amber-50 text-amber-700 border-amber-200",
  link: "bg-blue-50 text-blue-700 border-blue-200",
  tweet: "bg-sky-50 text-sky-700 border-sky-200",
  youtube: "bg-red-50 text-red-700 border-red-200",
  document: "bg-violet-50 text-violet-700 border-violet-200",
  code: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const typeIcons: Record<ContentType, typeof StickyNote> = {
  note: StickyNote,
  link: Link2,
  tweet: MessageCircle,
  youtube: PlayCircle,
  document: FileText,
  code: Code2,
};

export function Badge({ type }: { type: ContentType }) {
  const Icon = typeIcons[type];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${typeStyles[type]}`}
    >
      <Icon size={12} strokeWidth={2.5} />
      {type}
    </span>
  );
}