import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Logo } from "../components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-canvas)] px-4 text-center">
      <Logo className="mb-8" />
      <p className="text-sm font-semibold text-[var(--color-brand-dark)]">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-[var(--color-ink-muted)]">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="mt-7">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
