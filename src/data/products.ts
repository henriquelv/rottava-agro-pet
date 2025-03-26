export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: {
    url: string;
    alt: string;
  }[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  stock: number;
  minStock: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Ração Premium para Cães Adultos',
    slug: 'racao-premium-caes-adultos',
    description: 'Ração premium para cães adultos de todas as raças. Contém nutrientes essenciais para a saúde do seu pet.',
    price: 129.90,
    compareAtPrice: 149.90,
    images: [
      {
        url: '/products/racao-caes.jpg',
        alt: 'Ração para cães'
      }
    ],
    category: 'Ração',
    brand: 'PetNutri',
    rating: 4.8,
    reviewCount: 124,
    tags: ['cães', 'ração', 'premium'],
    stock: 45,
    minStock: 10
  },
  {
    id: '2',
    name: 'Ração para Gatos Castrados',
    slug: 'racao-gatos-castrados',
    description: 'Ração especial para gatos castrados. Ajuda a manter o peso ideal e a saúde do seu felino.',
    price: 89.90,
    compareAtPrice: 99.90,
    images: [
      {
        url: '/products/racao-gatos.jpg',
        alt: 'Ração para gatos'
      }
    ],
    category: 'Ração',
    brand: 'CatLife',
    rating: 4.7,
    reviewCount: 98,
    tags: ['gatos', 'ração', 'castrados'],
    stock: 38,
    minStock: 8
  },
  {
    id: '3',
    name: 'Antipulgas e Carrapatos para Cães',
    slug: 'antipulgas-carrapatos-caes',
    description: 'Proteção eficaz contra pulgas e carrapatos para cães de 10 a 20kg. Duração de 3 meses.',
    price: 79.90,
    images: [
      {
        url: '/products/antipulgas.jpg',
        alt: 'Antipulgas para cães'
      }
    ],
    category: 'Medicamentos',
    brand: 'PetProtect',
    rating: 4.9,
    reviewCount: 156,
    tags: ['cães', 'antipulgas', 'carrapatos', 'medicamentos'],
    stock: 25,
    minStock: 5
  },
  {
    id: '4',
    name: 'Coleira Ajustável para Cães',
    slug: 'coleira-ajustavel-caes',
    description: 'Coleira ajustável de nylon resistente para cães de porte médio. Disponível em várias cores.',
    price: 39.90,
    compareAtPrice: 49.90,
    images: [
      {
        url: '/products/coleira.jpg',
        alt: 'Coleira para cães'
      }
    ],
    category: 'Acessórios',
    brand: 'PetStyle',
    rating: 4.5,
    reviewCount: 87,
    tags: ['cães', 'coleira', 'acessórios'],
    stock: 60,
    minStock: 10
  },
  {
    id: '5',
    name: 'Shampoo Hidratante para Pets',
    slug: 'shampoo-hidratante-pets',
    description: 'Shampoo hidratante para cães e gatos. Limpa e hidrata o pelo, deixando-o macio e brilhante.',
    price: 29.90,
    images: [
      {
        url: '/products/shampoo.jpg',
        alt: 'Shampoo para pets'
      }
    ],
    category: 'Higiene',
    brand: 'PetClean',
    rating: 4.6,
    reviewCount: 112,
    tags: ['cães', 'gatos', 'shampoo', 'higiene'],
    stock: 42,
    minStock: 8
  },
  {
    id: '6',
    name: 'Brinquedo Interativo para Cães',
    slug: 'brinquedo-interativo-caes',
    description: 'Brinquedo interativo que estimula a inteligência do seu cão. Ideal para todas as raças.',
    price: 49.90,
    compareAtPrice: 59.90,
    images: [
      {
        url: '/products/brinquedo.jpg',
        alt: 'Brinquedo para cães'
      }
    ],
    category: 'Brinquedos',
    brand: 'PetFun',
    rating: 4.7,
    reviewCount: 76,
    tags: ['cães', 'brinquedos', 'interativo'],
    stock: 30,
    minStock: 5
  },
  {
    id: '7',
    name: 'Ração para Filhotes de Cães',
    slug: 'racao-filhotes-caes',
    description: 'Ração especial para filhotes de cães. Rica em nutrientes essenciais para o desenvolvimento saudável.',
    price: 119.90,
    compareAtPrice: 139.90,
    images: [
      {
        url: '/products/racao-filhotes.jpg',
        alt: 'Ração para filhotes'
      }
    ],
    category: 'Ração',
    brand: 'PetNutri',
    rating: 4.9,
    reviewCount: 134,
    tags: ['cães', 'filhotes', 'ração'],
    stock: 35,
    minStock: 7
  },
  {
    id: '8',
    name: 'Cama para Pets',
    slug: 'cama-pets',
    description: 'Cama confortável para cães e gatos. Tecido macio e lavável, ideal para o descanso do seu pet.',
    price: 89.90,
    compareAtPrice: 109.90,
    images: [
      {
        url: '/products/cama.jpg',
        alt: 'Cama para pets'
      }
    ],
    category: 'Acessórios',
    brand: 'PetHome',
    rating: 4.8,
    reviewCount: 92,
    tags: ['cães', 'gatos', 'cama', 'acessórios'],
    stock: 20,
    minStock: 4
  }
]; 