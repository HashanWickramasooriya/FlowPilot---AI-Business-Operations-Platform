import { useEffect, useMemo, useState } from "react";
import { Plus, CheckSquare, Circle, CircleDot, CheckCircle2 } from "lucide-react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Field, Input, Select } from "../../components/ui/Input";
import { Avatar } from "../../components/ui/Avatar";
import { EmptyState } from "../../components/ui/EmptyState";
import { Dropdown, DropdownItem } from "../../components/ui/Dropdown";
import { TableRowSkeleton } from "../../components/ui/Skeleton";
import { useAppData } from "../../context/AppDataContext";
import { taskStatuses, type Task, type TaskStatus } from "../../data/tasks";
import { priorities, projects, type Priority } from "../../data/projects";
import { teamById } from "../../data/team";
import { formatDate, cn } from "../../lib/utils";
import { useToast } from "../../context/ToastContext";

const statusIcon: Record<TaskStatus, typeof Circle> = {
  "To Do": Circle,
  "In Progress": CircleDot,
  Completed: CheckCircle2,
};

export default function Tasks() {
  const { tasks, setTaskStatus, addTask } = useAppData();
  const { showToast } = useToast();
  const [filter, setFilter] = useState<TaskStatus | "All">("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => tasks.filter((t) => filter === "All" || t.status === filter), [tasks, filter]);

  function cycleStatus(task: Task) {
    const order: TaskStatus[] = ["To Do", "In Progress", "Completed"];
    const next = order[(order.indexOf(task.status) + 1) % order.length];
    setTaskStatus(task.id, next);
    if (next === "Completed") showToast(`"${task.title}" marked as complete.`);
  }

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    if (!title) return;
    const newTask: Task = {
      id: `t${Date.now()}`,
      title,
      status: "To Do",
      priority: (String(form.get("priority")) as Priority) || "Normal",
      dueDate: String(form.get("dueDate") || "2026-12-31"),
      assignee: String(form.get("assignee") || "u1"),
      projectId: String(form.get("projectId") || projects[0].id),
    };
    addTask(newTask);
    setModalOpen(false);
    showToast("Task created successfully.");
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Tasks"
        subtitle="Everything your team is working on, in one shared list."
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
            New Task
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {(["All", ...taskStatuses] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-ring",
              filter === s
                ? "bg-[var(--color-navy)] text-white dark:bg-[var(--color-brand)] dark:text-[#0e1712]"
                : "bg-[var(--color-surface-muted)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            {s}
            {s !== "All" && (
              <span className="ml-1.5 opacity-70">{tasks.filter((t) => t.status === s).length}</span>
            )}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <table className="w-full">
            <tbody className="divide-y divide-[var(--color-border)]">
              {Array.from({ length: 6 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={5} />
              ))}
            </tbody>
          </table>
        ) : filtered.length === 0 ? (
          <div className="p-2">
            <EmptyState
              icon={<CheckSquare size={22} />}
              title="No tasks yet."
              description="Nothing matches this filter right now. Try a different status or add a new task."
              action={
                <Button icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>
                  New Task
                </Button>
              }
            />
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="scrollbar-thin hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
                    <th className="px-5 py-3">Task</th>
                    <th className="px-4 py-3">Project</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Due</th>
                    <th className="px-4 py-3">Assignee</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {filtered.map((task) => {
                    const Icon = statusIcon[task.status];
                    const project = projects.find((p) => p.id === task.projectId);
                    return (
                      <tr key={task.id} className="text-sm transition-colors hover:bg-[var(--color-surface-muted)]/50">
                        <td className="px-5 py-3.5">
                          <button onClick={() => cycleStatus(task)} className="flex items-center gap-2.5 text-left focus-ring rounded">
                            <Icon
                              size={17}
                              className={cn(
                                "shrink-0",
                                task.status === "Completed" ? "text-[var(--color-success)]" : "text-[var(--color-ink-faint)]"
                              )}
                            />
                            <span className={cn("text-[var(--color-ink)]", task.status === "Completed" && "line-through text-[var(--color-ink-faint)]")}>
                              {task.title}
                            </span>
                          </button>
                        </td>
                        <td className="px-4 py-3.5 text-[var(--color-ink-muted)]">{project?.name ?? "—"}</td>
                        <td className="px-4 py-3.5">
                          <StatusBadge status={task.priority} />
                        </td>
                        <td className="px-4 py-3.5 text-[var(--color-ink-muted)]">{formatDate(task.dueDate)}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar name={teamById[task.assignee]?.name ?? "Unassigned"} size="xs" />
                            <span className="text-[var(--color-ink-muted)]">{teamById[task.assignee]?.name.split(" ")[0]}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <Dropdown
                            align="right"
                            trigger={
                              <span>
                                <StatusBadge status={task.status} />
                              </span>
                            }
                          >
                            {(close) => (
                              <>
                                {taskStatuses.map((s) => (
                                  <DropdownItem
                                    key={s}
                                    onClick={() => {
                                      setTaskStatus(task.id, s);
                                      close();
                                    }}
                                  >
                                    {s}
                                  </DropdownItem>
                                ))}
                              </>
                            )}
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="divide-y divide-[var(--color-border)] md:hidden">
              {filtered.map((task) => {
                const Icon = statusIcon[task.status];
                const project = projects.find((p) => p.id === task.projectId);
                return (
                  <div key={task.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <button onClick={() => cycleStatus(task)} className="flex items-start gap-2.5 text-left focus-ring rounded">
                        <Icon
                          size={17}
                          className={cn(
                            "mt-0.5 shrink-0",
                            task.status === "Completed" ? "text-[var(--color-success)]" : "text-[var(--color-ink-faint)]"
                          )}
                        />
                        <span className={cn("text-sm font-medium text-[var(--color-ink)]", task.status === "Completed" && "line-through text-[var(--color-ink-faint)]")}>
                          {task.title}
                        </span>
                      </button>
                      <StatusBadge status={task.priority} />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 pl-6 text-xs text-[var(--color-ink-muted)]">
                      <span>{project?.name}</span>
                      <span>Due {formatDate(task.dueDate)}</span>
                      <div className="flex items-center gap-1.5">
                        <Avatar name={teamById[task.assignee]?.name ?? "Unassigned"} size="xs" />
                        {teamById[task.assignee]?.name.split(" ")[0]}
                      </div>
                    </div>
                    <div className="mt-3 pl-6">
                      <Dropdown
                        align="left"
                        trigger={
                          <span>
                            <StatusBadge status={task.status} />
                          </span>
                        }
                      >
                        {(close) => (
                          <>
                            {taskStatuses.map((s) => (
                              <DropdownItem
                                key={s}
                                onClick={() => {
                                  setTaskStatus(task.id, s);
                                  close();
                                }}
                              >
                                {s}
                              </DropdownItem>
                            ))}
                          </>
                        )}
                      </Dropdown>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Task"
        description="Add a task and assign it to a teammate."
        footer={
          <>
            <Button variant="outline" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="new-task-form">
              Create Task
            </Button>
          </>
        }
      >
        <form id="new-task-form" onSubmit={handleCreate} className="space-y-4">
          <Field label="Task title" required htmlFor="ttitle">
            <Input id="ttitle" name="title" required placeholder="e.g. Follow up with new lead" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Priority" htmlFor="tpriority">
              <Select id="tpriority" name="priority" defaultValue="Normal">
                {priorities.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </Select>
            </Field>
            <Field label="Due date" htmlFor="tdue">
              <Input id="tdue" name="dueDate" type="date" defaultValue="2026-12-31" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Assignee" htmlFor="tassignee">
              <Select id="tassignee" name="assignee" defaultValue="u1">
                {Object.values(teamById).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Project" htmlFor="tproject">
              <Select id="tproject" name="projectId" defaultValue={projects[0].id}>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        </form>
      </Modal>
    </div>
  );
}
