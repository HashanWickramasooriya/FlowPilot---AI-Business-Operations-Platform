import { useState } from "react";
import { PageHeader } from "../../components/dashboard/PageHeader";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Field, Input, Select } from "../../components/ui/Input";
import { Avatar } from "../../components/ui/Avatar";
import { useAppData } from "../../context/AppDataContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";

function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (v: boolean) => void; label: string; description: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-sm font-medium text-[var(--color-ink)]">{label}</p>
        <p className="mt-0.5 text-xs text-[var(--color-ink-muted)]">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors focus-ring",
          checked ? "bg-[var(--color-navy)] dark:bg-[var(--color-brand)]" : "bg-[var(--color-surface-muted)] border border-[var(--color-border-strong)]"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const { settings, updateSettings } = useAppData();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();
  const [form, setForm] = useState(settings);

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    updateSettings(form);
    showToast("Profile updated successfully.");
  }

  return (
    <div className="animate-fade-in max-w-3xl">
      <PageHeader title="Settings" subtitle="Manage your profile, preferences and workspace." />

      <div className="space-y-6">
        <Card>
          <div className="p-5 pb-0">
            <h2 className="text-base font-semibold text-[var(--color-ink)]">Profile</h2>
          </div>
          <CardContent>
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar name={form.name} size="lg" />
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{form.name}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">{form.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" htmlFor="sname">
                  <Input id="sname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Field>
                <Field label="Email" htmlFor="semail">
                  <Input id="semail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Field>
              </div>
              <Field label="Role" htmlFor="srole">
                <Input id="srole" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </Field>
              <div className="flex justify-end">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <div className="p-5 pb-0">
            <h2 className="text-base font-semibold text-[var(--color-ink)]">Preferences</h2>
          </div>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-[var(--color-ink)]">Theme</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-colors focus-ring",
                    theme === "light" ? "border-[var(--color-navy)] dark:border-[var(--color-brand)] bg-[var(--color-surface-muted)]" : "border-[var(--color-border)]"
                  )}
                >
                  <Sun size={16} /> Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-colors focus-ring",
                    theme === "dark" ? "border-[var(--color-navy)] dark:border-[var(--color-brand)] bg-[var(--color-surface-muted)]" : "border-[var(--color-border)]"
                  )}
                >
                  <Moon size={16} /> Dark
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Language" htmlFor="slang">
                <Select id="slang" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} onBlur={() => updateSettings({ language: form.language })}>
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </Select>
              </Field>
              <Field label="Timezone" htmlFor="stz">
                <Select id="stz" value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} onBlur={() => updateSettings({ timezone: form.timezone })}>
                  <option>Eastern Time (US)</option>
                  <option>Central Time (US)</option>
                  <option>Pacific Time (US)</option>
                  <option>Greenwich Mean Time</option>
                </Select>
              </Field>
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="p-5 pb-0">
            <h2 className="text-base font-semibold text-[var(--color-ink)]">Notifications</h2>
          </div>
          <CardContent className="divide-y divide-[var(--color-border)]">
            <Toggle
              label="Email notifications"
              description="Receive email updates for important account activity."
              checked={settings.emailNotifications}
              onChange={(v) => updateSettings({ emailNotifications: v })}
            />
            <Toggle
              label="Task reminders"
              description="Get reminded about upcoming and overdue tasks."
              checked={settings.taskReminders}
              onChange={(v) => updateSettings({ taskReminders: v })}
            />
            <Toggle
              label="Weekly reports"
              description="Receive a summary report at the end of each week."
              checked={settings.weeklyReports}
              onChange={(v) => updateSettings({ weeklyReports: v })}
            />
          </CardContent>
        </Card>

        <Card>
          <div className="p-5 pb-0">
            <h2 className="text-base font-semibold text-[var(--color-ink)]">Workspace</h2>
          </div>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Workspace name" htmlFor="swname">
                <Input
                  id="swname"
                  value={form.workspaceName}
                  onChange={(e) => setForm({ ...form, workspaceName: e.target.value })}
                  onBlur={() => updateSettings({ workspaceName: form.workspaceName })}
                />
              </Field>
              <Field label="Industry" htmlFor="sindustry">
                <Input
                  id="sindustry"
                  value={form.industry}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  onBlur={() => updateSettings({ industry: form.industry })}
                />
              </Field>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
