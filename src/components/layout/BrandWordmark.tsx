import Link from "next/link";
import Image from "next/image";

// El logotipo se muestra siempre por debajo de su tamaño original (152×182)
// para que se vea nítido también en pantallas de alta densidad.
export function BrandWordmark({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";

  return (
    <Link href="/" className="flex items-center gap-3 no-underline">
      <Image
        src={isLight ? "/assets/brand/rr-logo-blanco.png" : "/assets/brand/rr-logo.png"}
        alt="RR All Services"
        width={152}
        height={182}
        priority
        className="h-10 w-auto lg:h-12"
      />
      <span
        className={`font-display text-2xl tracking-tight ${
          isLight ? "text-[var(--color-pure-white)]" : "text-[var(--color-ink)]"
        }`}
      >
        RR ALL
      </span>
      <span
        className={`hidden text-xs tracking-[0.2em] uppercase sm:block ${
          isLight ? "text-white/70" : "text-[var(--color-steel)]"
        }`}
      >
        Services
      </span>
    </Link>
  );
}
