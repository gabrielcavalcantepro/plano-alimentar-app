import type { ReactNode } from "react";

type BadgeTone = "brand" | "sage" | "plum" | "rose" | "neutral";

const tones: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-700",
  sage: "bg-sage-100 text-sage-700",
  plum: "bg-plum-100 text-plum-600",
  rose: "bg-rose-100 text-rose-500",
  neutral: "bg-espresso-100 text-espresso-600",
};

export function Badge({
  tone = "neutral",
  icon,
  children,
  className = "",
}: {
  tone?: BadgeTone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${tones[tone]} ${className}`}
    >
      {icon ? <span className="[&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span> : null}
      {children}
    </span>
  );
}
