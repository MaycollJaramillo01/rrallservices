export interface Category {
  slug: string;
  name: string;
  label: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  productCount: number;
  order: number;
}
