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
  subcategory?: string;
  subsubcategory?: string;
  variants: ProductVariant[];
  brand: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  price?: number;
  compareAtPrice?: number;
  createdAt: string;
  updatedAt: string;
  stock: number;
  image?: string;
  weight?: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface StockMovement {
  id: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  product: Product;
  variant?: ProductVariant;
  reason?: string;
  reference?: string;
  cost?: number;
  location?: string;
  supplier?: {
    id: string;
    name: string;
  };
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
  };
}

export interface StockTransfer {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  fromLocation: string;
  toLocation: string;
  status: 'pending' | 'in_transit' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  createdBy: {
    id: string;
    name: string;
  };
}

export interface Supplier {
  id: string;
  name: string;
  code?: string;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductLocation {
  id: string;
  name: string;
  code?: string;
  type: 'warehouse' | 'store' | 'supplier';
  address?: string;
  products?: {
    product: Product;
    quantity: number;
  }[];
}

export interface SubCategory {
  name: string;
  subsubcategories: string[];
}

export interface Category {
  name: string;
  icone: string;
  subcategories: {
    [key: string]: SubCategory;
  };
}

export interface Categories {
  [key: string]: Category;
} 