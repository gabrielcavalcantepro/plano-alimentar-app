import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <div className="mb-2 flex items-center gap-2 text-brand-600">
            <img src="/LOGO-LARANJA.png" alt="" className="h-5 w-auto object-contain" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em]">{eyebrow}</span>
          </div>
        ) : null}
        <h1 className="text-3xl text-espresso-900 sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-2 text-[0.98rem] leading-relaxed text-espresso-500">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
