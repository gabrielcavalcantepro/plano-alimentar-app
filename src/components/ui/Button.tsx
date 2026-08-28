import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./buttonStyles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {icon && iconPosition === "left" ? <span className="shrink-0 [&>svg]:h-[1.15em] [&>svg]:w-[1.15em]">{icon}</span> : null}
      {children}
      {icon && iconPosition === "right" ? <span className="shrink-0 [&>svg]:h-[1.15em] [&>svg]:w-[1.15em]">{icon}</span> : null}
    </button>
  );
}
