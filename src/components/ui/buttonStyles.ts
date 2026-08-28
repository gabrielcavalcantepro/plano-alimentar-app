export type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 select-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-[var(--shadow-soft)]",
  secondary: "bg-white text-brand-700 border border-brand-200 hover:bg-brand-50",
  ghost: "bg-transparent text-espresso-700 hover:bg-espresso-100/60",
  dark: "bg-espresso-800 text-white hover:bg-espresso-700",
};

const sizes: Record<ButtonSize, string> = {
  md: "text-[0.95rem] px-5 py-3",
  sm: "text-sm px-4 py-2",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
}
