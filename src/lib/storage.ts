export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — fail silently, in-memory state still works
  }
}

export const STORAGE_KEYS = {
  theme: "flowpilot.theme",
  tasks: "flowpilot.tasks",
  projects: "flowpilot.projects",
  customers: "flowpilot.customers",
  notifications: "flowpilot.notifications",
  settings: "flowpilot.settings",
  sidebarCollapsed: "flowpilot.sidebarCollapsed",
} as const;
