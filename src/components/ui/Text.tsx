interface TextProps {
  as?: "p" | "span" | "small" | "label";
  size?: "sm" | "base" | "lg" | "lead";
  color?: "ink" | "graphite" | "steel";
  weight?: "normal" | "medium";
  className?: string;
  children?: React.ReactNode;
}

export function Text({
  as: Component = "p",
  size = "base",
  color = "graphite",
  weight = "normal",
  className = "",
  children,
  ...props
}: TextProps) {
  const sizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    lead: "text-[1.15rem] leading-[1.5]",
  };

  const colors = {
    ink: "text-[var(--color-ink)]",
    graphite: "text-[var(--color-graphite)]",
    steel: "text-[var(--color-steel)]",
  };

  const weights = {
    normal: "font-normal",
    medium: "font-medium",
  };

  return (
    <Component
      className={`${sizes[size]} ${colors[color]} ${weights[weight]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
