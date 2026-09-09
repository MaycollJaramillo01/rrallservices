import type { Product } from "@/domain/product/types";

// Catálogo construido a partir del material gráfico real del distribuidor.
// Los textos provienen de sus propias piezas de comunicación; no hay precios
// publicados porque la venta se cierra tras la demostración.
const commerce = {
  purchasable: false,
  price: null,
  compareAtPrice: null,
  currency: null,
  inventory: null,
  variants: [],
};

export const products: Product[] = [
  {
    id: "product-frescaflow",
    slug: "frescaflow",
    sku: null,
    name: "Royal Prestige® FrescaFlow™",
    brand: "Royal Prestige®",
    category: "agua",
    subcategory: "filtracion-de-agua",
    collection: null,
    shortDescription: "Purificador de agua por ósmosis inversa para el hogar.",
    description:
      "FrescaFlow™ purifica el agua mediante ósmosis inversa: presuriza el agua y la empuja a través de una barrera de poros diminutos para reducir sustancias no deseadas. El resultado es agua con frescura mejorada para beber y preparar alimentos, disponible en el momento que la necesite.",
    images: [
      {
        src: "/assets/products/agua-frescaflow-main.jpg",
        alt: "Purificador de agua Royal Prestige® FrescaFlow™ con su grifo dedicado",
        width: 976,
        height: 828,
      },
      {
        src: "/assets/products/agua-frescaflow-sistema.jpg",
        alt: "Sistema FrescaFlow™ de ósmosis inversa y sus características",
        width: 1080,
        height: 1350,
      },
    ],
    video: null,
    features: [
      "Purificación por ósmosis inversa",
      "Agua para beber y para preparar alimentos",
      "Reducción de impurezas y sustancias no deseadas",
      "Grifo dedicado con indicador digital",
      "Fácil instalación y bajo mantenimiento",
    ],
    benefits: ["Mayor pureza del agua", "Frescura y sabor mejorados", "Garantía del fabricante"],
    specifications: [
      { label: "Tecnología", value: "Ósmosis inversa" },
      { label: "Instalación", value: "Bajo el fregadero, con grifo dedicado" },
      { label: "Uso", value: "Doméstico" },
    ],
    careInstructions: ["Cambio de filtros según el calendario indicado por el fabricante"],
    relatedProducts: ["frescapure", "filtracion-aire"],
    availabilityByRegion: [{ country: "Estados Unidos", available: true }],
    seo: {
      title: "Royal Prestige® FrescaFlow™ | RR All Services",
      description: "Purificador de agua por ósmosis inversa Royal Prestige® FrescaFlow™.",
    },
    commerce,
    available: true,
    featured: true,
    new: false,
    badges: [],
  },
  {
    id: "product-frescapure",
    slug: "frescapure",
    sku: null,
    name: "FrescaPure™ Shower Filter",
    brand: "Royal Prestige®",
    category: "agua",
    subcategory: "filtracion-de-ducha",
    collection: null,
    shortDescription: "Filtro de ducha que reduce el cloro y los sedimentos.",
    description:
      "El filtro para la ducha FrescaPure™ trata el agua justo antes de que toque su piel: reduce el cloro, el mal olor y los sedimentos, y convierte la ducha diaria en un momento de cuidado personal. Su mango ergonómico ofrece cinco velocidades para masajes localizados.",
    images: [
      {
        src: "/assets/products/agua-frescapure-main.jpg",
        alt: "Filtro de ducha FrescaPure™ instalado junto a la regadera",
        width: 938,
        height: 953,
      },
      {
        src: "/assets/products/agua-frescapure-ritual.jpg",
        alt: "FrescaPure™: pureza en cada gota, masaje revitalizante y calidad certificada",
        width: 1080,
        height: 1350,
      },
      {
        src: "/assets/products/agua-frescapure-cuidado.jpg",
        alt: "FrescaPure™ Shower Filter presentado como ritual de cuidado personal",
        width: 1080,
        height: 1350,
      },
      {
        src: "/assets/products/agua-frescapure-detalle.jpg",
        alt: "Detalle del filtro FrescaPure™ y su conexión a la ducha",
        width: 1080,
        height: 1350,
      },
    ],
    video: null,
    features: [
      "Reduce el cloro, el mal olor y los sedimentos",
      "Cuida la barrera natural de la piel",
      "Ayuda a preservar la salud del cabello",
      "Mango ergonómico con cinco velocidades",
      "Instalación directa sobre la ducha existente",
    ],
    benefits: ["Piel y cabello mejor cuidados", "Ducha más pura", "Instalación sencilla"],
    specifications: [
      { label: "Uso", value: "Ducha doméstica" },
      { label: "Velocidades", value: "5" },
      { label: "Respaldo", value: "Calidad avalada por la EPA" },
    ],
    careInstructions: ["Reemplazo del cartucho según las indicaciones del fabricante"],
    relatedProducts: ["frescaflow", "filtracion-aire"],
    availabilityByRegion: [{ country: "Estados Unidos", available: true }],
    seo: {
      title: "FrescaPure™ Shower Filter | RR All Services",
      description: "Filtro de ducha FrescaPure™: reduce cloro y sedimentos, cuida piel y cabello.",
    },
    commerce,
    available: true,
    featured: true,
    new: false,
    badges: [],
  },
  {
    id: "product-bateria-cocina",
    slug: "bateria-de-cocina",
    sku: null,
    name: "Batería de cocina Royal Prestige®",
    brand: "Royal Prestige®",
    category: "cocina",
    subcategory: "ollas-y-sartenes",
    collection: "Cooking System",
    shortDescription: "Ollas y sartenes de acero inoxidable de grado quirúrgico.",
    description:
      "La batería Royal Prestige® está fabricada en acero inoxidable de grado quirúrgico con infusión molecular de titanio. Su válvula Redi-Temp® avisa cuando es momento de bajar la temperatura o continuar la receta, y su diseño permite cocinar la mayoría de carnes y aves sin añadir aceite ni grasa.",
    images: [
      {
        src: "/assets/products/cocina-bateria-main.jpg",
        alt: "Batería de cocina Royal Prestige® en acero inoxidable de grado quirúrgico",
        width: 1024,
        height: 1280,
      },
      {
        src: "/assets/products/cocina-bateria-caracteristicas.jpg",
        alt: "Características de la batería: válvula Redi-Temp y cocción sin aceite",
        width: 1024,
        height: 1280,
      },
      {
        src: "/assets/products/cocina-bateria-diseno.jpg",
        alt: "Cacerola, sartén y olla de la batería Royal Prestige®",
        width: 1080,
        height: 1350,
      },
    ],
    video: null,
    features: [
      "Acero inoxidable de grado quirúrgico con infusión molecular de titanio",
      "Válvula Redi-Temp® que avisa el momento de bajar la temperatura",
      "Cocción de carnes y aves sin añadir aceite ni grasa",
      "Resistente a rayaduras con utensilios metálicos",
      "Permite cocinar a temperaturas altas sin descoloración",
    ],
    benefits: ["Preparaciones más saludables", "Durabilidad extrema", "Limpieza sencilla"],
    specifications: [
      { label: "Material", value: "Acero inoxidable de grado quirúrgico" },
      { label: "Piezas de referencia", value: 'Cacerola 3.5 QT · Sartén 10" · Olla 4 QT' },
      { label: "Garantía", value: "Hasta 50 años limitada en ollas y sartenes" },
    ],
    careInstructions: ["Lavar con agua tibia y jabón", "Secar antes de guardar"],
    relatedProducts: ["extractor-de-jugos", "cuchilleria"],
    availabilityByRegion: [{ country: "Estados Unidos", available: true }],
    seo: {
      title: "Batería de cocina Royal Prestige® | RR All Services",
      description:
        "Ollas y sartenes Royal Prestige® en acero inoxidable de grado quirúrgico con válvula Redi-Temp®.",
    },
    commerce,
    available: true,
    featured: true,
    new: false,
    badges: [],
  },
  {
    id: "product-extractor-jugos",
    slug: "extractor-de-jugos",
    sku: null,
    name: "Extractor de jugos Royal Prestige®",
    brand: "Royal Prestige®",
    category: "cocina",
    subcategory: "electrodomesticos",
    collection: null,
    shortDescription: "Extractor de prensado con accesorios para jugos, nieves y smoothies.",
    description:
      "El extractor Royal Prestige® cuenta con un motor potente que extrae el jugo de frutas y verduras con gran eficacia. A diferencia de un extractor centrífugo, su tecnología ayuda a disminuir la oxidación de los alimentos, de modo que conserve mejor vitaminas y minerales.",
    images: [
      {
        src: "/assets/products/cocina-extractor-main.jpg",
        alt: "Extractor de jugos Royal Prestige® con vasos y fruta",
        width: 1024,
        height: 1280,
      },
      {
        src: "/assets/products/cocina-extractor-accesorios.jpg",
        alt: "Accesorios del extractor: coladores para helados, pulpa y smoothies",
        width: 1080,
        height: 1419,
      },
    ],
    video: null,
    features: [
      "Motor potente para frutas y verduras",
      "Menor oxidación que un extractor centrífugo",
      "Colador para jugos con más pulpa",
      "Colador para helados a partir de fruta congelada",
      "Colador para smoothies y papillas naturales",
    ],
    benefits: ["Máxima nutrición", "Versatilidad de preparaciones", "Uso diario sencillo"],
    specifications: [
      { label: "Tecnología", value: "Extracción por prensado" },
      { label: "Accesorios", value: "Coladores intercambiables (se venden por separado)" },
    ],
    careInstructions: ["Desmontar y lavar las piezas tras cada uso"],
    relatedProducts: ["bateria-de-cocina", "frescaflow"],
    availabilityByRegion: [{ country: "Estados Unidos", available: true }],
    seo: {
      title: "Extractor de jugos Royal Prestige® | RR All Services",
      description:
        "Extractor de jugos Royal Prestige®: máxima nutrición y menor oxidación de los alimentos.",
    },
    commerce,
    available: true,
    featured: true,
    new: false,
    badges: [],
  },
  {
    id: "product-cuchilleria",
    slug: "cuchilleria",
    sku: null,
    name: "Cuchillería y accesorios Royal Prestige®",
    brand: "Royal Prestige®",
    category: "cocina",
    subcategory: "cuchilleria",
    collection: null,
    shortDescription: "Cuchillos, tabla, tijeras y accesorios para el trabajo diario en la cocina.",
    description:
      "El conjunto de cuchillería y accesorios Royal Prestige® reúne las piezas de corte y apoyo que acompañan a la batería: cuchillos de chef y de mesa, taco de madera, tabla de bambú, tijeras de cocina, chaira y utensilios de servicio.",
    images: [
      {
        src: "/assets/products/cocina-cuchilleria-main.jpg",
        alt: "Cuchillos, tabla de bambú, tijeras y accesorios de cocina Royal Prestige®",
        width: 2048,
        height: 2048,
      },
    ],
    video: null,
    features: [
      "Cuchillos de chef, deshuesador y mesa",
      "Taco de madera para almacenamiento",
      "Tabla de bambú Royal Prestige®",
      "Tijeras de cocina y chaira",
      "Utensilios de servicio",
    ],
    benefits: ["Corte preciso", "Piezas complementarias a la batería", "Organización en la cocina"],
    specifications: [{ label: "Uso", value: "Cocina doméstica" }],
    careInstructions: ["Lavar a mano y secar de inmediato", "Afilar con la chaira periódicamente"],
    relatedProducts: ["bateria-de-cocina", "extractor-de-jugos"],
    availabilityByRegion: [{ country: "Estados Unidos", available: true }],
    seo: {
      title: "Cuchillería Royal Prestige® | RR All Services",
      description: "Cuchillos y accesorios de cocina Royal Prestige®.",
    },
    commerce,
    available: true,
    featured: false,
    new: false,
    badges: [],
  },
  {
    id: "product-filtracion-aire",
    slug: "filtracion-aire",
    sku: null,
    name: "Sistema de filtración de aire Royal Prestige®",
    brand: "Royal Prestige®",
    category: "hogar",
    subcategory: "filtracion-de-aire",
    collection: null,
    shortDescription: "Purificación del aire para las áreas donde la familia pasa más tiempo.",
    description:
      "El sistema de filtración de aire Royal Prestige® trabaja de forma continua sobre las impurezas invisibles que circulan dentro del hogar. Está pensado para las habitaciones donde la familia pasa más tiempo, con el objetivo de mantener un ambiente renovado y un descanso sin interrupciones por alergias o pesadez en el ambiente.",
    images: [
      {
        src: "/assets/products/hogar-aire-main.jpg",
        alt: "Sistema de filtración de aire Royal Prestige® en funcionamiento",
        width: 1024,
        height: 1280,
      },
      {
        src: "/assets/products/hogar-aire-hogar.jpg",
        alt: "Sistema de filtración de aire integrado en la sala de una vivienda",
        width: 1024,
        height: 1280,
      },
      {
        src: "/assets/products/hogar-aire-familia.jpg",
        alt: "Familia compartiendo en una sala con el sistema de filtración de aire",
        width: 1024,
        height: 1280,
      },
    ],
    video: null,
    features: [
      "Filtración continua de impurezas en suspensión",
      "Panel de control con mando a distancia",
      "Pensado para dormitorios y áreas de estar",
      "Funcionamiento discreto",
    ],
    benefits: [
      "Ambiente más limpio",
      "Descanso sin interrupciones",
      "Tranquilidad para la familia",
    ],
    specifications: [
      { label: "Uso", value: "Interior doméstico" },
      { label: "Control", value: "Panel frontal y mando a distancia" },
    ],
    careInstructions: ["Reemplazo de filtros según las indicaciones del fabricante"],
    relatedProducts: ["frescaflow", "frescapure"],
    availabilityByRegion: [{ country: "Estados Unidos", available: true }],
    seo: {
      title: "Sistema de filtración de aire Royal Prestige® | RR All Services",
      description: "Filtración de aire Royal Prestige® para el hogar.",
    },
    commerce,
    available: true,
    featured: true,
    new: false,
    badges: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const related = product.relatedProducts
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => Boolean(p));

  // Completa con otros productos cuando la lista declarada no alcanza.
  const fallback = products.filter(
    (p) => p.id !== product.id && !related.some((r) => r.id === p.id),
  );

  return [...related, ...fallback].slice(0, limit);
}
