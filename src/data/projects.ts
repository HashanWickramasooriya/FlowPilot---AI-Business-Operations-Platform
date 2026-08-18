export type ProjectStatus = "Planning" | "In Progress" | "Review" | "Completed";
export type Priority = "Low" | "Normal" | "High" | "Urgent";

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  priority: Priority;
  deadline: string;
  team: string[];
  budget: number;
  spent: number;
}

export const projects: Project[] = [
  {
    id: "p1",
    name: "Horizon Website Redesign",
    category: "Design & Development",
    description: "Full redesign of the marketing site and component library ahead of the Q3 launch.",
    status: "In Progress",
    progress: 72,
    priority: "High",
    deadline: "2026-08-18",
    team: ["u3", "u6", "u4"],
    budget: 42000,
    spent: 29800,
  },
  {
    id: "p2",
    name: "Northstar Marketing Campaign",
    category: "Marketing",
    description: "Multi-channel campaign for the autumn product line, including paid social and email.",
    status: "In Progress",
    progress: 54,
    priority: "Normal",
    deadline: "2026-08-24",
    team: ["u4", "u5"],
    budget: 18000,
    spent: 9500,
  },
  {
    id: "p3",
    name: "Client Onboarding System",
    category: "Operations",
    description: "Self-serve onboarding flow to replace the manual welcome process for new customers.",
    status: "Review",
    progress: 88,
    priority: "High",
    deadline: "2026-08-16",
    team: ["u2", "u7", "u8"],
    budget: 31000,
    spent: 27200,
  },
  {
    id: "p4",
    name: "Q3 Business Review",
    category: "Management",
    description: "Prepare quarterly performance summary and strategy deck for the leadership offsite.",
    status: "Planning",
    progress: 41,
    priority: "Normal",
    deadline: "2026-08-30",
    team: ["u1", "u2"],
    budget: 5000,
    spent: 1200,
  },
  {
    id: "p5",
    name: "Mobile App — Task Sync",
    category: "Engineering",
    description: "Offline-first sync engine for the FlowPilot mobile companion app.",
    status: "In Progress",
    progress: 33,
    priority: "Urgent",
    deadline: "2026-09-05",
    team: ["u6", "u7"],
    budget: 56000,
    spent: 21000,
  },
  {
    id: "p6",
    name: "Vertex Labs Integration",
    category: "Partnerships",
    description: "Custom API integration and data mapping for the Vertex Labs partnership.",
    status: "Planning",
    progress: 12,
    priority: "Low",
    deadline: "2026-09-20",
    team: ["u7", "u1"],
    budget: 15000,
    spent: 1800,
  },
  {
    id: "p7",
    name: "Summer Brand Refresh",
    category: "Design",
    description: "Updated visual identity, logo refinement and brand guidelines document.",
    status: "Completed",
    progress: 100,
    priority: "Normal",
    deadline: "2026-07-28",
    team: ["u3", "u4"],
    budget: 12000,
    spent: 11400,
  },
  {
    id: "p8",
    name: "Customer Health Dashboard",
    category: "Engineering",
    description: "Internal tool for support and success teams to flag at-risk accounts early.",
    status: "In Progress",
    progress: 61,
    priority: "High",
    deadline: "2026-08-29",
    team: ["u6", "u8"],
    budget: 24000,
    spent: 14300,
  },
];

export const projectStatuses: ProjectStatus[] = ["Planning", "In Progress", "Review", "Completed"];
export const priorities: Priority[] = ["Low", "Normal", "High", "Urgent"];
