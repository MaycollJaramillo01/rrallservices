import { getProducts } from "@/data/products";
import { ProductTile } from "@/components/product/ProductTile";

interface ProductGridProps {
  products?: ReturnType<typeof getProducts>;
}

export function ProductGrid({ products }: ProductGridProps) {
  const allProducts = products ?? getProducts();

  if (allProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="mb-3 font-display text-2xl">No encontramos productos</h3>
        <p className="mb-6 text-[var(--color-steel)]">
          Pruebe con otro término o explore todas las categorías.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {allProducts.map((product) => (
        <ProductTile key={product.id} product={product} />
      ))}
    </div>
  );
}
