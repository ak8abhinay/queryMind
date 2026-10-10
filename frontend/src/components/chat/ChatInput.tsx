import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface Props {
  onSubmit: (question: string) => void;
  isPending: boolean;
}

export function ChatInput({ onSubmit, isPending }: Props) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!question.trim() || isPending) return;
    onSubmit(question.trim());
    setQuestion("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something about your saved content…"
          disabled={isPending}
        />
      </div>
      <Button type="submit" disabled={isPending || !question.trim()}>
        <Send size={15} />
      </Button>
    </form>
  );
}