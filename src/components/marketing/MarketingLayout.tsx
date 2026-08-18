import { type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function MarketingLayout({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} — FlowPilot`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
    window.scrollTo(0, 0);
  }, [title, description, location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={className}>{children}</section>;
}

export function Container({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-dark)]">
      {children}
    </span>
  );
}
