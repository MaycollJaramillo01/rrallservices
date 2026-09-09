import { Metadata } from "next";
import { createMetadata } from "@/config/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ProductGrid } from "@/components/catalog/ProductGrid";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Categoría no encontrada" };
  return createMetadata({
    title: `${category.name} Royal Prestige® en New York`,
    description: `${category.description}. Distribuidor Autorizado en ${siteConfig.serviceArea}.`,
    pathname: `/categorias/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Productos", path: "/productos" },
          { name: category.name, path: `/categorias/${category.slug}` },
        ])}
      />
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:px-8 lg:px-[64px] xl:px-[88px]">
        <span className="mb-4 block text-[11px] tracking-[0.2em] text-[var(--color-steel)] uppercase">
          {category.label}
        </span>
        <Heading as="h1" size="h1">
          {category.name}
        </Heading>
        <Text as="p" className="mt-4 text-[var(--color-steel)]">
          {categoryProducts.length} sistema
          {categoryProducts.length !== 1 ? "es" : ""} disponible
          {categoryProducts.length !== 1 ? "s" : ""}
        </Text>
      </div>
      <div className="mx-auto max-w-[1480px] px-6 pb-24 sm:px-8 lg:px-[64px] xl:px-[88px]">
        <ProductGrid products={categoryProducts} />
      </div>
    </main>
  );
}
