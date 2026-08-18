import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Card, CardContent } from "../../components/ui/Card";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Progress } from "../../components/ui/Progress";
import { team } from "../../data/team";
import { cn } from "../../lib/utils";

const departments = ["All", "Leadership", "Design", "Engineering", "Marketing", "Sales", "Operations"] as const;

const statusTone: Record<string, "success" | "warning" | "neutral" | "danger"> = {
  Available: "success",
  "In a meeting": "warning",
  Away: "neutral",
  Offline: "danger",
};

const statusDot: Record<string, "online" | "busy" | "away" | "offline"> = {
  Available: "online",
  "In a meeting": "busy",
  Away: "away",
  Offline: "offline",
};

export default function Team() {
  const [dept, setDept] = useState<(typeof departments)[number]>("All");

  const filtered = useMemo(() => (dept === "All" ? team : team.filter((m) => m.department === dept)), [dept]);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Team" subtitle="See who's working on what, and how workload is spread across the team." />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {departments.map((d) => (
          <button
            key={d}
            onClick={() => setDept(d)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-ring",
              dept === d
                ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]"
                : "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((m) => (
          <Card key={m.id}>
            <CardContent>
              <div className="flex items-start gap-3.5">
                <Avatar name={m.name} size="lg" status={statusDot[m.status]} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{m.name}</p>
                  <p className="truncate text-xs text-[var(--color-ink-muted)]">{m.role}</p>
                  <Badge tone={statusTone[m.status]} className="mt-2">
                    {m.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--color-ink-faint)]">
                <Mail size={13} />
                <span className="truncate">{m.email}</span>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-[var(--color-ink-muted)]">Workload</span>
                  <span className="font-medium text-[var(--color-ink)]">{m.workload}%</span>
                </div>
                <Progress value={m.workload} tone={m.workload > 85 ? "danger" : m.workload > 65 ? "warning" : "brand"} />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
                <span>{m.department}</span>
                <span>{m.activeTasks} active tasks</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
