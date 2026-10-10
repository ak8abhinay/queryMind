import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { Spinner } from "../ui/Spinner";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={24} />
      </div>
    );
  }

  if (isError || !data) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}