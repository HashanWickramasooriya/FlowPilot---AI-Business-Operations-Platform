import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { cn } from "../../lib/utils";
import type { PricingPlan } from "../../data/marketing";

export function PricingCard({ plan, yearly }: { plan: PricingPlan; yearly: boolean }) {
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  return (
    <Card
      className={cn(
        "flex flex-col p-6 sm:p-7",
        plan.recommended && "border-[var(--color-navy)] dark:border-[var(--color-brand)] ring-1 ring-[var(--color-navy)] dark:ring-[var(--color-brand)]"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-ink)]">{plan.name}</h3>
        {plan.recommended && <Badge tone="navy">Recommended</Badge>}
      </div>
      <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{plan.description}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-[var(--color-ink)]">${price}</span>
        <span className="text-sm text-[var(--color-ink-muted)]">/ month</span>
      </div>
      {yearly && <p className="mt-1 text-xs text-[var(--color-ink-faint)]">billed annually</p>}
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--color-ink)]">
            <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
            {f}
          </li>
        ))}
      </ul>
      <Link to="/signup" className="mt-7 block">
        <Button variant={plan.recommended ? "primary" : "outline"} fullWidth size="lg">
          {plan.cta}
        </Button>
      </Link>
    </Card>
  );
}
