import { User, Bot } from "lucide-react";
import type { Source } from "../../types";
import { SourceList } from "./SourceList";

interface Props {
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
}

export function ChatMessage({ role, text, sources }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mb-0.5">
          <Bot size={13} className="text-(--color-text-muted)" />
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-lg px-3.5 py-2 text-sm ${
          isUser
            ? "bg-(--color-accent) text-white"
            : "bg-white border border-(--color-border) text-(--color-text)"
        }`}
      >
        <p className="whitespace-pre-wrap">{text}</p>
        {!isUser && sources && <SourceList sources={sources} />}
      </div>
      {isUser && (
        <div className="w-6 h-6 rounded-full bg-(--color-accent)/15 flex items-center justify-center shrink-0 mb-0.5">
          <User size={13} className="text-(--color-accent)" />
        </div>
      )}
    </div>
  );
}