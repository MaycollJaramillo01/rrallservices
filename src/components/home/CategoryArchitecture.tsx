import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export function CategoryArchitecture() {
  return (
    <Section padding="xl" background="porcelain">
      <Container padding="lg">
        <div className="mb-12">
          <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
            EXPLORAR
          </span>
          <Heading as="h2" size="display-section" font="display">
            Por categoría
          </Heading>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className={
                index === 0
                  ? "relative row-span-2 aspect-[16/9] overflow-hidden lg:col-span-8 lg:aspect-auto lg:h-[500px]"
                  : "relative aspect-[16/9] overflow-hidden lg:col-span-4 lg:aspect-auto lg:h-[240px]"
              }
            >
              <Image
                src={category.image.src}
                alt={category.image.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.05]"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <span className="text-[11px] tracking-[0.2em] text-[var(--color-pure-white)] uppercase">
                  {category.label}
                </span>
                <h3 className="mt-2 font-display text-2xl text-[var(--color-pure-white)] sm:text-3xl">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
