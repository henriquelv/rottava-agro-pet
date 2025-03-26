export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stockQuantity: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: ProductImage[];
  category: string;
  variants: ProductVariant[];
  brand: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  price?: number;
  compareAtPrice?: number;
  createdAt: string;
  updatedAt: string;
} 