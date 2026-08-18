export type ReportType = "Revenue" | "Projects" | "Customers" | "Team Performance";

export interface ReportDefinition {
  type: ReportType;
  description: string;
  summary: { label: string; value: string; delta?: string }[];
  recentChanges: { label: string; time: string }[];
}

export const reportDefinitions: ReportDefinition[] = [
  {
    type: "Revenue",
    description: "Revenue performance across products, services and support plans.",
    summary: [
      { label: "Total Revenue", value: "$84,240", delta: "+12.8%" },
      { label: "Recurring Revenue", value: "$61,900", delta: "+9.2%" },
      { label: "New Revenue", value: "$22,340", delta: "+21.4%" },
      { label: "Avg. Deal Size", value: "$3,240", delta: "+4.1%" },
    ],
    recentChanges: [
      { label: "Summit Digital renewed at a higher tier", time: "2 days ago" },
      { label: "Vertex Labs signed onboarding agreement", time: "3 days ago" },
      { label: "Northstar Media increased monthly spend", time: "5 days ago" },
    ],
  },
  {
    type: "Projects",
    description: "Delivery status and progress across every active and completed project.",
    summary: [
      { label: "Active Projects", value: "24", delta: "+4 this month" },
      { label: "Completed This Quarter", value: "9" },
      { label: "Avg. Completion Rate", value: "58%" },
      { label: "Projects At Risk", value: "2" },
    ],
    recentChanges: [
      { label: "Client Onboarding System moved to Review", time: "1 day ago" },
      { label: "Summer Brand Refresh marked Completed", time: "2 weeks ago" },
      { label: "Mobile App — Task Sync flagged Urgent priority", time: "4 days ago" },
    ],
  },
  {
    type: "Customers",
    description: "Account health, revenue and engagement across the customer base.",
    summary: [
      { label: "Total Customers", value: "1,284", delta: "+8.4%" },
      { label: "Active Accounts", value: "1,102" },
      { label: "At Risk Accounts", value: "2" },
      { label: "Avg. Revenue per Account", value: "$2,940" },
    ],
    recentChanges: [
      { label: "Oak & Co. added as a new customer", time: "Today" },
      { label: "Greenfield Consulting flagged At Risk", time: "2 weeks ago" },
      { label: "Vertex Labs began onboarding", time: "3 days ago" },
    ],
  },
  {
    type: "Team Performance",
    description: "Task completion, on-time delivery and workload across the team.",
    summary: [
      { label: "Tasks Completed", value: "154", delta: "+18 this week" },
      { label: "On-Time Delivery", value: "89%" },
      { label: "Avg. Workload", value: "72%" },
      { label: "Team Members", value: "8" },
    ],
    recentChanges: [
      { label: "Priya Nair completed 11 tasks this week", time: "Today" },
      { label: "Daniel Carter maintained 95% on-time rate", time: "This week" },
      { label: "Workload rebalanced on Mobile App project", time: "4 days ago" },
    ],
  },
];
