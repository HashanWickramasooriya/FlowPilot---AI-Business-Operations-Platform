import { Plug } from "lucide-react";
import { MarketingLayout, Container } from "../../components/marketing/MarketingLayout";
import { PageHero } from "../../components/marketing/PageHero";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { integrations } from "../../data/marketing";

export default function Integrations() {
  return (
    <MarketingLayout
      title="Integrations"
      description="See how FlowPilot is designed to fit alongside your calendar, email, CRM, storage and messaging tools."
    >
      <PageHero
        eyebrow="Integrations"
        title="Designed to fit your workflow."
        description="These are the categories of tools FlowPilot is built to work alongside. This demo shows the visual experience — connections aren't live yet."
      />
      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((i) => (
            <Card key={i.name} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">
                  <Plug size={18} />
                </div>
                <Badge tone="neutral">{i.category}</Badge>
              </div>
              <h3 className="mt-4 text-base font-semibold text-[var(--color-ink)]">{i.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{i.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </MarketingLayout>
  );
}
