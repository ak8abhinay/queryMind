import { CONTENT_TYPES, type ContentType } from "../../types";

interface Props {
  value: ContentType | "all";
  onChange: (value: ContentType | "all") => void;
}

export function ContentTypeFilter({ value, onChange }: Props) {
  const options: (ContentType | "all")[] = ["all", ...CONTENT_TYPES];

  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            value === opt
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
              : "bg-white text-[var(--color-text-muted)] border-[var(--color-border)] hover:bg-gray-50"
          }`}
        >
          {opt === "all" ? "All" : opt}
        </button>
      ))}
    </div>
  );
}