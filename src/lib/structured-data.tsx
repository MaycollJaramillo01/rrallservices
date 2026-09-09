import { siteConfig } from "@/config/site";
import type { Product } from "@/domain/product/types";

// Datos estructurados en un solo sitio. Los consumen tanto los buscadores
// (rich results, panel local) como los asistentes y modelos que leen la web:
// cuanto más explícita sea la entidad —quién, qué, dónde—, mejor la citan.

const ORG_ID = `${siteConfig.url}/#organizacion`;
const SITE_ID = `${siteConfig.url}/#sitio`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/assets/products/agua-frescaflow-main.jpg`,
    logo: `${siteConfig.url}/assets/brand/rr-logo.png`,
    priceRange: "$$$",
    currenciesAccepted: "USD",
    knowsLanguage: siteConfig.languages,
    foundingDate: String(siteConfig.foundingYear),
    founder: { "@type": "Person", name: siteConfig.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.split(",")[0],
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      postalCode: siteConfig.postalCode,
      addressCountry: siteConfig.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    areaServed: siteConfig.areasServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    brand: { "@type": "Brand", name: "Royal Prestige®" },
    slogan: "Eleve su hogar al estándar de bienestar",
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Demostración privada de sistemas Royal Prestige®",
        serviceType: "Demostración de producto a domicilio",
        areaServed: siteConfig.serviceArea,
        provider: { "@id": ORG_ID },
      },
    },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "es-US",
    publisher: { "@id": ORG_ID },
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    image: product.images.map((image) => `${siteConfig.url}${image.src}`),
    additionalProperty: product.specifications.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
    // Sin precio publicado: la venta se cierra tras la demostración, así que
    // se declara la disponibilidad del servicio, no una oferta con importe.
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: `${siteConfig.url}/productos/${product.slug}`,
      seller: { "@id": ORG_ID },
      areaServed: siteConfig.serviceArea,
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es-US",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Demostración privada de sistemas Royal Prestige® en New York",
    description:
      "Presentación a domicilio de los sistemas de cocina, purificación de agua y filtración de aire Royal Prestige®, sin compromiso de compra.",
    serviceType: "Demostración de producto a domicilio",
    provider: { "@id": ORG_ID },
    areaServed: siteConfig.areasServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    availableLanguage: siteConfig.languages,
  };
}

/** Inserta el JSON-LD en el árbol. Next lo deja pasar tal cual al HTML. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
