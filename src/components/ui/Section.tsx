interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "white" | "porcelain" | "mist" | "water";
  as?: "section" | "div";
  className?: string;
}

export function Section({
  padding = "lg",
  background = "white",
  as: Component = "section",
  className = "",
  children,
  ...props
}: SectionProps) {
  const backgrounds = {
    white: "bg-[var(--color-pure-white)]",
    porcelain: "bg-[var(--color-warm-porcelain)]",
    mist: "bg-[var(--color-mist)]",
    water: "bg-[var(--color-water-tint)]",
  };

  const paddings = {
    none: "py-0",
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-20 lg:py-24",
    xl: "py-20 sm:py-28 lg:py-32",
  };

  return (
    <Component
      className={`${backgrounds[background]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
