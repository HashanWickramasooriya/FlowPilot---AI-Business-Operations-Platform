import { type ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../ui/ThemeToggle";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  useEffect(() => {
    document.title = `${title} — FlowPilot`;
  }, [title]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)]">
      <header className="flex items-center justify-between px-4 py-5 sm:px-8">
        <Link to="/" className="focus-ring rounded-md">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{title}</h1>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{subtitle}</p>
          </div>
          <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
