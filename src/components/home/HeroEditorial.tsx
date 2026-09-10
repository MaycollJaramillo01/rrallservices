import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function HeroEditorial() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[var(--color-graphite)] lg:min-h-[calc(100svh-5rem)]">
      {/* Fondo a sangre. Dos fuentes con `media`: el navegador elige una sola en
          la selección de recurso, así el móvil no descarga los 4,8 MB del corte
          horizontal. No se reevalúa al redimensionar la ventana; asumido.
          ponytail: si algún día hace falta cambiar de corte en vivo, montar el
          <video> con key por breakpoint. */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/hero/hero-movil.jpg"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/hero/hero-desktop.mp4" media="(min-width: 1024px)" type="video/mp4" />
        <source src="/assets/hero/hero-movil.mp4" type="video/mp4" />
      </video>

      {/* La sombra: oscurece lo justo para que el texto se lea sobre la imagen
          en movimiento, más densa por la izquierda, donde va la tipografía. */}
      <div className="absolute inset-0 bg-black/35 lg:bg-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

      <Container padding="lg" className="relative w-full py-20 lg:py-24">
        <div className="max-w-2xl">
          <span className="mb-6 block text-[11px] tracking-[0.2em] text-white/75 uppercase">
            RR ALL SERVICES · NEW YORK
          </span>
          <h1 className="mb-8 font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-none tracking-tight text-[var(--color-pure-white)]">
            Productos pensados
            <br />
            para el centro de
            <br />
            su hogar
          </h1>
          <p className="mb-10 max-w-md text-lg leading-relaxed text-white/85">
            Descubra los sistemas Royal Prestige® con asesoría personalizada en New York.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/demostraciones"
              className="inline-flex w-fit items-center bg-[var(--color-ink)] px-8 py-4 text-sm font-medium text-[var(--color-pure-white)] transition-opacity hover:opacity-90"
            >
              Solicitar demostración
            </Link>
            <Link
              href="/productos"
              className="inline-flex w-fit items-center border border-white/50 px-8 py-4 text-sm font-medium text-[var(--color-pure-white)] transition-colors hover:border-[var(--color-pure-white)]"
            >
              Explorar productos →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
