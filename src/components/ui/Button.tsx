import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  as?: React.ElementType;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  as: Component = "button",
  href,
  ...props
}: ButtonProps & { children?: React.ReactNode }) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]";

  const variants = {
    primary: "bg-[var(--color-ink)] text-[var(--color-pure-white)] hover:opacity-90",
    secondary:
      "border border-[var(--color-steel)] text-[var(--color-ink)] hover:border-[var(--color-graphite)]",
    ghost: "text-[var(--color-deep-royal-blue)] hover:underline",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const propsToPass: Record<string, unknown> = href ? { href, ...props } : props;

  const Comp = Component as React.ElementType;

  return (
    <Comp
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...propsToPass}
    >
      {children}
    </Comp>
  );
}
