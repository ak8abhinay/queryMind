import { useState, type FormEvent } from "react";
import { CONTENT_TYPES, type ContentType, type CreateContentInput } from "../../types";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { FileDropzone } from "./FileDropzone";

interface Props {
  onSubmit: (input: CreateContentInput) => void;
  isPending: boolean;
  error?: string;
}

const FILE_TYPES: ContentType[] = ["document", "code"];
const LINK_TYPES: ContentType[] = ["link", "tweet", "youtube"];

export function CreateContentForm({ onSubmit, isPending, error }: Props) {
  const [type, setType] = useState<ContentType>("note");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const needsFile = FILE_TYPES.includes(type);
  const needsLink = LINK_TYPES.includes(type);
  const needsText = type === "note";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      type,
      title,
      description: description || undefined,
      link: needsLink ? link : undefined,
      text: needsText ? text : undefined,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      file: needsFile ? file ?? undefined : undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Select
        id="type"
        label="Type"
        value={type}
        onChange={(e) => {
          setType(e.target.value as ContentType);
          setFile(null); // switching away from a file type shouldn't leave a stale file attached
        }}
      >
        {CONTENT_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>

      <Input id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <TextArea
        id="description"
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />

      {needsLink && (
        <Input
          id="link"
          label="Link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://..."
          required
        />
      )}

      {needsText && (
        <TextArea
          id="text"
          label="Content"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          required
        />
      )}

      {needsFile && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text)]">File</label>
          <FileDropzone
            file={file}
            onChange={setFile}
            accept={type === "document" ? ".txt,.md,.pdf" : undefined}
          />
        </div>
      )}

      <Input
        id="tags"
        label="Tags (comma-separated, optional)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="ai, notes, work"
      />

      {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save content"}
      </Button>
    </form>
  );
}