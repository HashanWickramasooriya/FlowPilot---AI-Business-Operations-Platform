import { CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Progress } from "../ui/Progress";

export function DashboardPreview() {
  return (
    <div className="animate-slide-up mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-popover)]">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-danger)]/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-warning)]/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-success)]/60" />
        <span className="ml-3 text-xs font-medium text-[var(--color-ink-faint)]">flowpilot.app/dashboard</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
        <div className="hidden border-r border-[var(--color-border)] bg-[var(--color-surface-muted)]/50 p-4 md:block">
          <div className="space-y-1">
            {["Overview", "Projects", "Tasks", "Customers", "Team", "Analytics"].map((item, i) => (
              <div
                key={item}
                className={`rounded-lg px-3 py-2 text-xs font-medium ${
                  i === 0 ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]" : "text-[var(--color-ink-muted)]"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Good morning, Alex</p>
              <p className="text-xs text-[var(--color-ink-muted)]">Here's what needs your attention today.</p>
            </div>
            <TrendingUp size={16} className="text-[var(--color-success)]" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Revenue", value: "$84,240" },
              { label: "Projects", value: "24" },
              { label: "Tasks", value: "18" },
              { label: "Customers", value: "1,284" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-[var(--color-border)] p-3">
                <p className="text-[11px] font-medium text-[var(--color-ink-muted)]">{m.label}</p>
                <p className="mt-1 text-base font-semibold text-[var(--color-ink)] sm:text-lg">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--color-border)] p-3.5">
              <p className="mb-2.5 text-xs font-semibold text-[var(--color-ink)]">Today's Priorities</p>
              <div className="space-y-2">
                {[
                  { text: "Website launch — Horizon", done: false },
                  { text: "Client onboarding — Oak & Co.", done: false },
                  { text: "Quarterly report review", done: true },
                ].map((p) => (
                  <div key={p.text} className="flex items-center gap-2 text-xs text-[var(--color-ink-muted)]">
                    {p.done ? (
                      <CheckCircle2 size={14} className="shrink-0 text-[var(--color-success)]" />
                    ) : (
                      <Circle size={14} className="shrink-0 text-[var(--color-ink-faint)]" />
                    )}
                    <span className={p.done ? "line-through" : ""}>{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[var(--color-border)] p-3.5">
              <p className="mb-2.5 text-xs font-semibold text-[var(--color-ink)]">Project Progress</p>
              <div className="space-y-2.5">
                {[
                  { name: "Horizon Redesign", value: 72 },
                  { name: "Client Onboarding", value: 88 },
                ].map((p) => (
                  <div key={p.name}>
                    <div className="mb-1 flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
                      <span>{p.name}</span>
                      <span className="font-medium text-[var(--color-ink)]">{p.value}%</span>
                    </div>
                    <Progress value={p.value} />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <Avatar name="Sarah Mitchell" size="xs" />
                <Avatar name="Daniel Carter" size="xs" />
                <Avatar name="Priya Nair" size="xs" />
                <Badge tone="brand" className="ml-1">+2</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
