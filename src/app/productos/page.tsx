import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getProducts, getProductsByCategory } from "@/data/products";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "Productos",
  description: "Descubra los sistemas premium Royal Prestige® para cocina, agua y hogar.",
};

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const active = categories.find((category) => category.slug === cat);
  const visible = active ? getProductsByCategory(active.slug) : getProducts();

  return (
    <main>
      <div className="border-b border-[var(--color-steel)]">
        <Container padding="lg" className="py-12">
          <Heading as="h1" size="h1" font="display">
            {active ? active.name : "Productos"}
          </Heading>
          <Text as="p" className="mt-3 max-w-xl">
            {active
              ? active.description
              : "Sistemas Royal Prestige® para la cocina, el agua y el cuidado del hogar."}
          </Text>
          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filtrar por categoría">
            <Link
              href="/productos"
              aria-current={active ? undefined : "page"}
              className={`border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-[var(--color-steel)] text-[var(--color-graphite)] hover:border-[var(--color-ink)]"
                  : "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-pure-white)]"
              }`}
            >
              Todos
            </Link>
            {categories.map((category) => {
              const isActive = active?.slug === category.slug;
              return (
                <Link
                  key={category.slug}
                  href={`/productos?cat=${category.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-pure-white)]"
                      : "border-[var(--color-steel)] text-[var(--color-graphite)] hover:border-[var(--color-ink)]"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </nav>
          <Text as="p" size="sm" className="mt-6 text-[var(--color-steel)]">
            {visible.length} {visible.length === 1 ? "sistema disponible" : "sistemas disponibles"}
          </Text>
        </Container>
      </div>
      <Container padding="lg" className="py-16">
        <ProductGrid products={visible} />
      </Container>
    </main>
  );
}
