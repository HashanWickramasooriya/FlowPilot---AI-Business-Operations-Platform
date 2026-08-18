import { type ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: "up" | "down";
  icon?: ReactNode;
  hint?: string;
}

export function MetricCard({ label, value, delta, deltaDirection = "up", icon, hint }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--color-ink-muted)]">{label}</p>
        {icon && <div className="text-[var(--color-ink-faint)]">{icon}</div>}
      </div>
      <p className="mt-2 text-[28px] font-semibold leading-none tracking-tight text-[var(--color-ink)]">{value}</p>
      <div className="mt-3 flex items-center gap-1.5">
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              deltaDirection === "up" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
            )}
          >
            {deltaDirection === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {delta}
          </span>
        )}
        {hint && <span className="text-xs text-[var(--color-ink-faint)]">{hint}</span>}
      </div>
    </div>
  );
}
