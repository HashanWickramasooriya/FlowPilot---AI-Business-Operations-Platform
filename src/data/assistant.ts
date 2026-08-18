export interface AssistantAction {
  label: string;
  to: string;
}

export interface AssistantResponse {
  text: string;
  actions?: AssistantAction[];
}

export interface AssistantPrompt {
  id: string;
  prompt: string;
  response: AssistantResponse;
}

export const suggestedPrompts: AssistantPrompt[] = [
  {
    id: "attention",
    prompt: "What needs my attention today?",
    response: {
      text: "You have 4 priorities today. \"Website launch — Horizon\" and \"Send Northstar campaign proposal\" are both high urgency. Two tasks are overdue across the Client Onboarding System project.",
      actions: [
        { label: "View Tasks", to: "/dashboard/tasks" },
        { label: "View Project", to: "/dashboard/projects" },
      ],
    },
  },
  {
    id: "at-risk",
    prompt: "Which projects are at risk?",
    response: {
      text: "Mobile App — Task Sync is 33% complete with an urgent priority and a deadline in under a month — it's the one to watch. Client Onboarding System is close to done but still has 2 open tasks ahead of its Aug 16 deadline.",
      actions: [{ label: "View Project", to: "/dashboard/projects" }],
    },
  },
  {
    id: "summary",
    prompt: "Summarize this week's activity",
    response: {
      text: "Your team completed 18 tasks this week, closed 3 projects to Review status, and added 2 new customers — Oak & Co. and Vertex Labs. Revenue is up 12.8% compared to last month.",
      actions: [{ label: "View Reports", to: "/dashboard/reports" }],
    },
  },
  {
    id: "overdue",
    prompt: "Show me overdue tasks",
    response: {
      text: "You have 2 overdue tasks: \"Fix sync conflict on offline edits\" (Mobile App — Task Sync, due Aug 12) and \"Migrate legacy customer records\" was completed just in time. Priya Nair and Michael Chen are the assignees to check in with.",
      actions: [{ label: "View Tasks", to: "/dashboard/tasks" }],
    },
  },
  {
    id: "customers",
    prompt: "Which customers need a check-in?",
    response: {
      text: "Greenfield Consulting and Harbor & Stone are both flagged At Risk with no activity in the last two weeks. A quick outreach from Customer Success could help re-engage them before renewal.",
      actions: [{ label: "View Customers", to: "/dashboard/customers" }],
    },
  },
  {
    id: "team",
    prompt: "Who's overloaded right now?",
    response: {
      text: "Priya Nair is at 91% workload with 11 active tasks — the highest on the team right now. Michael Chen follows at 88%. Worth rebalancing a task or two if either project timeline is flexible.",
      actions: [{ label: "View Team", to: "/dashboard/team" }],
    },
  },
];

export function getAssistantResponse(query: string): AssistantResponse {
  const q = query.toLowerCase();
  const match = suggestedPrompts.find((p) => q.includes(p.prompt.toLowerCase()) || p.prompt.toLowerCase().includes(q));
  if (match) return match.response;

  if (q.includes("overdue") || q.includes("late")) return suggestedPrompts[3].response;
  if (q.includes("risk") || q.includes("danger") || q.includes("behind")) return suggestedPrompts[1].response;
  if (q.includes("customer") || q.includes("client")) return suggestedPrompts[4].response;
  if (q.includes("team") || q.includes("workload") || q.includes("overloaded")) return suggestedPrompts[5].response;
  if (q.includes("summar") || q.includes("week") || q.includes("report")) return suggestedPrompts[2].response;
  if (q.includes("attention") || q.includes("today") || q.includes("priorit")) return suggestedPrompts[0].response;

  return {
    text: "Here's a general snapshot: 24 active projects, 18 open tasks, and 1,284 customers with revenue up 12.8% this month. Try asking about overdue tasks, at-risk projects, or your team's workload for something more specific.",
    actions: [{ label: "View Dashboard", to: "/dashboard" }],
  };
}
