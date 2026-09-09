import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

// Vídeo oficial de Royal Prestige® servido con su propio reproductor: no se
// descarga ni se re-aloja. Va de fondo a sangre en escritorio; en móvil manda
// la fotografía, porque el reproductor pesa y allí el autoplay es poco fiable.
const HERO_VIDEO_ID = "UZ9L6KW3LpM";
const HERO_VIDEO_TITLE = "Royal Prestige® Nunca dejas de sorprenderte";

const videoParams = new URLSearchParams({
  autoplay: "1",
  mute: "1",
  loop: "1",
  playlist: HERO_VIDEO_ID,
  controls: "0",
  disablekb: "1",
  playsinline: "1",
  rel: "0",
});

export function HeroEditorial() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[var(--color-graphite)] lg:min-h-[calc(100svh-5rem)]">
      {/* Fotograma del vídeo del propio distribuidor, recortado por encima de
          los subtítulos quemados. Es la única imagen vertical y limpia del
          material; sustituible por fotografía propia en cuanto exista. */}
      <Image
        src="/assets/hero/hero-movil.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover lg:hidden"
      />

      {/* Recorte 16:9 a "cover": el iframe se sobredimensiona con unidades de
          viewport y se centra, así siempre desborda por un lado y nunca deja
          franjas. Sin controles y sin eventos de puntero: es un fondo.
          El desenfoque leve es deliberado: el vídeo trae rótulos quemados que
          competirían con el titular, y así quedan como textura. El scale-110
          evita que el blur deje los bordes transparentes. */}
      <div aria-hidden className="absolute inset-0 hidden overflow-hidden lg:block">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?${videoParams}`}
          title={HERO_VIDEO_TITLE}
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-110 border-0 blur-[6px]"
        />
      </div>

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
