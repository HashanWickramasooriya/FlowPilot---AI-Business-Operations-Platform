import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/marketing/AuthLayout";
import { Field, Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 600);
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to your FlowPilot workspace.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email" required htmlFor="email">
          <Input id="email" type="email" required placeholder="alex@flowpilot.demo" defaultValue="alex@flowpilot.demo" />
        </Field>
        <Field label="Password" required htmlFor="password">
          <Input id="password" type="password" required placeholder="••••••••" defaultValue="demopassword" />
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[var(--color-ink-muted)]">
            <input type="checkbox" className="h-4 w-4 rounded border-[var(--color-border-strong)] accent-[var(--color-brand)]" defaultChecked />
            Remember me
          </label>
          <span className="text-[var(--color-brand-dark)]">Forgot password?</span>
        </div>
        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--color-ink-muted)]">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-[var(--color-brand-dark)] focus-ring rounded">
          Sign up
        </Link>
      </p>
      <p className="mt-4 text-center text-xs text-[var(--color-ink-faint)]">
        Demo login — any credentials will take you to the dashboard.
      </p>
    </AuthLayout>
  );
}
