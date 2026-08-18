export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Leadership" | "Design" | "Engineering" | "Marketing" | "Sales" | "Operations";
  email: string;
  status: "Available" | "In a meeting" | "Away" | "Offline";
  workload: number;
  activeTasks: number;
}

export const team: TeamMember[] = [
  { id: "u1", name: "Alex Morgan", role: "Founder & CEO", department: "Leadership", email: "alex@flowpilot.demo", status: "Available", workload: 62, activeTasks: 5 },
  { id: "u2", name: "Sarah Mitchell", role: "Project Manager", department: "Operations", email: "sarah@flowpilot.demo", status: "Available", workload: 78, activeTasks: 9 },
  { id: "u3", name: "Daniel Carter", role: "Product Designer", department: "Design", email: "daniel@flowpilot.demo", status: "In a meeting", workload: 84, activeTasks: 7 },
  { id: "u4", name: "Emma Wilson", role: "Marketing Lead", department: "Marketing", email: "emma@flowpilot.demo", status: "Away", workload: 55, activeTasks: 4 },
  { id: "u5", name: "James Anderson", role: "Sales Manager", department: "Sales", email: "james@flowpilot.demo", status: "Available", workload: 70, activeTasks: 6 },
  { id: "u6", name: "Priya Nair", role: "Frontend Engineer", department: "Engineering", email: "priya@flowpilot.demo", status: "Available", workload: 91, activeTasks: 11 },
  { id: "u7", name: "Michael Chen", role: "Backend Engineer", department: "Engineering", email: "michael@flowpilot.demo", status: "In a meeting", workload: 88, activeTasks: 8 },
  { id: "u8", name: "Olivia Bennett", role: "Customer Success", department: "Operations", email: "olivia@flowpilot.demo", status: "Available", workload: 48, activeTasks: 3 },
];

export const teamById = Object.fromEntries(team.map((t) => [t.id, t]));
