import { MarketingLayout, Container, Eyebrow } from "../../components/marketing/MarketingLayout";
import { PageHero } from "../../components/marketing/PageHero";
import { Card } from "../../components/ui/Card";
import { Avatar } from "../../components/ui/Avatar";
import { team } from "../../data/team";

const values = [
  { title: "Clarity over noise", description: "We'd rather show you two things that matter than twenty that don't." },
  { title: "Built for daily use", description: "If it's not comfortable to use for hours at a time, it's not finished." },
  { title: "Human first", description: "Software should support how people actually work, not the other way around." },
];

export default function About() {
  return (
    <MarketingLayout
      title="About"
      description="FlowPilot is built by a small team focused on calm, practical business software."
    >
      <PageHero
        eyebrow="About FlowPilot"
        title="Software that respects how people actually work."
        description="We started FlowPilot after years of watching businesses run on scattered spreadsheets, sticky notes and half-used tools. We wanted something calmer — and more useful."
      />

      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="p-6">
              <h3 className="text-base font-semibold text-[var(--color-ink)]">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{v.description}</p>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Team</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            The people behind FlowPilot
          </h2>
          <p className="mt-3 text-[var(--color-ink-muted)]">A small fictional team, shown here for demo purposes.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <Card key={member.id} className="flex flex-col items-center p-6 text-center">
              <Avatar name={member.name} size="lg" />
              <p className="mt-3 text-sm font-semibold text-[var(--color-ink)]">{member.name}</p>
              <p className="text-xs text-[var(--color-ink-muted)]">{member.role}</p>
            </Card>
          ))}
        </div>
      </Container>
    </MarketingLayout>
  );
}
