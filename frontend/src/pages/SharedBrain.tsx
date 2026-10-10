import { useParams } from "react-router-dom";
import { useSharedBrain } from "../hooks/useSharedBrain";
import { SharedContentList } from "../components/share/SharedContentList";
import { Spinner } from "../components/ui/Spinner";

export function SharedBrain() {
  const { hash } = useParams<{ hash: string }>();
  const { data, isLoading, isError } = useSharedBrain(hash);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={24} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-(--color-text-muted)">
        This share link is invalid or has been removed.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-bg) px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-lg font-semibold mb-6">{data.username}'s shared brain</h1>
      <SharedContentList content={data.content} />
    </div>
  );
}