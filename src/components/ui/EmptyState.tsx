import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
  tone = "neutral",
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "neutral" | "plum";
}) {
  const iconWrap =
    tone === "plum" ? "bg-plum-100 text-plum-500" : "bg-espresso-100 text-espresso-400";
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-espresso-200 bg-white/60 px-6 py-10 text-center">
      {icon ? (
        <span className={`flex h-12 w-12 items-center justify-center rounded-full [&>svg]:h-6 [&>svg]:w-6 ${iconWrap}`}>
          {icon}
        </span>
      ) : null}
      <p className="font-display text-lg text-espresso-800">{title}</p>
      {description ? <p className="max-w-sm text-sm text-espresso-500">{description}</p> : null}
      {action}
    </div>
  );
}
