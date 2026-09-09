import type { Category } from "@/domain/category/types";

export const categories: Category[] = [
  {
    slug: "cocina",
    name: "Cocina",
    label: "Cocina",
    description: "Batería, extractor de jugos y cuchillería de acero de grado quirúrgico",
    image: {
      src: "/assets/categories/cocina.jpg",
      alt: "Batería de cocina Royal Prestige® en acero inoxidable",
      width: 1080,
      height: 1350,
    },
    productCount: 3,
    order: 1,
  },
  {
    slug: "agua",
    name: "Agua",
    label: "Agua",
    description: "Purificación de agua para beber y filtro para la ducha",
    image: {
      src: "/assets/categories/agua.jpg",
      alt: "Purificador de agua Royal Prestige® FrescaFlow™",
      width: 1080,
      height: 1350,
    },
    productCount: 2,
    order: 2,
  },
  {
    slug: "hogar",
    name: "Hogar",
    label: "Hogar",
    description: "Filtración de aire para las áreas donde vive la familia",
    image: {
      src: "/assets/categories/hogar.jpg",
      alt: "Sistema de filtración de aire Royal Prestige® en el hogar",
      width: 1024,
      height: 1280,
    },
    productCount: 1,
    order: 3,
  },
];
