import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-(--color-text-muted) mb-3">
        {icon ?? <Inbox size={18} />}
      </div>
      <p className="text-sm font-medium text-(--color-text)">{title}</p>
      {description && (
        <p className="text-sm text-(--color-text-muted) mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}