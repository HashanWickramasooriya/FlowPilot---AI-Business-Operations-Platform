import { useState } from "react";
import { MarketingLayout, Container } from "../../components/marketing/MarketingLayout";
import { PageHero } from "../../components/marketing/PageHero";
import { PricingCard } from "../../components/marketing/PricingCard";
import { FaqAccordion } from "../../components/marketing/FaqAccordion";
import { pricingPlans, faqs } from "../../data/marketing";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <MarketingLayout
      title="Pricing"
      description="Simple, transparent pricing for FlowPilot — Starter, Growth and Scale plans for teams of any size."
    >
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing that grows with you."
        description="Start free. Upgrade when your team and your business need more room."
      >
        <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
          <button
            onClick={() => setYearly(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-ring ${!yearly ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]" : "text-[var(--color-ink-muted)]"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-ring ${yearly ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]" : "text-[var(--color-ink-muted)]"}`}
          >
            Yearly <span className="opacity-75">— save ~18%</span>
          </button>
        </div>
      </PageHero>

      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} yearly={yearly} />
          ))}
        </div>
      </Container>

      <Container className="pb-20 sm:pb-28">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
          Pricing questions
        </h2>
        <div className="mx-auto mt-8 max-w-2xl">
          <FaqAccordion items={faqs} />
        </div>
      </Container>
    </MarketingLayout>
  );
}
