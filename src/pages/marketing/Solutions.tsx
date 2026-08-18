import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { MarketingLayout, Container, Eyebrow } from "../../components/marketing/MarketingLayout";
import { PageHero } from "../../components/marketing/PageHero";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const solutions = [
  {
    title: "Agencies & studios",
    description:
      "Run multiple client projects at once without losing track of deadlines, approvals or who's responsible for what.",
    points: ["Project-by-project progress tracking", "Client contact and revenue history", "Team workload at a glance"],
  },
  {
    title: "Growing operations teams",
    description:
      "Replace scattered spreadsheets with a shared source of truth for what's happening across the business.",
    points: ["Centralized task ownership", "Weekly performance reporting", "Calendar for deadlines and reviews"],
  },
  {
    title: "Founders & small leadership teams",
    description:
      "Get a daily view of what needs attention without digging through five different tools every morning.",
    points: ["One dashboard for the whole business", "Assistant for quick, specific answers", "Customer health at a glance"],
  },
];

export default function Solutions() {
  return (
    <MarketingLayout
      title="Solutions"
      description="See how FlowPilot fits agencies, operations teams and small leadership teams running day-to-day business."
    >
      <PageHero
        eyebrow="Solutions"
        title="Built for how different teams actually work."
        description="FlowPilot adapts to how your business runs day to day — not the other way around."
      />
      <Container className="space-y-6 pb-20 sm:pb-28">
        {solutions.map((s, i) => (
          <Card key={s.title} className="overflow-hidden p-6 sm:p-10">
            <div className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <Eyebrow>Solution</Eyebrow>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">{s.description}</p>
                <Link to="/signup" className="mt-6 inline-block">
                  <Button variant="outline" iconRight={<ArrowRight size={16} />}>
                    Get started
                  </Button>
                </Link>
              </div>
              <div className="rounded-2xl bg-[var(--color-surface-muted)] p-6">
                <ul className="space-y-3.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--color-ink)]">
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </MarketingLayout>
  );
}
