import { useState } from "react";
import { Plus } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { useDeleteContent } from "../hooks/useDeleteContent";
import { useSync } from "../hooks/useSync";
import { ContentList } from "../components/content/ContentList";
import { ContentTypeFilter } from "../components/content/ContentTypeFilter";
import { CreateContentModal } from "../components/content/CreateContentModal";
import { ShareToggle } from "../components/share/ShareToggle";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import type { ContentType } from "../types";

export function Dashboard() {
  const { data, isLoading } = useContent();
  const deleteContent = useDeleteContent();
  const sync = useSync();
  const [filter, setFilter] = useState<ContentType | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);

  const allContent = data?.content ?? [];
  const filtered = filter === "all" ? allContent : allContent.filter((c) => c.type === filter);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your content</h1>
          <p className="text-sm text-(--color-text-muted) mt-1">
            {allContent.length} {allContent.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <ShareToggle />
          <Button variant="secondary" onClick={() => sync.mutate()} disabled={sync.isPending}>
            {sync.isPending ? "Syncing…" : "Sync for search"}
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <span className="flex items-center gap-1.5">
              <Plus size={16} />
              Add content
            </span>
          </Button>
        </div>
      </div>

      <ContentTypeFilter value={filter} onChange={setFilter} />

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner size={24} />
        </div>
      ) : (
        <ContentList
          content={filtered}
          onDelete={(id) => deleteContent.mutate(id)}
          deletingId={deleteContent.isPending ? deleteContent.variables : undefined}
        />
      )}

      <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}