import { cn } from "../../lib/utils";

export function Logo({ className, size = 26 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold text-[var(--color-ink)]", className)}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="9" className="fill-[var(--color-navy)] dark:fill-[var(--color-brand)]" />
        <path
          d="M10 22V10.8c0-.6.5-1 1.1-.9l10 1.8c.9.2 1 1.4.2 1.7l-7 2.9a1 1 0 0 0-.3 1.6l6.6 6.6"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dark:stroke-[#0e1712]"
        />
      </svg>
      <span className="text-[17px] tracking-tight">FlowPilot</span>
    </span>
  );
}
