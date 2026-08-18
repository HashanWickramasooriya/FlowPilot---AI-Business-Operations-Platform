import { useMemo, useState } from "react";
import { Plus, Search, FolderKanban, Calendar as CalendarIcon } from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Field, Select, Textarea } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Avatar } from "../../components/ui/Avatar";
import { Progress } from "../../components/ui/Progress";
import { EmptyState } from "../../components/ui/EmptyState";
import { CardSkeleton } from "../../components/ui/Skeleton";
import { useAppData } from "../../context/AppDataContext";
import { projectStatuses, priorities, type Project, type ProjectStatus, type Priority } from "../../data/projects";
import { teamById, team } from "../../data/team";
import { formatDate, cn } from "../../lib/utils";
import { useToast } from "../../context/ToastContext";
import { useEffect } from "react";

export default function Projects() {
  const { projects, addProject } = useAppData();
  const { showToast } = useToast();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">("All");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [projects, statusFilter, query]);

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;
    const newProject: Project = {
      id: `p${Date.now()}`,
      name,
      category: String(form.get("category") ?? "General"),
      description: String(form.get("description") ?? ""),
      status: (String(form.get("status")) as ProjectStatus) || "Planning",
      progress: 0,
      priority: (String(form.get("priority")) as Priority) || "Normal",
      deadline: String(form.get("deadline") || "2026-12-31"),
      team: ["u1"],
      budget: Number(form.get("budget")) || 0,
      spent: 0,
    };
    addProject(newProject);
    setModalOpen(false);
    showToast("Project created successfully.");
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Projects"
        subtitle="Track progress, deadlines and ownership across every active project."
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
            New Project
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)]" />
          <Input placeholder="Search projects..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["All", ...projectStatuses] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-ring",
                statusFilter === s
                  ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]"
                  : "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<FolderKanban size={22} />}
          title="No projects yet."
          description="Try adjusting your filters, or create a new project to get started."
          action={
            <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
              New Project
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.id} className="transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <CardContent>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{p.name}</p>
                    <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">{p.category}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)] line-clamp-2">{p.description}</p>

                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-[var(--color-ink-muted)]">Progress</span>
                    <span className="font-medium text-[var(--color-ink)]">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} tone={p.progress === 100 ? "success" : "brand"} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {p.team.slice(0, 3).map((uid) => (
                      <Avatar key={uid} name={teamById[uid]?.name ?? "Unassigned"} size="xs" className="ring-2 ring-[var(--color-surface)]" />
                    ))}
                  </div>
                  <StatusBadge status={p.priority} />
                </div>

                <div className="mt-4 flex items-center gap-1.5 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-ink-faint)]">
                  <CalendarIcon size={13} />
                  Due {formatDate(p.deadline, { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Project"
        description="Create a new project for your team to track."
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button type="submit" form="new-project-form">
              Create Project
            </Button>
          </>
        }
      >
        <form id="new-project-form" onSubmit={handleCreate} className="space-y-4">
          <Field label="Project name" required htmlFor="pname">
            <Input id="pname" name="name" required placeholder="e.g. Autumn Product Launch" />
          </Field>
          <Field label="Category" htmlFor="pcategory">
            <Input id="pcategory" name="category" placeholder="e.g. Marketing" />
          </Field>
          <Field label="Description" htmlFor="pdesc">
            <Textarea id="pdesc" name="description" placeholder="What is this project about?" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status" htmlFor="pstatus">
              <Select id="pstatus" name="status" defaultValue="Planning">
                {projectStatuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
            <Field label="Priority" htmlFor="ppriority">
              <Select id="ppriority" name="priority" defaultValue="Normal">
                {priorities.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Deadline" htmlFor="pdeadline">
              <Input id="pdeadline" name="deadline" type="date" defaultValue="2026-12-31" />
            </Field>
            <Field label="Budget (USD)" htmlFor="pbudget">
              <Input id="pbudget" name="budget" type="number" min={0} placeholder="10000" />
            </Field>
          </div>
        </form>
        <div className="mt-3 flex items-center gap-1.5">
          {team.slice(0, 4).map((m) => (
            <Avatar key={m.id} name={m.name} size="xs" />
          ))}
          <span className="ml-1 text-xs text-[var(--color-ink-faint)]">Assigned to you by default</span>
        </div>
      </Modal>
    </div>
  );
}
