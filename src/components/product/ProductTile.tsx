import Link from "next/link";
import Image from "next/image";
import { Product } from "@/domain/product/types";
import { getProductActionLabel } from "@/config/commerce";

interface ProductTileProps {
  product: Product;
  className?: string;
}

export function ProductTile({ product, className = "" }: ProductTileProps) {
  const primaryImage = product.images[0];

  return (
    <Link
      href={`/productos/${product.slug}`}
      className={`group relative block overflow-hidden ${className}`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-[var(--color-mist)]">
        {primaryImage && (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            width={primaryImage.width}
            height={primaryImage.height}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        )}
      </div>
      <div className="mt-4">
        <span className="text-[11px] tracking-[0.15em] text-[var(--color-steel)] uppercase">
          {product.category === "agua"
            ? "AGUA"
            : product.category === "cocina"
              ? "COCINA"
              : "HOGAR"}
        </span>
        <h3 className="mt-1 font-display text-lg transition-opacity duration-300 group-hover:opacity-80">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--color-steel)]">
          {product.shortDescription}
        </p>
        <span className="mt-3 inline-block text-sm font-medium text-[var(--color-deep-royal-blue)] transition-transform duration-300 group-hover:translate-x-1">
          {getProductActionLabel()} →
        </span>
      </div>
    </Link>
  );
}
