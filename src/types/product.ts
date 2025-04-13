export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  detailedDescription?: string;
  features?: string[];
  sizes?: string[];
  colors?: ProductColor[];
  material?: string;
  care?: string[];
  images?: string[];
  rating?: number;
  reviewCount?: number;
  stock?: number;
  sku?: string;
  relatedProducts?: number[];
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpful?: number;
  verified?: boolean;
}
