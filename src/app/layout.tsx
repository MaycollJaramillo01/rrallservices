import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppBubble } from "@/components/layout/WhatsAppBubble";
import { siteConfig } from "@/config/site";
import { JsonLd, localBusinessSchema, webSiteSchema } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Royal Prestige® en New York | RR All Services, Distribuidor Autorizado",
    template: "%s | RR All Services New York",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  keywords: [
    "Royal Prestige New York",
    "distribuidor autorizado Royal Prestige",
    "ollas Royal Prestige New York",
    "purificador de agua Royal Prestige",
    "FrescaFlow",
    "FrescaPure filtro de ducha",
    "filtración de aire para el hogar",
    "demostración Royal Prestige a domicilio",
    "RR All Services",
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: "Royal Prestige® en New York | RR All Services",
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
  },
  twitter: { card: "summary_large_image", images: [`${siteConfig.url}/og.jpg`] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "Home & Kitchen",
  other: {
    "geo.region": `${siteConfig.country}-${siteConfig.region}`,
    "geo.placename": siteConfig.city,
    "geo.position": `${siteConfig.latitude};${siteConfig.longitude}`,
    ICBM: `${siteConfig.latitude}, ${siteConfig.longitude}`,
  },
};

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[var(--color-pure-white)]">
        <JsonLd data={[localBusinessSchema(), webSiteSchema()]} />
        <Header />
        <div className="pt-16 lg:pt-20">{children}</div>
        <Footer />
        <WhatsAppBubble />
      </body>
    </html>
  );
}
