import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "../../data/marketing";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-ring sm:px-6 sm:py-5"
            >
              <span className="text-sm font-medium text-[var(--color-ink)] sm:text-[15px]">{item.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-[var(--color-ink-faint)] transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="animate-slide-up px-5 pb-5 text-sm leading-relaxed text-[var(--color-ink-muted)] sm:px-6">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
