import { Product } from "@/domain/product/types";
import { ProductTile } from "./ProductTile";

interface ProductRecommendationsProps {
  products: Product[];
  title?: string;
}

export function ProductRecommendations({
  products,
  title = "También puede conocer",
}: ProductRecommendationsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1480px] px-6 py-16 sm:px-8 lg:px-[64px] xl:px-[88px]">
      <div className="border-t border-[var(--color-steel)] pt-12">
        <h2 className="mb-8 font-display text-2xl">{title}</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
