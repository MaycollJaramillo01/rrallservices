import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { getProductsByCategory } from "@/data/products";

// Bento de categorías. Se usan fotos de producto reales, no las piezas de
// redes con texto incrustado, y el degradado va solo en la banda inferior:
// antes un tinte a pantalla completa deslavaba la imagen entera.
const tiles = [
  {
    slug: "cocina",
    name: "Cocina",
    copy: "Batería de acero de grado quirúrgico, extractor de jugos y cuchillería.",
    image: "/assets/products/cocina-bateria-main.jpg",
    className: "lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto",
  },
  {
    slug: "agua",
    name: "Agua",
    copy: "Purificación por ósmosis inversa y filtro para la ducha.",
    image: "/assets/products/agua-frescaflow-main.jpg",
    className: "aspect-[4/3]",
  },
  {
    slug: "hogar",
    name: "Hogar",
    copy: "Filtración de aire para las áreas donde vive la familia.",
    image: "/assets/products/hogar-aire-hogar.jpg",
    className: "aspect-[4/3]",
  },
];

export function CategoryArchitecture() {
  return (
    <Section padding="xl" background="porcelain">
      <Container padding="lg">
        <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
          EXPLORAR
        </span>
        <Heading as="h2" size="display-section" font="display">
          Por categoría
        </Heading>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {tiles.map((tile) => (
            <Link
              key={tile.slug}
              href={`/productos?cat=${tile.slug}`}
              className={`group relative overflow-hidden bg-[var(--color-mist)] ${tile.className}`}
            >
              <Image
                src={tile.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <span className="text-[11px] tracking-[0.2em] text-white/75 uppercase">
                  {getProductsByCategory(tile.slug).length} sistemas
                </span>
                <h3 className="mt-2 font-display text-2xl text-[var(--color-pure-white)] lg:text-3xl">
                  {tile.name}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-white/80">{tile.copy}</p>
                <span className="mt-4 inline-block text-sm font-medium text-[var(--color-pure-white)] transition-transform duration-300 group-hover:translate-x-1">
                  Ver categoría →
                </span>
              </div>
            </Link>
          ))}

          <Link
            href="/demostraciones"
            className="flex aspect-[4/3] flex-col justify-between bg-[var(--color-ink)] p-6 text-[var(--color-pure-white)] transition-opacity hover:opacity-90 sm:col-span-2 lg:col-span-2 lg:aspect-auto lg:p-8"
          >
            <span className="text-[11px] tracking-[0.2em] text-white/70 uppercase">
              AGENDE SU CITA
            </span>
            <div>
              <h3 className="font-display text-2xl lg:text-3xl">
                ¿No sabe cuál necesita su hogar?
              </h3>
              <p className="mt-2 max-w-sm text-sm text-white/85">
                Una especialista se lo muestra en su cocina y le ayuda a elegir.
              </p>
              <span className="mt-4 inline-block text-sm font-medium">
                Solicitar demostración →
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
