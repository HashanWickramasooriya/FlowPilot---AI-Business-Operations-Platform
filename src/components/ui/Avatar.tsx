import { cn, initials } from "../../lib/utils";

const palette = [
  "bg-[#2f6f5e] text-white",
  "bg-[#b7791f] text-white",
  "bg-[#5a67d8] text-white",
  "bg-[#c1443b] text-white",
  "bg-[#17233b] text-white",
  "bg-[#0891a8] text-white",
];

function hashName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

interface AvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  status?: "online" | "away" | "busy" | "offline";
}

const sizes = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

const statusColors = {
  online: "bg-[var(--color-success)]",
  away: "bg-[var(--color-warning)]",
  busy: "bg-[var(--color-danger)]",
  offline: "bg-[var(--color-ink-faint)]",
};

export function Avatar({ name, size = "md", className, status }: AvatarProps) {
  const color = palette[hashName(name) % palette.length];
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold",
          color,
          sizes[size]
        )}
      >
        {initials(name)}
      </span>
      {status && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-[var(--color-surface)]",
            statusColors[status]
          )}
        />
      )}
    </span>
  );
}
