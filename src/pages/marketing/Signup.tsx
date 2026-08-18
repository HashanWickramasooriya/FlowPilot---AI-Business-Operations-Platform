import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../components/marketing/AuthLayout";
import { Field, Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function Signup() {
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
    <AuthLayout title="Create your workspace" subtitle="Start free — no credit card required.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full name" required htmlFor="name">
            <Input id="name" required placeholder="Jordan Lee" />
          </Field>
          <Field label="Company" required htmlFor="company">
            <Input id="company" required placeholder="Company name" />
          </Field>
        </div>
        <Field label="Work email" required htmlFor="email">
          <Input id="email" type="email" required placeholder="jordan@company.com" />
        </Field>
        <Field label="Password" required htmlFor="password" hint="Use at least 8 characters.">
          <Input id="password" type="password" required minLength={8} placeholder="••••••••" />
        </Field>
        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? "Creating workspace..." : "Start Free"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--color-ink-muted)]">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[var(--color-brand-dark)] focus-ring rounded">
          Log in
        </Link>
      </p>
      <p className="mt-4 text-center text-xs text-[var(--color-ink-faint)]">
        Demo signup — this creates no real account and takes you straight to the dashboard.
      </p>
    </AuthLayout>
  );
}
