import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Tone = "neutral" | "brand" | "success" | "warning" | "danger" | "navy";

const tones: Record<Tone, string> = {
  neutral: "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)] border-[var(--color-border)]",
  brand: "bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] border-transparent",
  success: "bg-[var(--color-success-light)] text-[var(--color-success)] border-transparent",
  warning: "bg-[var(--color-warning-light)] text-[var(--color-warning)] border-transparent",
  danger: "bg-[var(--color-danger-light)] text-[var(--color-danger)] border-transparent",
  navy: "bg-[var(--color-navy)] text-white border-transparent",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export function Badge({ className, tone = "neutral", dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
