import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, Bell, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Dropdown, DropdownItem } from "../ui/Dropdown";
import { Badge } from "../ui/Badge";
import { useAppData } from "../../context/AppDataContext";
import { formatDate } from "../../lib/utils";

export function Topbar({ onOpenMobileSidebar, onOpenSearch }: { onOpenMobileSidebar: () => void; onOpenSearch: () => void }) {
  const { notifications, settings, markNotificationRead } = useAppData();
  const unread = notifications.filter((n) => !n.read);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 px-4 backdrop-blur-md sm:px-6">
      <button
        onClick={onOpenMobileSidebar}
        aria-label="Open menu"
        className="rounded-lg p-2 text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] focus-ring lg:hidden"
      >
        <Menu size={20} />
      </button>

      <button
        onClick={onOpenSearch}
        className="flex flex-1 items-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3.5 py-2 text-left text-sm text-[var(--color-ink-faint)] transition-colors hover:border-[var(--color-border-strong)] focus-ring sm:max-w-sm"
      >
        <Search size={16} className="shrink-0" />
        <span className="hidden truncate sm:inline">Search projects, tasks, customers...</span>
        <span className="truncate sm:hidden">Search</span>
        <kbd className="ml-auto hidden shrink-0 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[10px] font-medium sm:block">
          Ctrl K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        <Dropdown
          trigger={
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)]">
              <Bell size={18} />
              {unread.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--color-danger)] ring-2 ring-[var(--color-surface)]" />
              )}
            </span>
          }
        >
          {(close) => (
            <div className="w-[calc(100vw-2rem)] max-w-sm sm:w-80">
              <div className="flex items-center justify-between px-2.5 py-1.5">
                <p className="text-sm font-semibold text-[var(--color-ink)]">Notifications</p>
                {unread.length > 0 && <Badge tone="brand">{unread.length} new</Badge>}
              </div>
              <div className="scrollbar-thin max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      close();
                      navigate("/dashboard/notifications");
                    }}
                    className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2.5 text-left hover:bg-[var(--color-surface-muted)] focus-ring"
                  >
                    {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />}
                    <span className={n.read ? "ml-4" : ""}>
                      <span className="block text-sm font-medium text-[var(--color-ink)]">{n.title}</span>
                      <span className="block text-xs text-[var(--color-ink-muted)] line-clamp-2">{n.description}</span>
                      <span className="mt-0.5 block text-[11px] text-[var(--color-ink-faint)]">{n.time}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="border-t border-[var(--color-border)] pt-1.5">
                <DropdownItem
                  onClick={() => {
                    close();
                    navigate("/dashboard/notifications");
                  }}
                >
                  View all notifications
                </DropdownItem>
              </div>
            </div>
          )}
        </Dropdown>

        <Link
          to="/contact"
          aria-label="Help"
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)] focus-ring sm:flex"
        >
          <HelpCircle size={18} />
        </Link>

        <Dropdown
          trigger={<Avatar name={settings.name} size="sm" status="online" />}
        >
          {(close) => (
            <div>
              <div className="px-3 py-2.5">
                <p className="text-sm font-semibold text-[var(--color-ink)]">{settings.name}</p>
                <p className="text-xs text-[var(--color-ink-muted)]">{settings.email}</p>
                <p className="mt-1 text-[11px] text-[var(--color-ink-faint)]">Joined {formatDate("2025-11-04", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
              <div className="my-1 h-px bg-[var(--color-border)]" />
              <DropdownItem onClick={() => { close(); navigate("/dashboard/settings"); }}>
                <User size={16} /> Profile
              </DropdownItem>
              <DropdownItem onClick={() => { close(); navigate("/dashboard/settings"); }}>
                <Settings size={16} /> Settings
              </DropdownItem>
              <div className="my-1 h-px bg-[var(--color-border)]" />
              <DropdownItem danger onClick={() => { close(); navigate("/"); }}>
                <LogOut size={16} /> Log out
              </DropdownItem>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
