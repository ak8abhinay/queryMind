import type { FormEvent, ReactNode } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

interface AuthFormProps {
  title: string;
  username: string;
  password: string;
  onUsernameChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  submitLabel: string;
  isPending: boolean;
  error?: string;
  footer: ReactNode;
}

export function AuthForm({
  title,
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  submitLabel,
  isPending,
  error,
  footer,
}: AuthFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-sm bg-white border border-[var(--color-border)] rounded-lg p-6">
        <h1 className="text-lg font-semibold mb-5">{title}</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            id="username"
            label="Username"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            autoComplete="username"
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Please wait…" : submitLabel}
          </Button>
        </form>
        <div className="mt-4 text-sm text-[var(--color-text-muted)]">{footer}</div>
      </div>
    </div>
  );
}