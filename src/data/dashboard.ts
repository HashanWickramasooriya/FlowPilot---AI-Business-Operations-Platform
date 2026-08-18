export const metrics = {
  revenue: { value: 84240, delta: "+12.8%", direction: "up" as const },
  activeProjects: { value: 24, delta: "+4 this month", direction: "up" as const },
  openTasks: { value: 18, delta: "-3 this week", direction: "down" as const },
  customers: { value: 1284, delta: "+8.4%", direction: "up" as const },
};

export const priorities = [
  { id: "1", title: "Website launch — Horizon", due: "Due today", priority: "High" as const },
  { id: "2", title: "Client onboarding — Oak & Co.", due: "Due tomorrow", priority: "Normal" as const },
  { id: "3", title: "Quarterly report review", due: "Due Friday", priority: "Normal" as const },
  { id: "4", title: "Send Northstar campaign proposal", due: "Due today", priority: "Urgent" as const },
];

export const recentActivity = [
  { id: "1", actor: "Sarah Mitchell", action: "completed", target: "Homepage redesign", time: "24 min ago" },
  { id: "2", actor: "James Anderson", action: "added a new customer", target: "Oak & Co.", time: "1 hour ago" },
  { id: "3", actor: "Alex Morgan", action: "updated", target: "Horizon Website Redesign", time: "2 hours ago" },
  { id: "4", actor: "Priya Nair", action: "moved", target: "\"Fix sync conflict\" to In Progress", time: "3 hours ago" },
  { id: "5", actor: "Daniel Carter", action: "uploaded designs to", target: "Northstar Marketing Campaign", time: "5 hours ago" },
];

export const upcomingEvents = [
  { id: "1", time: "10:30 AM", title: "Client call — Brightline Studio" },
  { id: "2", time: "1:00 PM", title: "Team design review" },
  { id: "3", time: "3:30 PM", title: "Project status meeting" },
];

export const revenueTrend = [
  { label: "Mar", value: 58200 },
  { label: "Apr", value: 61400 },
  { label: "May", value: 65900 },
  { label: "Jun", value: 71200 },
  { label: "Jul", value: 76800 },
  { label: "Aug", value: 84240 },
];
