import { Bell, Calendar, Users, CheckSquare, FileText, Sparkles } from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { useAppData } from "../../context/AppDataContext";
import type { NotificationType } from "../../data/notifications";
import { cn } from "../../lib/utils";

const typeIcon: Record<NotificationType, typeof Bell> = {
  deadline: Calendar,
  customer: Users,
  task: CheckSquare,
  report: FileText,
  insight: Sparkles,
};

const typeTone: Record<NotificationType, string> = {
  deadline: "bg-[var(--color-danger-light)] text-[var(--color-danger)]",
  customer: "bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]",
  task: "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)]",
  report: "bg-[var(--color-warning-light)] text-[var(--color-warning)]",
  insight: "bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]",
};

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.` : "You're all caught up."}
        actions={
          unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllNotificationsRead}>
              Mark all as read
            </Button>
          )
        }
      />

      {notifications.length === 0 ? (
        <EmptyState icon={<Bell size={22} />} title="No notifications." description="You'll see project, task and customer updates here." />
      ) : (
        <Card className="overflow-hidden">
          <div className="divide-y divide-[var(--color-border)]">
            {notifications.map((n) => {
              const Icon = typeIcon[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={cn(
                    "flex w-full items-start gap-3.5 px-4 py-4 text-left transition-colors hover:bg-[var(--color-surface-muted)]/60 focus-ring sm:px-6",
                    !n.read && "bg-[var(--color-brand-light)]/20"
                  )}
                >
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", typeTone[n.type])}>
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-[var(--color-ink)]">{n.title}</span>
                      {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />}
                    </span>
                    <span className="mt-0.5 block text-sm text-[var(--color-ink-muted)]">{n.description}</span>
                    <span className="mt-1 block text-xs text-[var(--color-ink-faint)]">{n.time}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
