import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";
import { SORTEO_FUENTE } from "@/lib/lead-schema";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/config/seo";

// Datos que el manual de comunicación de Royal Prestige (1.3.3, concursos y
// premios) exige publicar: organizador, requisitos, premio, cantidad y fechas.
// FALTA: confirmar las fechas con la distribuidora antes de publicar.
const sorteo = {
  premio: "Plancha Royal Prestige® Innove",
  cantidad: "Una (1)",
  fechaSorteo: "Por confirmar",
  fechaEntrega: "Por confirmar",
};

export const metadata: Metadata = createMetadata({
  title: `Sorteo: ${sorteo.premio} en New York`,
  description: `Participe por una ${sorteo.premio}. Complete sus nombres, apellidos, dirección y teléfono. Sin compra y sin compromiso.`,
  pathname: "/sorteo",
});

const steps = [
  ["Llene el boleto", "Nombres, apellidos, dirección y teléfono. Toma menos de un minuto."],
  ["Ya está participando", "No tiene que comprar nada ni asistir a una demostración."],
  ["Si gana, le llamamos", "Al número que registró, para coordinar la entrega de su plancha."],
];

const bases = [
  [
    "Organiza",
    `${siteConfig.legalName} (${siteConfig.name}), ${siteConfig.legalRelationship}. El sorteo no está organizado, patrocinado ni administrado por Royal Prestige® ni por Instagram.`,
  ],
  ["Premio", `${sorteo.cantidad} ${sorteo.premio}.`],
  [
    "Quién participa",
    `Personas mayores de 18 años que vivan en ${siteConfig.areasServed.join(", ")}.`,
  ],
  [
    "Cómo participar",
    "Completar el boleto de esta página con nombres, apellidos, dirección y número de teléfono. Una participación por persona.",
  ],
  [
    "Sin compra",
    "No es necesario comprar ni asistir a una demostración para participar ni para ganar.",
  ],
  [
    "Fecha del sorteo",
    `${sorteo.fechaSorteo}. El ganador se elige al azar entre las participaciones válidas.`,
  ],
  [
    "Entrega del premio",
    `${sorteo.fechaEntrega}. Llamamos al ganador al número registrado para coordinarla.`,
  ],
  [
    "Sus datos",
    "Se usan para gestionar el sorteo y contactarle. El nombre del ganador solo se publica con su permiso.",
  ],
] as const;

// Muescas del boleto a la altura de la línea perforada (el talón mide 96px).
// Con máscara quedan transparentes sobre cualquier fondo; la sombra va en el
// padre con drop-shadow porque la máscara recortaría un box-shadow.
const notch = (side: "left" | "right") =>
  `radial-gradient(circle 14px at ${side === "left" ? "0" : "100%"} 96px, #0000 97%, #000) ${side} / 51% 100% no-repeat`;
const ticketMask: CSSProperties = {
  mask: `${notch("left")}, ${notch("right")}`,
  WebkitMask: `${notch("left")}, ${notch("right")}`,
};

const shareUrl = `https://wa.me/?text=${encodeURIComponent(
  `Estoy participando por una ${sorteo.premio}. Participe aquí: ${siteConfig.url}/sorteo`,
)}`;

function Check() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-[var(--gold)]">
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function SorteoPage() {
  return (
    // Paleta de las piezas de Instagram de la distribuidora: noche y dorado.
    <div className="[--gold:#c9a55c] [--night:#0b1830]">
      <section className="relative isolate overflow-hidden bg-[var(--night)]">
        {/* La luz cálida de la lámpara del reel. */}
        <div
          aria-hidden
          className="absolute -top-48 -right-32 -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(201,165,92,0.32),transparent_62%)]"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(53,111,192,0.28),transparent_65%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[-0.18em] left-1/2 -z-10 -translate-x-1/2 font-display text-[30vw] leading-none whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] lg:text-[22vw]"
        >
          Regalamos
        </span>

        <Container
          padding="lg"
          className="grid grid-cols-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:py-24"
        >
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-3 border border-[var(--gold)]/40 px-4 py-2 text-[11px] tracking-[0.25em] text-[var(--gold)] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] motion-safe:animate-pulse" />
              Sorteo abierto · New York
            </p>
            <h1 className="mt-8 font-display text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.92] tracking-tight text-[var(--color-pure-white)]">
              Esta plancha
              <br />
              <em className="text-[var(--gold)]">puede ser suya.</em>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
              Regalamos una {sorteo.premio}. Llene su boleto y ya está participando.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75">
              {["Sin compra", "Sin compromiso", "Menos de un minuto"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="participar"
            className="group relative scroll-mt-24 drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] lg:col-span-5 lg:col-start-8"
          >
            <div className="bg-[var(--color-warm-porcelain)]" style={ticketMask}>
              <div className="flex h-24 items-center justify-between gap-4 px-6 sm:px-8">
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-[var(--color-steel)] uppercase">
                    Boleto de participación
                  </p>
                  <p className="mt-1 font-display text-2xl leading-none text-[var(--color-deep-royal-blue)]">
                    Plancha Innove
                  </p>
                </div>
                <p className="text-right text-[10px] leading-relaxed tracking-[0.2em] text-[var(--color-steel)] uppercase group-has-[[role=status]]:invisible">
                  Admite
                  <br />1 persona
                </p>
              </div>
              <div className="mx-6 border-t-2 border-dashed border-[var(--color-steel)]/25" />
              <div className="p-6 sm:p-8">
                <LeadForm
                  fuente={SORTEO_FUENTE}
                  variant="sorteo"
                  submitLabel="Quiero participar"
                  successTitle="¡Listo, {nombre}! Ya está participando."
                  successBody="Si resulta ganador, le llamaremos al número que registró."
                />
              </div>
            </div>
            {/* Sello sobre el talón: aparece cuando el formulario muestra la confirmación. */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-8 right-4 hidden -rotate-12 border-2 border-[var(--color-ink)] px-2 py-1 text-[11px] font-semibold tracking-[0.25em] text-[var(--color-ink)] uppercase opacity-80 group-has-[[role=status]]:block sm:top-7 sm:right-5 sm:px-3 sm:text-sm"
            >
              Participando
            </span>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--color-pure-white)] py-16 sm:py-20">
        <Container padding="lg">
          <p className="text-[11px] tracking-[0.25em] text-[var(--color-steel)] uppercase">
            Así de fácil
          </p>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 md:gap-8">
            {steps.map(([title, text], index) => (
              <li
                key={title}
                className="flex gap-5 border-t border-[var(--color-steel)]/30 pt-6 md:block"
              >
                <span className="font-display text-5xl leading-none text-[var(--color-ink)] md:text-6xl">
                  0{index + 1}
                </span>
                <div>
                  <h2 className="font-display text-2xl md:mt-5 md:text-3xl">{title}</h2>
                  <p className="mt-2 max-w-xs text-[var(--color-graphite)]">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-[var(--color-warm-porcelain)] py-16 sm:py-20">
        <Container padding="lg" className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.25em] text-[var(--color-steel)] uppercase">
              Quién organiza
            </p>
            <p className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-[var(--color-deep-royal-blue)]">
              Un sorteo de {siteConfig.legalName}, su distribuidora independiente de Royal Prestige®
              en New York desde {siteConfig.foundingYear}.
            </p>
            <p className="mt-6 text-[var(--color-graphite)]">
              {siteConfig.founder} está al frente de la distribución. Síganos en{" "}
              <a
                href={siteConfig.social.instagram}
                className="text-[var(--color-deep-royal-blue)] underline"
              >
                Instagram @kr.prestige
              </a>
              , donde anunciamos el sorteo.
            </p>
          </div>
          <div className="self-end border-l-2 border-[var(--color-ink)] pl-6 lg:col-span-4 lg:col-start-9">
            <p className="font-medium text-[var(--color-deep-royal-blue)]">
              Nunca le pediremos dinero ni datos bancarios para entregarle el premio.
            </p>
            <p className="mt-3 text-sm text-[var(--color-graphite)]">
              Si alguien se lo pide en nuestro nombre, no somos nosotros. Ante cualquier duda,
              llámenos al{" "}
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="whitespace-nowrap underline"
              >
                {siteConfig.phone}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      <section id="bases" className="scroll-mt-24 bg-[var(--color-pure-white)] py-16 sm:py-20">
        <Container padding="lg" className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl">Bases del sorteo</h2>
            <p className="mt-4 text-sm text-[var(--color-steel)]">
              Más información en la{" "}
              <Link href="/privacidad" className="text-[var(--color-deep-royal-blue)] underline">
                política de privacidad
              </Link>{" "}
              y los{" "}
              <Link href="/terminos" className="text-[var(--color-deep-royal-blue)] underline">
                términos
              </Link>
              .
            </p>
          </div>
          <dl className="divide-y divide-[var(--color-steel)]/25 border-t border-[var(--color-steel)]/25 lg:col-span-8">
            {bases.map(([title, text]) => (
              <div key={title} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-6">
                <dt className="text-sm font-medium text-[var(--color-deep-royal-blue)]">{title}</dt>
                <dd className="text-sm text-[var(--color-graphite)] sm:col-span-2">{text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-[var(--night)] py-14 sm:py-16">
        <Container
          padding="lg"
          className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-[var(--color-pure-white)]">
            ¿Conoce a alguien que <em className="text-[var(--gold)]">ame cocinar?</em>
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[var(--gold)] px-7 py-4 text-sm font-medium text-[var(--night)] transition-opacity hover:opacity-90"
            >
              Compartir por WhatsApp
            </a>
            <a
              href="#participar"
              className="inline-flex items-center border border-white/40 px-7 py-4 text-sm font-medium text-[var(--color-pure-white)] transition-colors hover:border-white"
            >
              Llenar mi boleto
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
