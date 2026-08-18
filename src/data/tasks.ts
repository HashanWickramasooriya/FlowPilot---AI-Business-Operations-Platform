import type { Priority } from "./projects";

export type TaskStatus = "To Do" | "In Progress" | "Completed";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  assignee: string;
  projectId: string;
}

export const initialTasks: Task[] = [
  { id: "t1", title: "Review homepage designs", status: "In Progress", priority: "High", dueDate: "2026-08-13", assignee: "u3", projectId: "p1" },
  { id: "t2", title: "Send proposal to Brightline Studio", status: "To Do", priority: "Urgent", dueDate: "2026-08-13", assignee: "u5", projectId: "p2" },
  { id: "t3", title: "Prepare monthly report", status: "To Do", priority: "Normal", dueDate: "2026-08-14", assignee: "u2", projectId: "p4" },
  { id: "t4", title: "Update onboarding checklist", status: "In Progress", priority: "Normal", dueDate: "2026-08-14", assignee: "u8", projectId: "p3" },
  { id: "t5", title: "Schedule client meeting with Vertex Labs", status: "To Do", priority: "Low", dueDate: "2026-08-15", assignee: "u1", projectId: "p6" },
  { id: "t6", title: "Review campaign results", status: "Completed", priority: "Normal", dueDate: "2026-08-10", assignee: "u4", projectId: "p2" },
  { id: "t7", title: "Approve final designs", status: "In Progress", priority: "High", dueDate: "2026-08-16", assignee: "u1", projectId: "p1" },
  { id: "t8", title: "Follow up with new customer — Oak & Co.", status: "To Do", priority: "Normal", dueDate: "2026-08-13", assignee: "u8", projectId: "p3" },
  { id: "t9", title: "Fix sync conflict on offline edits", status: "To Do", priority: "Urgent", dueDate: "2026-08-12", assignee: "u7", projectId: "p5" },
  { id: "t10", title: "Write API documentation", status: "To Do", priority: "Normal", dueDate: "2026-08-19", assignee: "u7", projectId: "p6" },
  { id: "t11", title: "QA pass on onboarding flow", status: "In Progress", priority: "High", dueDate: "2026-08-15", assignee: "u6", projectId: "p3" },
  { id: "t12", title: "Design email templates", status: "Completed", priority: "Normal", dueDate: "2026-08-08", assignee: "u3", projectId: "p2" },
  { id: "t13", title: "Set up analytics tracking", status: "To Do", priority: "Normal", dueDate: "2026-08-20", assignee: "u6", projectId: "p8" },
  { id: "t14", title: "Draft leadership offsite agenda", status: "To Do", priority: "Low", dueDate: "2026-08-22", assignee: "u1", projectId: "p4" },
  { id: "t15", title: "Fix responsive layout on pricing page", status: "In Progress", priority: "High", dueDate: "2026-08-14", assignee: "u6", projectId: "p1" },
  { id: "t16", title: "Interview candidates — Support role", status: "To Do", priority: "Normal", dueDate: "2026-08-18", assignee: "u2", projectId: "p3" },
  { id: "t17", title: "Migrate legacy customer records", status: "Completed", priority: "High", dueDate: "2026-08-05", assignee: "u7", projectId: "p3" },
  { id: "t18", title: "Prepare Vertex Labs data mapping doc", status: "To Do", priority: "Normal", dueDate: "2026-08-25", assignee: "u7", projectId: "p6" },
];

export const taskStatuses: TaskStatus[] = ["To Do", "In Progress", "Completed"];
