import { Badge } from "../ui/Badge";

const statusTones: Record<string, "neutral" | "brand" | "success" | "warning" | "danger"> = {
  Planning: "neutral",
  "In Progress": "brand",
  Review: "warning",
  Completed: "success",
  "To Do": "neutral",
  Active: "success",
  Onboarding: "brand",
  "At Risk": "warning",
  Churned: "danger",
  Urgent: "danger",
  High: "warning",
  Normal: "neutral",
  Low: "brand",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={statusTones[status] ?? "neutral"}>{status}</Badge>;
}
