import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * Metadatos de página. Toda página pública debería pasar por aquí: garantiza
 * canónica, Open Graph y las señales de localización que buscan tanto Google
 * como los asistentes que resumen la web.
 */
export function createMetadata(params: {
  title: string;
  description: string;
  pathname?: string;
  images?: string[];
  type?: "website" | "article";
}): Metadata {
  const path = params.pathname || "";
  const url = `${siteConfig.url}${path}`;
  const images = params.images?.map((src) =>
    src.startsWith("http") ? src : `${siteConfig.url}${src}`,
  ) ?? [`${siteConfig.url}/og.jpg`];

  return {
    title: params.title,
    description: params.description,
    alternates: { canonical: url },
    openGraph: {
      title: params.title,
      description: params.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: params.type || "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images,
    },
    other: {
      // Señales geográficas heredadas: siguen leyéndolas algunos directorios
      // locales y agregadores.
      "geo.region": `${siteConfig.country}-${siteConfig.region}`,
      "geo.placename": siteConfig.city,
      "geo.position": `${siteConfig.latitude};${siteConfig.longitude}`,
      ICBM: `${siteConfig.latitude}, ${siteConfig.longitude}`,
    },
  };
}
