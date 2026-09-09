import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RR All Services | Distribuidor Autorizado de Royal Prestige®",
    template: "%s | RR All Services",
  },
  description: "Descubra sistemas premium Royal Prestige® para cocina, agua y hogar en New York.",
  metadataBase: new URL(siteConfig.url),
};

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[var(--color-pure-white)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: siteConfig.name,
              legalName: siteConfig.legalName,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.phone,
              email: siteConfig.email,
              areaServed: siteConfig.serviceArea,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.address,
                addressLocality: "New York",
                addressCountry: "US",
              },
              brand: { "@type": "Brand", name: "Royal Prestige®" },
            }),
          }}
        />
        <Header />
        <div className="pt-16 lg:pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
