export const companyData = {
  name: "RR All Services",
  legalName: "KR Prestige",
  founder: "Kellyn Reyes",
  experienceYears: 5,
  location: "New York, Estados Unidos",
  role: "Distribuidor Autorizado Independiente de Royal Prestige®",
  description:
    "RR All Services presenta sistemas premium Royal Prestige® para cocina, agua y hogar con asesoría personalizada en New York.",
  mission:
    "Presentar los sistemas Royal Prestige® a familias que buscan mejorar su cocina, nutrición, calidad del agua y bienestar doméstico.",
  // ponytail: no hay foto de la fundadora en el material entregado; esta es
  // una pieza de marca. Sustituir por un retrato real cuando exista.
  image: {
    src: "/assets/company/marca.jpg",
    alt: "Pieza de marca de RR All Services: filtramos, purificamos y elevamos",
    width: 1080,
    height: 1350,
  },
} as const;
