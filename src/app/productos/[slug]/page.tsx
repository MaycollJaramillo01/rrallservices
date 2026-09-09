import { Metadata } from "next";
import { createMetadata } from "@/config/seo";
import { JsonLd, breadcrumbSchema, productSchema } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInformation } from "@/components/product/ProductInformation";
import { ProductRecommendations } from "@/components/product/ProductRecommendations";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Producto no encontrado" };
  return createMetadata({
    title: `${product.name} en New York`,
    description: `${product.shortDescription} Distribuidor Autorizado Royal Prestige® en ${siteConfig.serviceArea}. Solicite una demostración privada sin compromiso.`,
    pathname: `/productos/${product.slug}`,
    images: product.images.slice(0, 1).map((i) => i.src),
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <main>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Productos", path: "/productos" },
            { name: product.name, path: `/productos/${product.slug}` },
          ]),
        ]}
      />
      <div className="mx-auto max-w-[1480px] px-6 py-8 sm:px-8 lg:px-[64px] xl:px-[88px]">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Productos", href: "/productos" },
            { label: product.name, href: `/productos/${product.slug}` },
          ]}
        />
      </div>
      <div className="mx-auto max-w-[1480px] px-6 sm:px-8 lg:px-[64px] xl:px-[88px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ProductGallery images={product.images} productName={product.name} />
          </div>
          <div className="lg:col-span-7">
            <ProductInformation product={product} />
          </div>
        </div>
      </div>
      <ProductRecommendations products={related} />
    </main>
  );
}
