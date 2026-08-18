import { type ReactNode } from "react";
import { Container, Eyebrow } from "./MarketingLayout";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <Container className="pt-14 pb-16 sm:pt-20 sm:pb-20">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.1] tracking-tight text-[var(--color-ink)]">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-[var(--color-ink-muted)]">
          {description}
        </p>
        {children}
      </div>
    </Container>
  );
}
