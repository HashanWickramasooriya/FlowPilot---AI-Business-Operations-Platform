import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckSquare,
  FolderKanban,
  Users,
  BarChart3,
  MessageSquareText,
  Sparkles,
  Plug,
  ArrowUpRight,
} from "lucide-react";
import { MarketingLayout, Container, Eyebrow } from "../../components/marketing/MarketingLayout";
import { DashboardPreview } from "../../components/marketing/DashboardPreview";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import { trustBrands, pricingPlans, testimonials, faqs } from "../../data/marketing";
import { PricingCard } from "../../components/marketing/PricingCard";
import { FaqAccordion } from "../../components/marketing/FaqAccordion";
import { useState } from "react";

const features = [
  {
    icon: CheckSquare,
    title: "Smart Task Management",
    description: "Prioritize and organize work efficiently, with clear ownership and due dates.",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    description: "Track projects, deadlines and progress without switching tools.",
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Keep customer information, revenue and activity organized in one place.",
  },
  {
    icon: MessageSquareText,
    title: "Team Collaboration",
    description: "See who's working on what and what's available at a glance.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Understand performance trends without building a spreadsheet.",
  },
  {
    icon: Sparkles,
    title: "Intelligent Assistance",
    description: "Get practical, specific answers when you need a second pair of eyes.",
  },
];

const workflowSteps = [
  { title: "Connect", description: "Bring your projects, customers and calendar into one workspace." },
  { title: "Organize", description: "Turn scattered work into clear priorities everyone can see." },
  { title: "Analyze", description: "Track performance trends without building a spreadsheet." },
  { title: "Act", description: "Move fast on what matters, backed by a clear view of the business." },
];

export default function Home() {
  const [billingYearly, setBillingYearly] = useState(true);

  return (
    <MarketingLayout
      title="Run your business smarter with AI"
      description="FlowPilot is a business operations platform for projects, tasks, customers and performance — with intelligent assistance when you need it."
    >
      {/* Hero */}
      <Container className="pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Business Operations Platform</Eyebrow>
          <h1 className="mt-5 text-[clamp(2rem,5.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-[var(--color-ink)]">
            Everything your team needs to keep work moving.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-[var(--color-ink-muted)]">
            Manage projects, customers, tasks, and business performance from one simple workspace — with intelligent
            assistance when you need it.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" fullWidth icon={undefined} iconRight={<ArrowRight size={18} />}>
                Start Free
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" fullWidth>
                Explore Dashboard
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-xs text-[var(--color-ink-faint)]">No credit card required. Free plan available.</p>
        </div>
      </Container>

      <Container className="pb-20 sm:pb-28">
        <DashboardPreview />
      </Container>

      {/* Trust */}
      <Container className="pb-20 sm:pb-28">
        <p className="text-center text-sm font-medium text-[var(--color-ink-faint)]">
          Built for modern teams — shown here with sample companies
        </p>
        <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5 md:gap-8">
          {trustBrands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-4 text-sm font-semibold text-[var(--color-ink-faint)]"
            >
              {brand}
            </div>
          ))}
        </div>
      </Container>

      {/* Human-centered features */}
      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="p-6 sm:p-8 md:col-span-2">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
                  Less time managing. More time doing.
                </h2>
                <p className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                  FlowPilot brings scattered work — projects, tasks, customer notes, deadlines — into one place, so
                  you spend less time chasing status updates and more time on the work itself.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Active Projects", value: "24" },
                  { label: "Open Tasks", value: "18" },
                  { label: "Team Members", value: "8" },
                  { label: "Customers", value: "1,284" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-[var(--color-surface-muted)] p-4">
                    <p className="text-xl font-semibold text-[var(--color-ink)]">{s.value}</p>
                    <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">Know what needs attention.</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Tasks, deadlines and priorities are surfaced automatically, so nothing important slips through.
            </p>
            <div className="mt-5 space-y-2.5">
              {[
                { text: "Website launch — Horizon", tone: "danger" as const },
                { text: "Client onboarding — Oak & Co.", tone: "warning" as const },
                { text: "Quarterly report review", tone: "neutral" as const },
              ].map((p) => (
                <div key={p.text} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] px-3.5 py-2.5">
                  <span className="text-sm text-[var(--color-ink)]">{p.text}</span>
                  <Badge tone={p.tone}>{p.tone === "danger" ? "Today" : p.tone === "warning" ? "Tomorrow" : "Friday"}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">Keep everyone on the same page.</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              See team activity and availability without needing another status meeting.
            </p>
            <div className="mt-5 space-y-3">
              {[
                { name: "Sarah Mitchell", status: "online" as const, note: "Available" },
                { name: "Daniel Carter", status: "busy" as const, note: "In a meeting" },
                { name: "Emma Wilson", status: "away" as const, note: "Away" },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <Avatar name={m.name} size="sm" status={m.status} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-ink)]">{m.name}</p>
                  </div>
                  <span className="text-xs text-[var(--color-ink-muted)]">{m.note}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>

      {/* Feature showcase grid */}
      <Container className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>What's inside</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-[var(--color-ink)]">
            One workspace, built for how businesses actually run.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="p-6 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">
                <f.icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[var(--color-ink)]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{f.description}</p>
            </Card>
          ))}
        </div>
      </Container>

      {/* Intelligent assistance */}
      <Container className="pb-20 sm:pb-28">
        <Card className="overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <Eyebrow>Intelligent assistance</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
                When you need a little help, FlowPilot is there.
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                Ask a plain question about your business and get a practical answer, grounded in your actual
                projects, tasks and customers — not a generic suggestion.
              </p>
              <Link to="/dashboard/assistant" className="mt-6 inline-block">
                <Button variant="outline" iconRight={<ArrowUpRight size={16} />}>
                  Try the Assistant
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)]/60 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-brand-dark)]">
                <Sparkles size={14} />
                FLOWPILOT INSIGHT
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]">
                "The Horizon project is approaching its deadline. Two tasks are still incomplete."
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary">
                  View Project
                </Button>
                <Button size="sm" variant="ghost">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Container>

      {/* Analytics */}
      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Analytics</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
              A clearer view of how the business is performing.
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">
              Revenue, customer growth, and project and task completion — tracked over time, without building a
              spreadsheet yourself.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-[var(--color-ink-muted)]">
              {["Revenue and customer trends", "Project and task completion rates", "Filter by 7, 30, 90 days or 12 months"].map((i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--color-ink)]">Revenue</p>
              <Badge tone="success">+12.8%</Badge>
            </div>
            <div className="mt-5 flex h-40 items-end gap-2.5 sm:h-48">
              {[58, 62, 66, 71, 77, 84].map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-[var(--color-brand)]"
                    style={{ height: `${(v / 84) * 100}%` }}
                  />
                  <span className="text-[10px] text-[var(--color-ink-faint)]">
                    {["Mar", "Apr", "May", "Jun", "Jul", "Aug"][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>

      {/* Workflow */}
      <Container className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-[var(--color-ink)]">
            From scattered work to a clear plan.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <span className="text-xs font-semibold text-[var(--color-ink-faint)]">STEP {i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Integrations */}
      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Integrations</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
              Designed to fit your workflow.
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">
              FlowPilot is built to connect with the tools your team already uses for calendar, email, CRM, storage
              and messaging.
            </p>
            <Link to="/integrations" className="mt-6 inline-block">
              <Button variant="outline" iconRight={<ArrowRight size={16} />}>
                See all integrations
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Calendar", "Email", "CRM", "Cloud Storage", "Messaging", "Payments"].map((i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5">
                <Plug size={16} className="text-[var(--color-brand)]" />
                <span className="text-sm font-medium text-[var(--color-ink)]">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Pricing */}
      <Container className="pb-20 sm:pb-28" id="pricing">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-[var(--color-ink)]">
            Simple pricing that grows with you.
          </h2>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
            <button
              onClick={() => setBillingYearly(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-ring ${!billingYearly ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]" : "text-[var(--color-ink-muted)]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingYearly(true)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-ring ${billingYearly ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]" : "text-[var(--color-ink-muted)]"}`}
            >
              Yearly <span className="opacity-75">— save ~18%</span>
            </button>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} yearly={billingYearly} />
          ))}
        </div>
      </Container>

      {/* Testimonials */}
      <Container className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>What people say</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-[var(--color-ink)]">
            Trusted by teams who need clarity, not noise.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6">
              <p className="text-[15px] leading-relaxed text-[var(--color-ink)]">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={t.name} size="sm" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{t.name}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* FAQ */}
      <Container className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-[var(--color-ink)]">
            Questions, answered.
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-2xl">
          <FaqAccordion items={faqs} />
        </div>
      </Container>

      {/* Final CTA */}
      <Container className="pb-20 sm:pb-28">
        <Card className="bg-[var(--color-navy)] px-6 py-14 text-center dark:bg-[var(--color-surface-muted)] sm:px-10">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-white dark:text-[var(--color-ink)]">
            Take control of your business operations.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80 dark:text-[var(--color-ink-muted)]">
            Set up your workspace in minutes. No credit card required.
          </p>
          <Link to="/signup" className="mt-7 inline-block">
            <Button size="lg" variant="secondary" iconRight={<ArrowRight size={18} />}>
              Start Free
            </Button>
          </Link>
        </Card>
      </Container>
    </MarketingLayout>
  );
}
