interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display-hero" | "display-section" | "h1" | "h2" | "h3" | "h4";
  font?: "display" | "ui";
  align?: "left" | "center" | "right";
}

export function Heading({
  as: Component = "h2",
  size = "h2",
  font = "ui",
  align = "left",
  className = "",
  children,
  ...props
}: HeadingProps) {
  const sizes = {
    "display-hero": "text-[clamp(3.5rem,6vw,6.5rem)]",
    "display-section": "text-[clamp(2.8rem,4.8vw,5rem)]",
    h1: "text-[clamp(2.8rem,5vw,5.5rem)]",
    h2: "text-[clamp(2.2rem,4vw,4rem)]",
    h3: "text-[1.5rem] sm:text-[2rem]",
    h4: "text-xl sm:text-2xl",
  };

  const fonts = {
    display: "font-display",
    ui: "font-ui",
  };

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <Component
      className={`${sizes[size]} ${fonts[font]} ${aligns[align]} leading-tight tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
