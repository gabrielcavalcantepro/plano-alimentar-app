import type { ReactNode } from "react";

interface Option<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="tablist"
      className="inline-flex rounded-full bg-espresso-100/70 p-1"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={active}
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
              active ? "bg-white text-brand-700 shadow-[var(--shadow-soft)]" : "text-espresso-500 hover:text-espresso-700"
            }`}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
