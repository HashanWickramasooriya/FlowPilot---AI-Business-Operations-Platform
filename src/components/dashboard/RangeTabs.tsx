import { cn } from "../../lib/utils";

export type Range = "7d" | "30d" | "90d" | "12m";

const ranges: { value: Range; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "12m", label: "12 months" },
];

export function RangeTabs({ value, onChange }: { value: Range; onChange: (r: Range) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[var(--color-border)] p-1">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-ring",
            value === r.value
              ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
