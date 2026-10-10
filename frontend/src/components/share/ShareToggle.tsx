import { useState } from "react";
import { Share2, Copy, X } from "lucide-react";
import { useShareBrain } from "../../hooks/useShareBrain";
import { Button } from "../ui/Button";
import type { ShareResponse } from "../../types";

export function ShareToggle() {
  const [hash, setHash] = useState<string | null>(null);
  const shareMutation = useShareBrain();

  function handleShare() {
    shareMutation.mutate(true, {
      onSuccess: (res) => {
        if ("hash" in res) setHash((res as ShareResponse).hash);
      },
    });
  }

  function handleUnshare() {
    shareMutation.mutate(false, {
      onSuccess: () => setHash(null),
    });
  }

  const shareUrl = hash ? `${window.location.origin}/share/${hash}` : null;

  if (hash && shareUrl) {
    return (
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={shareUrl}
          className="text-xs px-2 py-1.5 border border-(--color-border) rounded-md bg-gray-50 w-56"
          onFocus={(e) => e.target.select()}
        />
        <Button variant="secondary" onClick={() => navigator.clipboard.writeText(shareUrl)}>
          <Copy size={14} />
        </Button>
        <Button variant="danger" onClick={handleUnshare} disabled={shareMutation.isPending}>
          <X size={14} />
        </Button>
      </div>
    );
  }

  return (
    <Button variant="secondary" onClick={handleShare} disabled={shareMutation.isPending}>
      <span className="flex items-center gap-1.5">
        <Share2 size={14} />
        {shareMutation.isPending ? "…" : "Share my brain"}
      </span>
    </Button>
  );
}