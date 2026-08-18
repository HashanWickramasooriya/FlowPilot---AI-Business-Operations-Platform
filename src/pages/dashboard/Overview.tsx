import { Link } from "react-router-dom";
import { DollarSign, FolderKanban, CheckSquare, Users, ArrowUpRight, Sparkles } from "lucide-react";
import { MetricCard } from "../../components/ui/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { metrics, priorities, recentActivity, upcomingEvents, revenueTrend } from "../../data/dashboard";
import { team } from "../../data/team";
import { formatCurrency, formatNumber } from "../../lib/utils";
import { useAppData } from "../../context/AppDataContext";

const priorityTone: Record<string, "danger" | "warning" | "neutral" | "brand"> = {
  Urgent: "danger",
  High: "warning",
  Normal: "neutral",
  Low: "brand",
};

export default function Overview() {
  const { settings } = useAppData();
  const firstName = settings.name.split(" ")[0];
  const maxRevenue = Math.max(...revenueTrend.map((r) => r.value));

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-2xl">
          Good morning, {firstName} 👋
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">Here's what needs your attention today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Revenue"
          value={formatCurrency(metrics.revenue.value)}
          delta={metrics.revenue.delta}
          deltaDirection={metrics.revenue.direction}
          hint="vs last month"
          icon={<DollarSign size={18} />}
        />
        <MetricCard
          label="Active Projects"
          value={String(metrics.activeProjects.value)}
          delta={metrics.activeProjects.delta}
          deltaDirection={metrics.activeProjects.direction}
          icon={<FolderKanban size={18} />}
        />
        <MetricCard
          label="Open Tasks"
          value={String(metrics.openTasks.value)}
          delta={metrics.openTasks.delta}
          deltaDirection={metrics.openTasks.direction}
          icon={<CheckSquare size={18} />}
        />
        <MetricCard
          label="Customers"
          value={formatNumber(metrics.customers.value)}
          delta={metrics.customers.delta}
          deltaDirection={metrics.customers.direction}
          hint="vs last month"
          icon={<Users size={18} />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Priorities</CardTitle>
              <Link to="/dashboard/tasks" className="text-xs font-medium text-[var(--color-brand-dark)] focus-ring rounded">
                View all
              </Link>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2.5">
                {priorities.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--color-ink)]">{p.title}</p>
                      <p className="text-xs text-[var(--color-ink-muted)]">{p.due}</p>
                    </div>
                    <Badge tone={priorityTone[p.priority]}>{p.priority}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <Link to="/dashboard/analytics" className="text-xs font-medium text-[var(--color-brand-dark)] focus-ring rounded">
                Full analytics
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex h-44 items-end gap-3 sm:h-52">
                {revenueTrend.map((r) => (
                  <div key={r.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-[var(--color-brand)] transition-all"
                      style={{ height: `${(r.value / maxRevenue) * 100}%` }}
                      title={formatCurrency(r.value)}
                    />
                    <span className="text-[11px] text-[var(--color-ink-faint)]">{r.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {recentActivity.map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <Avatar name={a.actor} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-[var(--color-ink)]">
                        <span className="font-medium">{a.actor}</span> {a.action}{" "}
                        <span className="font-medium">{a.target}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--color-ink-faint)]">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-[var(--color-brand)]/30 bg-[var(--color-brand-light)]/40">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-brand-dark)]">
                <Sparkles size={14} />
                FLOWPILOT INSIGHT
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
                The Horizon Website Redesign project is approaching its deadline. Two tasks are still incomplete.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/dashboard/projects">
                  <Button size="sm" variant="secondary">
                    View Project
                  </Button>
                </Link>
                <Link to="/dashboard/assistant">
                  <Button size="sm" variant="ghost">
                    Ask Assistant
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <Link to="/dashboard/calendar" className="text-xs font-medium text-[var(--color-brand-dark)] focus-ring rounded">
                Calendar
              </Link>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {upcomingEvents.map((e) => (
                  <div key={e.id} className="flex gap-3">
                    <span className="w-16 shrink-0 text-xs font-medium text-[var(--color-ink-muted)]">{e.time}</span>
                    <span className="text-sm text-[var(--color-ink)]">{e.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Availability</CardTitle>
              <Link to="/dashboard/team" className="text-xs font-medium text-[var(--color-brand-dark)] focus-ring rounded">
                View team
              </Link>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3.5">
                {team.slice(0, 5).map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <Avatar
                      name={m.name}
                      size="sm"
                      status={
                        m.status === "Available" ? "online" : m.status === "In a meeting" ? "busy" : m.status === "Away" ? "away" : "offline"
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--color-ink)]">{m.name}</p>
                    </div>
                    <span className="shrink-0 text-xs text-[var(--color-ink-muted)]">{m.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Link to="/dashboard/reports" className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-ink-muted)]">
          View full weekly report <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  );
}
