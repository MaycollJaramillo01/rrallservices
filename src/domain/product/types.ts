export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductCommerce {
  purchasable: boolean;
  price: string | null;
  compareAtPrice: string | null;
  currency: string | null;
  inventory: number | null;
  variants: string[];
}

export interface ProductSEOData {
  title: string;
  description: string;
  keywords?: string[];
}

export interface ProductAvailability {
  country: string;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand: string;
  category: string;
  subcategory: string | null;
  collection: string | null;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  video: string | null;
  features: string[];
  benefits: string[];
  specifications: ProductSpecification[];
  careInstructions: string[];
  relatedProducts: string[];
  availabilityByRegion: ProductAvailability[];
  seo: ProductSEOData;
  commerce: ProductCommerce;
  available: boolean;
  featured: boolean;
  new: boolean;
  badges: string[];
}
