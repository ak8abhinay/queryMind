import { MessageSquare, X } from "lucide-react";

interface Props {
  open: boolean;
  onClick: () => void;
}

export function ChatButton({ open, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-(--color-accent) text-white shadow-xl flex items-center justify-center hover:bg-(--color-accent-hover) transition-colors z-40"
      aria-label={open ? "Close chat" : "Open chat"}
    >
      {open ? <X size={26} /> : <MessageSquare size={26} />}
    </button>
  );
}