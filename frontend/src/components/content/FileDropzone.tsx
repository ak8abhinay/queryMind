import { useRef, useState, type DragEvent } from "react";

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
}

export function FileDropzone({ file, onChange, accept }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onChange(dropped);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`border border-dashed rounded-md p-4 text-sm text-center cursor-pointer transition-colors ${
        isDragging
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
          : "border-[var(--color-border)] hover:bg-gray-50"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {file ? (
        <span className="text-[var(--color-text)]">{file.name}</span>
      ) : (
        <span className="text-[var(--color-text-muted)]">
          Drag a file here, or click to browse
        </span>
      )}
    </div>
  );
}