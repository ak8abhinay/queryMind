import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] disabled:opacity-50",
  secondary:
    "bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:bg-gray-50 disabled:opacity-50",
  danger:
    "bg-white text-[var(--color-danger)] border border-[var(--color-border)] hover:bg-red-50 disabled:opacity-50",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] hover:bg-gray-100 disabled:opacity-50",
};

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}