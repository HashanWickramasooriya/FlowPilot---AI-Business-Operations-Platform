import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { readStorage, writeStorage, STORAGE_KEYS } from "../lib/storage";
import { initialTasks, type Task, type TaskStatus } from "../data/tasks";
import { projects as seedProjects, type Project } from "../data/projects";
import { initialCustomers, type Customer } from "../data/customers";
import { initialNotifications, type AppNotification } from "../data/notifications";

interface Settings {
  name: string;
  email: string;
  role: string;
  workspaceName: string;
  industry: string;
  timezone: string;
  language: string;
  emailNotifications: boolean;
  taskReminders: boolean;
  weeklyReports: boolean;
}

const defaultSettings: Settings = {
  name: "Alex Morgan",
  email: "alex@flowpilot.demo",
  role: "Founder & CEO",
  workspaceName: "FlowPilot Demo Workspace",
  industry: "Software & Technology",
  timezone: "Eastern Time (US)",
  language: "English (US)",
  emailNotifications: true,
  taskReminders: true,
  weeklyReports: true,
};

interface AppDataContextValue {
  tasks: Task[];
  setTaskStatus: (id: string, status: TaskStatus) => void;
  addTask: (task: Task) => void;
  projects: Project[];
  addProject: (project: Project) => void;
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => readStorage(STORAGE_KEYS.tasks, initialTasks));
  const [projects, setProjects] = useState<Project[]>(() => readStorage(STORAGE_KEYS.projects, seedProjects));
  const [customers, setCustomers] = useState<Customer[]>(() => readStorage(STORAGE_KEYS.customers, initialCustomers));
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    readStorage(STORAGE_KEYS.notifications, initialNotifications)
  );
  const [settings, setSettings] = useState<Settings>(() => readStorage(STORAGE_KEYS.settings, defaultSettings));

  useEffect(() => writeStorage(STORAGE_KEYS.tasks, tasks), [tasks]);
  useEffect(() => writeStorage(STORAGE_KEYS.projects, projects), [projects]);
  useEffect(() => writeStorage(STORAGE_KEYS.customers, customers), [customers]);
  useEffect(() => writeStorage(STORAGE_KEYS.notifications, notifications), [notifications]);
  useEffect(() => writeStorage(STORAGE_KEYS.settings, settings), [settings]);

  const value: AppDataContextValue = {
    tasks,
    setTaskStatus: (id, status) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t))),
    addTask: (task) => setTasks((prev) => [task, ...prev]),
    projects,
    addProject: (project) => setProjects((prev) => [project, ...prev]),
    customers,
    addCustomer: (customer) => setCustomers((prev) => [customer, ...prev]),
    notifications,
    markNotificationRead: (id) =>
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))),
    markAllNotificationsRead: () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
    settings,
    updateSettings: (patch) => setSettings((prev) => ({ ...prev, ...patch })),
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}
