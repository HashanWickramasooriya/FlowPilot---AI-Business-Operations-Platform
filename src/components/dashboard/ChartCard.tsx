import { type ReactNode } from "react";
import { Card } from "../ui/Card";

export function ChartCard({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between p-5 pb-0">
        <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">{title}</h3>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </Card>
  );
}
