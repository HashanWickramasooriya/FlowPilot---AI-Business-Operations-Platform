import { Link } from "react-router-dom";
import {
  CheckSquare,
  FolderKanban,
  Users,
  BarChart3,
  MessageSquareText,
  Sparkles,
  Calendar,
  Bell,
  Search,
  ArrowRight,
} from "lucide-react";
import { MarketingLayout, Container } from "../../components/marketing/MarketingLayout";
import { PageHero } from "../../components/marketing/PageHero";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const featureGroups = [
  {
    icon: FolderKanban,
    title: "Projects",
    description:
      "Track every project's status, progress and deadline. Group by category, filter by priority, and see team ownership at a glance.",
  },
  {
    icon: CheckSquare,
    title: "Tasks",
    description:
      "A shared task list that stays realistic. Assign work, set due dates and priorities, and move tasks through To Do, In Progress and Completed.",
  },
  {
    icon: Users,
    title: "Customers",
    description:
      "Keep contact details, revenue and account status organized, with a clear view of which accounts need attention.",
  },
  {
    icon: MessageSquareText,
    title: "Team",
    description:
      "See who's available, who's busy, and how workload is distributed — without a status-update meeting.",
  },
  {
    icon: Calendar,
    title: "Calendar",
    description:
      "Meetings, deadlines and reviews in one calendar with month, week and day views.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Revenue, growth and completion trends, plus generated reports you can share with the team.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Stay on top of deadlines, new customers and task assignments without digging for updates.",
  },
  {
    icon: Search,
    title: "Global Search",
    description:
      "Find any project, task, customer or teammate instantly with a keyboard-first command palette.",
  },
  {
    icon: Sparkles,
    title: "Assistant",
    description:
      "Ask a direct question about your business and get a specific, grounded answer back.",
  },
];

export default function Features() {
  return (
    <MarketingLayout
      title="Features"
      description="Explore FlowPilot's project, task, customer, team and analytics tools built for real business operations."
    >
      <PageHero
        eyebrow="Product"
        title="Everything you need, nothing you don't."
        description="FlowPilot brings the day-to-day of running a business into one focused workspace — without turning into another tool your team has to manage."
      />
      <Container className="pb-20 sm:pb-28">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureGroups.map((f) => (
            <Card key={f.title} className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand-light)] text-[var(--color-brand-dark)]">
                <f.icon size={20} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[var(--color-ink)]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{f.description}</p>
            </Card>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/dashboard">
            <Button size="lg" iconRight={<ArrowRight size={18} />}>
              See it in the dashboard
            </Button>
          </Link>
        </div>
      </Container>
    </MarketingLayout>
  );
}
