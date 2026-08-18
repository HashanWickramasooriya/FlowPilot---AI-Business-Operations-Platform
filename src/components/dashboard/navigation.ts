import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  UsersRound,
  Calendar,
  BarChart3,
  Sparkles,
  FileText,
  Bell,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string | null;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: null,
    items: [{ label: "Overview", to: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Workspace",
    items: [
      { label: "Projects", to: "/dashboard/projects", icon: FolderKanban },
      { label: "Tasks", to: "/dashboard/tasks", icon: CheckSquare },
      { label: "Customers", to: "/dashboard/customers", icon: Users },
      { label: "Team", to: "/dashboard/team", icon: UsersRound },
      { label: "Calendar", to: "/dashboard/calendar", icon: Calendar },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Analytics", to: "/dashboard/analytics", icon: BarChart3 },
      { label: "Assistant", to: "/dashboard/assistant", icon: Sparkles },
      { label: "Reports", to: "/dashboard/reports", icon: FileText },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Notifications", to: "/dashboard/notifications", icon: Bell },
      { label: "Settings", to: "/dashboard/settings", icon: Settings },
    ],
  },
];
