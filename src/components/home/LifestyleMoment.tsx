import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

// Antes había un banner con una infografía numerada que no decía nada.
// Ahora es la banda de conversión: agendar la cita.
export function LifestyleMoment() {
  return (
    <section className="bg-[var(--color-ink)] text-[var(--color-pure-white)]">
      <Container padding="lg">
        <div className="flex flex-col items-start gap-10 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
          <div className="max-w-xl">
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-white/70 uppercase">
              AGENDE SU CITA
            </span>
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-tight text-[var(--color-pure-white)]">
              Una especialista en su cocina, sin compromiso de compra
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">
              Elegimos juntos día y hora. Verá los sistemas funcionando con sus propios alimentos y
              su propia agua antes de decidir nada.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/demostraciones"
              className="inline-flex items-center justify-center bg-[var(--color-pure-white)] px-8 py-4 text-sm font-medium text-[var(--color-ink)] transition-opacity hover:opacity-90"
            >
              Agendar mi cita
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-sm font-medium text-[var(--color-pure-white)] transition-colors hover:border-[var(--color-pure-white)]"
            >
              Llamar al {siteConfig.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
