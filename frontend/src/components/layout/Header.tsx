import { useNavigate } from "react-router-dom";
import { Brain, LogOut } from "lucide-react";
import { useMe } from "../../hooks/useMe";
import { useLogout } from "../../hooks/useLogout";
import { Button } from "../ui/Button";

export function Header() {
  const { data: user } = useMe();
  const logout = useLogout();
  const navigate = useNavigate();

  function handleLogout() {
    logout.mutate(undefined, {
      onSuccess: () => navigate("/signin", { replace: true }),
    });
  }

  return (
    <header className="h-20 border-b border-(--color-border) bg-white sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Brain size={26} className="text-(--color-accent)" strokeWidth={2.2} />
          <span className="text-xl font-bold tracking-tight">QueryMind</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-(--color-text-muted)">
            {user ? `Welcome, ${user.username}` : ""}
          </span>
          <Button variant="ghost" onClick={handleLogout} disabled={logout.isPending}>
            <span className="flex items-center gap-1.5">
              <LogOut size={16} />
              {logout.isPending ? "Signing out…" : "Sign out"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}