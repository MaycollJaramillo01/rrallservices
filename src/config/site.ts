export const siteConfig = {
  name: "RR All Services",
  legalName: "KR Prestige",
  legalRelationship: "Distribuidor Autorizado Independiente de Royal Prestige®",
  description:
    "Distribuidor Autorizado Independiente de Royal Prestige® en New York: sistemas de cocina, purificación de agua y filtración de aire con demostración privada a domicilio.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.rrallservices.com",
  locale: "es_US",
  serviceArea: "New York, Estados Unidos",
  phone: process.env.NEXT_PUBLIC_PHONE || "(929) 670-4101",
  email: process.env.NEXT_PUBLIC_EMAIL || "rrallservicves@gmail.com",
  address: process.env.NEXT_PUBLIC_ADDRESS || "5030 Broadwey Suite 823, New York, USA",

  // Señales locales. La calle y el código postal salen de la dirección
  // publicada; verifíquelos antes de reclamar la ficha de Google Business.
  city: "New York",
  region: "NY",
  postalCode: "10034",
  country: "US",
  // ponytail: coordenadas aproximadas de 5030 Broadway (Inwood, Manhattan).
  // Ajústelas al pin real de la ficha de Google Business.
  latitude: 40.8712,
  longitude: -73.9187,
  // Zonas donde el distribuidor atiende. Añada o quite condados según cobertura
  // real: aparece en los datos estructurados y lo leen buscadores y asistentes.
  areasServed: ["Manhattan", "Bronx", "Brooklyn", "Queens", "Staten Island", "Westchester County"],
  languages: ["Español", "Inglés"],
  founder: "Kellyn Reyes",
  foundingYear: 2021,
  // WhatsApp Business. El número va en formato internacional, sin signos:
  // es lo que espera wa.me.
  whatsapp: "19296704101",
  whatsappMessage: "Hola, me interesa conocer los sistemas Royal Prestige. ¿Me puede orientar?",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61580707661906",
    instagram: "https://www.instagram.com/kr.prestige/",
  },
  // Perfiles públicos: refuerzan la entidad en datos estructurados.
  sameAs: [
    "https://www.facebook.com/profile.php?id=61580707661906",
    "https://www.instagram.com/kr.prestige/",
  ] as string[],
} as const;
