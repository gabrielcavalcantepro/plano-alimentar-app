import type { HTMLAttributes } from "react";

export function Card({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl bg-surface shadow-[var(--shadow-soft)] ${className}`}
      {...rest}
    />
  );
}
