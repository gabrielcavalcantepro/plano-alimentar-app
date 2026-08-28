import type { ReactNode } from "react";
import { IconChevronDown } from "../icons";

export function AccordionItem({
  id,
  title,
  subtitle,
  icon,
  open,
  onToggle,
  highlighted,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  open: boolean;
  onToggle: () => void;
  highlighted?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-soft)] transition-shadow ${
        highlighted ? "ring-2 ring-brand-300" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        {icon ? (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 [&>svg]:h-5 [&>svg]:w-5">
            {icon}
          </span>
        ) : null}
        <span className="flex-1 min-w-0">
          <span className="block truncate font-display text-lg text-espresso-900">{title}</span>
          {subtitle ? <span className="block text-sm text-espresso-500">{subtitle}</span> : null}
        </span>
        <IconChevronDown
          className={`h-5 w-5 shrink-0 text-espresso-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
