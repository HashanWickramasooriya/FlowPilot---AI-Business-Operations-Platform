import { NavLink, Link } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { navGroups } from "./navigation";
import { Logo } from "../ui/Logo";
import { cn } from "../../lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function SidebarContent({ collapsed, onCloseMobile }: { collapsed: boolean; onCloseMobile?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 shrink-0 items-center border-b border-[var(--color-border)]", collapsed ? "justify-center px-2" : "justify-between px-5")}>
        <Link to="/dashboard" className="focus-ring rounded-md" onClick={onCloseMobile}>
          {collapsed ? (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-navy)] text-sm font-bold text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]">
              F
            </span>
          ) : (
            <Logo size={24} />
          )}
        </Link>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] focus-ring lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-5" : ""}>
            {group.label && !collapsed && (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/dashboard"}
                  onClick={onCloseMobile}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-ring",
                      collapsed && "justify-center px-0",
                      isActive
                        ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]"
                        : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)]"
                    )
                  }
                >
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-[width] duration-200 lg:flex lg:flex-col",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <div className="flex-1 overflow-hidden">
          <SidebarContent collapsed={collapsed} />
        </div>
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex h-12 shrink-0 items-center border-t border-[var(--color-border)] text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-ink)] focus-ring",
            collapsed ? "justify-center" : "justify-start gap-2 px-5"
          )}
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onCloseMobile} aria-hidden="true" />
          <div className="animate-slide-up absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-[var(--color-surface)] shadow-[var(--shadow-popover)]">
            <SidebarContent collapsed={false} onCloseMobile={onCloseMobile} />
          </div>
        </div>
      )}
    </>
  );
}
