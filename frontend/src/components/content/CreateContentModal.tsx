import type { CreateContentInput } from "../../types";
import { useCreateContent } from "../../hooks/useCreateContent";
import { CreateContentForm } from "./CreateContentForm";
import { ApiError } from "../../lib/apiClient";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: Props) {
  const createContent = useCreateContent();

  if (!open) return null;

  function handleSubmit(input: CreateContentInput) {
    createContent.mutate(input, {
      onSuccess: () => onClose(),
    });
  }

  const errorMessage =
    createContent.error instanceof ApiError ? createContent.error.message : undefined;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg border border-[var(--color-border)] w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">New content</h2>
          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-sm"
          >
            Close
          </button>
        </div>
        <CreateContentForm
          onSubmit={handleSubmit}
          isPending={createContent.isPending}
          error={errorMessage}
        />
      </div>
    </div>
  );
}