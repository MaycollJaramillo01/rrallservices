import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/data/products";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

// Bento en lugar del carrusel horizontal: el primero manda y los otros tres
// lo acompañan. Cada tarjeta lleva su llamada a agendar.
export function ProductDiscoveryRail() {
  const [lead, ...rest] = getFeaturedProducts().slice(0, 4);

  if (!lead) return null;

  return (
    <Section padding="xl">
      <Container padding="lg">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
              DESCUBRIR
            </span>
            <Heading as="h2" size="display-section" font="display">
              Productos destacados
            </Heading>
          </div>
          <Link
            href="/productos"
            className="text-sm font-medium text-[var(--color-deep-royal-blue)] hover:underline"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Link
            href={`/productos/${lead.slug}`}
            className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden bg-[var(--color-mist)] lg:col-span-2 lg:aspect-auto lg:min-h-[520px]"
          >
            <Image
              src={lead.images[0].src}
              alt={lead.images[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
            <div className="relative p-6 lg:p-10">
              <span className="text-[11px] tracking-[0.2em] text-white/75 uppercase">
                {lead.category}
              </span>
              <h3 className="mt-2 font-display text-3xl text-[var(--color-pure-white)] lg:text-4xl">
                {lead.name}
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/85">{lead.shortDescription}</p>
              <span className="mt-5 inline-flex items-center bg-[var(--color-pure-white)] px-6 py-3 text-sm font-medium text-[var(--color-ink)]">
                Solicitar demostración
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.slug}`}
                className="group flex items-center gap-4 border border-[var(--color-steel)]/40 bg-[var(--color-pure-white)] p-3 transition-colors hover:border-[var(--color-ink)]"
              >
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden bg-[var(--color-mist)]">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
                    {product.category}
                  </span>
                  <h3 className="mt-1 font-display text-lg leading-tight">{product.name}</h3>
                  <span className="mt-2 inline-block text-sm font-medium text-[var(--color-deep-royal-blue)] transition-transform duration-300 group-hover:translate-x-1">
                    Agendar demostración →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
