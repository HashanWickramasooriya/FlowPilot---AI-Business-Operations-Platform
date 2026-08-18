export type NotificationType = "deadline" | "customer" | "task" | "report" | "insight";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const initialNotifications: AppNotification[] = [
  { id: "n1", type: "deadline", title: "Project deadline approaching", description: "Client Onboarding System is due in 3 days.", time: "10 min ago", read: false },
  { id: "n2", type: "customer", title: "New customer added", description: "Oak & Co. was added to your customer list.", time: "1 hour ago", read: false },
  { id: "n3", type: "task", title: "Task assigned to you", description: "Sarah assigned you \"Prepare monthly report.\"", time: "2 hours ago", read: false },
  { id: "n4", type: "report", title: "Weekly report ready", description: "Your team performance report for this week is ready to view.", time: "5 hours ago", read: true },
  { id: "n5", type: "insight", title: "FlowPilot insight available", description: "Two tasks on Horizon Website Redesign are still incomplete ahead of the deadline.", time: "Yesterday", read: true },
  { id: "n6", type: "customer", title: "Customer flagged as at risk", description: "Greenfield Consulting hasn't had activity in 2 weeks.", time: "Yesterday", read: true },
  { id: "n7", type: "task", title: "Task completed", description: "Daniel marked \"Design email templates\" as complete.", time: "2 days ago", read: true },
  { id: "n8", type: "deadline", title: "Project deadline approaching", description: "Northstar Marketing Campaign is due in 11 days.", time: "2 days ago", read: true },
];
