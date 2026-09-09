import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ProductTile } from "@/components/product/ProductTile";

export function ProductDiscoveryRail() {
  const products = getFeaturedProducts().slice(0, 4);

  if (products.length === 0) return null;

  return (
    <Section padding="xl" background="porcelain">
      <Container padding="lg">
        <div className="mb-8 flex items-end justify-between">
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
            className="flex-shrink-0 text-sm font-medium text-[var(--color-deep-royal-blue)] hover:underline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {products.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              className="w-[280px] flex-shrink-0 snap-start sm:w-[320px]"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
