import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { cn } from "../../lib/utils";

const links = [
  { label: "Product", to: "/features" },
  { label: "Solutions", to: "/solutions" },
  { label: "Pricing", to: "/pricing" },
  { label: "Integrations", to: "/integrations" },
  { label: "Resources", to: "/blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="focus-ring rounded-md">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors focus-ring",
                  isActive
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="md">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="md">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)] focus-ring"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="animate-slide-up absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-[var(--color-surface)] shadow-[var(--shadow-popover)]">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--color-border)] px-4 sm:px-6">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)] focus-ring"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 px-4 py-5 sm:px-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors focus-ring",
                      isActive
                        ? "bg-[var(--color-surface-muted)] text-[var(--color-ink)]"
                        : "text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]"
                    )
                  }
                >
                  {link.label}
                  <ChevronRight size={16} className="text-[var(--color-ink-faint)]" />
                </NavLink>
              ))}
            </div>
            <div className="flex flex-col gap-2 border-t border-[var(--color-border)] px-4 py-5 sm:px-6">
              <Link to="/login">
                <Button variant="outline" size="lg" fullWidth>
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="lg" fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
