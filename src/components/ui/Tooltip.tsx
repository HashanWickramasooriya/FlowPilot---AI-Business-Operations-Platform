import { type ReactNode, useState } from "react";
import { cn } from "../../lib/utils";

export function Tooltip({ label, children, side = "top" }: { label: string; children: ReactNode; side?: "top" | "bottom" }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--color-navy)] px-2 py-1 text-xs font-medium text-white shadow-lg animate-fade-in",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
