export const siteConfig = {
  name: "RR All Services",
  legalName: "KR Prestige",
  legalRelationship: "Distribuidor Autorizado Independiente de Royal Prestige®",
  description:
    "Catálogo digital de RR All Services, Distribuidor Autorizado Independiente de Royal Prestige® en New York.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.rrallservices.com",
  locale: "es_US",
  serviceArea: "New York, Estados Unidos",
  phone: process.env.NEXT_PUBLIC_PHONE || "(929) 670-4101",
  email: process.env.NEXT_PUBLIC_EMAIL || "rrallservicves@gmail.com",
  address: process.env.NEXT_PUBLIC_ADDRESS || "5030 Broadwey Suite 823, New York, USA",
} as const;
