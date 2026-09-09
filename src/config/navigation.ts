export const navigationConfig = {
  main: [
    { label: "Productos", href: "/productos" },
    { label: "Agua", href: "/productos?cat=agua" },
    { label: "Cocina", href: "/productos?cat=cocina" },
    { label: "Nuestra historia", href: "/nosotros" },
    { label: "Demostraciones", href: "/demostraciones" },
  ],
  cta: {
    label: "Solicitar demostración",
    href: "/demostraciones",
  },
} as const;
