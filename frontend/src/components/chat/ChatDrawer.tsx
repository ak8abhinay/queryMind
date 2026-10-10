import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useAsk } from "../../hooks/useAsk";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import type { Source } from "../../types";

interface Message {
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ChatDrawer({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const ask = useAsk();

  function handleAsk(question: string) {
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    ask.mutate(question, {
      onSuccess: (res) => {
        setMessages((prev) => [...prev, { role: "assistant", text: res.answer, sources: res.sources }]);
      },
      onError: () => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Something went wrong answering that. Try again." },
        ]);
      },
    });
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-28 right-6 w-95 h-130 bg-white border border-(--color-border) rounded-lg shadow-xl flex flex-col z-40 overflow-hidden">
      <div className="px-4 py-3 border-b border-(--color-border) flex items-center justify-between">
        <span className="text-sm font-semibold">Ask QueryMind</span>
        <button
          onClick={onClose}
          className="text-(--color-text-muted) hover:text-(--color-text) text-xs"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-(--color-text-muted)">
              <MessageSquare size={16} />
            </div>
            <p className="text-xs text-(--color-text-muted) text-center px-4">
              Ask a question about your saved content.
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <ChatMessage key={i} role={m.role} text={m.text} sources={m.sources} />
        ))}
      </div>

      <div className="p-3 border-t border-(--color-border)">
        <ChatInput onSubmit={handleAsk} isPending={ask.isPending} />
      </div>
    </div>
  );
}