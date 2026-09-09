import Link from "next/link";
import { Product } from "@/domain/product/types";
import { getProductActionLabel } from "@/config/commerce";
import { Button } from "@/components/ui/Button";

interface ProductInformationProps {
  product: Product;
}

export function ProductInformation({ product }: ProductInformationProps) {
  return (
    <div className="space-y-6">
      <span className="text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
        {product.category === "agua" ? "AGUA" : product.category === "cocina" ? "COCINA" : "HOGAR"}
      </span>
      <h1 className="font-display text-3xl leading-tight sm:text-4xl">{product.name}</h1>
      <p className="leading-relaxed text-[var(--color-graphite)]">{product.description}</p>
      <div className="space-y-4">
        <h3 className="font-ui text-sm tracking-wider uppercase">Beneficios</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-[var(--color-graphite)]">
              <span className="mt-0.5 text-[var(--color-royal-accent-blue)]">—</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      {product.specifications.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-ui text-sm tracking-wider uppercase">Especificaciones</h3>
          {product.specifications.map((spec, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-[var(--color-steel)] py-2 text-sm"
            >
              <span className="text-[var(--color-steel)]">{spec.label}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      )}
      <div className="pt-4">
        <Button
          variant="primary"
          size="lg"
          as={Link}
          href={`/demostraciones?producto=${product.slug}`}
        >
          {getProductActionLabel()}
        </Button>
      </div>
    </div>
  );
}
