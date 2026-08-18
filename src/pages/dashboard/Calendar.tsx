import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users as UsersIcon, Phone, ClipboardCheck, AlertCircle } from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Avatar } from "../../components/ui/Avatar";
import { calendarEvents, type CalendarEvent } from "../../data/calendar";
import { teamById } from "../../data/team";
import { cn } from "../../lib/utils";

type ViewMode = "Month" | "Week" | "Day";

const typeIcon: Record<CalendarEvent["type"], typeof Phone> = {
  call: Phone,
  meeting: UsersIcon,
  deadline: AlertCircle,
  review: ClipboardCheck,
};

const typeTone: Record<CalendarEvent["type"], string> = {
  call: "bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]",
  meeting: "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)]",
  deadline: "bg-[var(--color-danger-light)] text-[var(--color-danger)]",
  review: "bg-[var(--color-warning-light)] text-[var(--color-warning)]",
};

function toKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function startOfWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date("2026-08-13"));
  const [view, setView] = useState<ViewMode>("Month");
  const [selected, setSelected] = useState<CalendarEvent | null>(null);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const e of calendarEvents) {
      (map[e.date] ??= []).push(e);
    }
    return map;
  }, []);

  function shift(amount: number) {
    const next = new Date(current);
    if (view === "Month") next.setMonth(next.getMonth() + amount);
    else if (view === "Week") next.setDate(next.getDate() + amount * 7);
    else next.setDate(next.getDate() + amount);
    setCurrent(next);
  }

  const monthLabel = current.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const monthCells = useMemo(() => {
    const first = new Date(current.getFullYear(), current.getMonth(), 1);
    const gridStart = startOfWeek(first);
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      return d;
    });
  }, [current]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(current);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [current]);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Calendar"
        subtitle="Meetings, calls and deadlines for the team."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-lg border border-[var(--color-border)] p-1">
              {(["Month", "Week", "Day"] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-ring",
                    view === v ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]" : "text-[var(--color-ink-muted)]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrent(new Date("2026-08-13"))}>
              Today
            </Button>
          </div>
        }
      />

      <Card className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[var(--color-ink)]">
            {view === "Day" ? current.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : monthLabel}
          </h2>
          <div className="flex items-center gap-1">
            <button onClick={() => shift(-1)} aria-label="Previous" className="rounded-lg p-2 text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] focus-ring">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => shift(1)} aria-label="Next" className="rounded-lg p-2 text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] focus-ring">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {view === "Month" && (
          <div className="scrollbar-thin overflow-x-auto">
            <div className="grid min-w-[640px] grid-cols-7 gap-px overflow-hidden rounded-xl bg-[var(--color-border)] sm:min-w-0">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="bg-[var(--color-surface-muted)] py-2 text-center text-xs font-semibold text-[var(--color-ink-faint)]">
                  {d}
                </div>
              ))}
              {monthCells.map((d) => {
                const key = toKey(d);
                const inMonth = d.getMonth() === current.getMonth();
                const events = eventsByDate[key] ?? [];
                return (
                  <div key={key} className={cn("min-h-[90px] bg-[var(--color-surface)] p-1.5 sm:p-2", !inMonth && "opacity-40")}>
                    <span className={cn("text-xs font-medium", key === "2026-08-13" ? "flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]" : "text-[var(--color-ink-muted)]")}>
                      {d.getDate()}
                    </span>
                    <div className="mt-1 space-y-1">
                      {events.slice(0, 2).map((e) => (
                        <button
                          key={e.id}
                          onClick={() => setSelected(e)}
                          className={cn("block w-full truncate rounded px-1.5 py-0.5 text-left text-[10px] font-medium focus-ring", typeTone[e.type])}
                        >
                          {e.title}
                        </button>
                      ))}
                      {events.length > 2 && <p className="px-1.5 text-[10px] text-[var(--color-ink-faint)]">+{events.length - 2} more</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "Week" && (
          <div className="scrollbar-thin overflow-x-auto">
            <div className="grid min-w-[640px] grid-cols-7 gap-3 sm:min-w-0">
              {weekDays.map((d) => {
                const key = toKey(d);
                const events = eventsByDate[key] ?? [];
                return (
                  <div key={key} className="rounded-xl border border-[var(--color-border)] p-2.5">
                    <p className="text-center text-xs font-semibold text-[var(--color-ink-muted)]">
                      {d.toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <p className="text-center text-sm font-semibold text-[var(--color-ink)]">{d.getDate()}</p>
                    <div className="mt-2 space-y-1.5">
                      {events.map((e) => (
                        <button
                          key={e.id}
                          onClick={() => setSelected(e)}
                          className={cn("block w-full truncate rounded-md px-1.5 py-1 text-left text-[10px] font-medium focus-ring", typeTone[e.type])}
                        >
                          {e.title}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "Day" && (
          <div className="space-y-2.5">
            {(eventsByDate[toKey(current)] ?? []).length === 0 ? (
              <p className="py-10 text-center text-sm text-[var(--color-ink-muted)]">No events scheduled for this day.</p>
            ) : (
              (eventsByDate[toKey(current)] ?? []).map((e) => {
                const Icon = typeIcon[e.type];
                return (
                  <button
                    key={e.id}
                    onClick={() => setSelected(e)}
                    className="flex w-full items-center gap-3.5 rounded-xl border border-[var(--color-border)] p-4 text-left transition-colors hover:bg-[var(--color-surface-muted)] focus-ring"
                  >
                    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", typeTone[e.type])}>
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--color-ink)]">{e.title}</p>
                      <p className="text-xs text-[var(--color-ink-muted)]">{e.time}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </Card>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title ?? ""} size="sm">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-sm text-[var(--color-ink-muted)]">
              <Clock size={15} />
              {new Date(selected.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {selected.time}
            </div>
            {selected.location && (
              <div className="flex items-center gap-2.5 text-sm text-[var(--color-ink-muted)]">
                <MapPin size={15} />
                {selected.location}
              </div>
            )}
            {selected.attendees && selected.attendees.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Attendees</p>
                <div className="space-y-2">
                  {selected.attendees.map((uid) => (
                    <div key={uid} className="flex items-center gap-2.5">
                      <Avatar name={teamById[uid]?.name ?? "Unknown"} size="xs" />
                      <span className="text-sm text-[var(--color-ink)]">{teamById[uid]?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
