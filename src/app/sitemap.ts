import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const siteUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/productos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/demostraciones`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contacto`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/preguntas-frecuentes`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terminos`, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...staticRoutes,
    ...categories.map((category) => ({
      url: `${siteUrl}/categorias/${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/productos/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ].map((route) => ({ ...route, lastModified }));
}
