import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Search, FolderKanban, CheckSquare, Users, UsersRound, FileText, CornerDownLeft } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import { team } from "../../data/team";
import { cn } from "../../lib/utils";

interface ResultItem {
  id: string;
  title: string;
  subtitle: string;
  to: string;
  icon: typeof FolderKanban;
  group: string;
}

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { projects, tasks, customers } = useAppData();

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  const results = useMemo<ResultItem[]>(() => {
    const q = query.trim().toLowerCase();
    const items: ResultItem[] = [
      ...projects.map((p) => ({ id: p.id, title: p.name, subtitle: `Project · ${p.status}`, to: "/dashboard/projects", icon: FolderKanban, group: "Projects" })),
      ...tasks.map((t) => ({ id: t.id, title: t.title, subtitle: `Task · ${t.status}`, to: "/dashboard/tasks", icon: CheckSquare, group: "Tasks" })),
      ...customers.map((c) => ({ id: c.id, title: c.company, subtitle: `Customer · ${c.status}`, to: "/dashboard/customers", icon: Users, group: "Customers" })),
      ...team.map((m) => ({ id: m.id, title: m.name, subtitle: `Team · ${m.role}`, to: "/dashboard/team", icon: UsersRound, group: "Team" })),
      { id: "r1", title: "Revenue Report", subtitle: "Report", to: "/dashboard/reports", icon: FileText, group: "Reports" },
      { id: "r2", title: "Team Performance Report", subtitle: "Report", to: "/dashboard/reports", icon: FileText, group: "Reports" },
    ];
    if (!q) return items.slice(0, 8);
    return items.filter((i) => i.title.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q)).slice(0, 20);
  }, [query, projects, tasks, customers]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[activeIndex]) {
        navigate(results[activeIndex].to);
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, activeIndex, navigate, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[95] flex items-start justify-center px-4 pt-20 sm:pt-28">
      <div className="absolute inset-0 bg-black/40 animate-fade-in backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Global search"
        className="animate-slide-up relative w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-popover)]"
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3.5">
          <Search size={18} className="shrink-0 text-[var(--color-ink-faint)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search projects, tasks, customers, team..."
            className="w-full bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-[var(--color-border-strong)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-ink-faint)] sm:block">
            Esc
          </kbd>
        </div>
        <div className="scrollbar-thin max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[var(--color-ink-muted)]">No results for "{query}"</p>
          ) : (
            results.map((item, i) => (
              <button
                key={`${item.group}-${item.id}`}
                onClick={() => {
                  navigate(item.to);
                  onClose();
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  i === activeIndex ? "bg-[var(--color-surface-muted)]" : ""
                )}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">
                  <item.icon size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-[var(--color-ink)]">{item.title}</span>
                  <span className="block truncate text-xs text-[var(--color-ink-muted)]">{item.subtitle}</span>
                </span>
                {i === activeIndex && <CornerDownLeft size={14} className="shrink-0 text-[var(--color-ink-faint)]" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
