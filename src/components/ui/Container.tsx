interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export function Container({
  maxWidth = "lg",
  padding = "md",
  className = "",
  children,
  ...props
}: ContainerProps) {
  const widths = {
    sm: "max-w-[640px]",
    md: "max-w-[960px]",
    lg: "max-w-[1480px]",
    xl: "max-w-[1728px]",
    full: "max-w-none",
  };

  const paddings = {
    none: "px-0",
    sm: "px-4 sm:px-6",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-[64px] xl:px-[88px]",
  };

  return (
    <div className={`${widths[maxWidth]} ${paddings[padding]} mx-auto ${className}`} {...props}>
      {children}
    </div>
  );
}
