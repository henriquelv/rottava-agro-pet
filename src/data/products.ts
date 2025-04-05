import { Product, Categories } from '@/types/product'

// Produtos
export const products: Product[] = [
  // Rações - Cães - Adulto
  {
    id: 'dal-dog-ad-racas-peq-10',
    name: 'DAL DOG AD RAÇAS PEQ. 10,1 KG',
    description: 'Ração para cães adultos de raças pequenas',
    price: 89.90,
    category: 'racoes',
    subcategory: 'caes',
    subsubcategory: 'adulto',
    brand: 'Dal Dog',
    image: '/images/products/racoes/caes/dal-dog-ad-racas-peq-10.jpg',
    weight: '10,1kg',
    stock: 10,
    rating: 4.5,
    reviewCount: 12
  },
  {
    id: 'dal-dog-ad-racas-peq-25',
    name: 'DAL DOG AD RAÇAS PEQ. 25 KG',
    description: 'Ração para cães adultos de raças pequenas',
    price: 199.90,
    category: 'racoes',
    subcategory: 'caes',
    subsubcategory: 'adulto',
    brand: 'Dal Dog',
    image: '/images/products/racoes/caes/dal-dog-ad-racas-peq-25.jpg',
    weight: '25kg',
    stock: 5,
    rating: 4.5,
    reviewCount: 8
  },
  {
    id: 'dal-dog-ad-rmg-15',
    name: 'Ração DAL DOG AD RMG 15 KG',
    slug: 'dal-dog-ad-rmg-15',
    description: 'Ração Dal Dog para Cães Adultos Raças Médias e Grandes - 15kg',
    price: 89.90,
    compareAtPrice: 99.90,
    images: [
      {
        url: '/products/dal-dog-adulto.png',
        alt: 'Ração Dal Dog para Cães Adultos'
      }
    ],
    category: 'Ração',
    brand: 'Dal Dog',
    rating: 4.5,
    reviewCount: 43,
    stock: 20,
    tags: ['cães', 'ração', 'dal dog']
  },
  {
    id: 'fn-fresh-meat-ad-mini-pq-7',
    name: 'Ração FN FRESH MEAT AD MINI/PQ 7KG',
    slug: 'fn-fresh-meat-ad-mini-pq-7',
    description: 'Ração Farmina N&D Fresh Meat para Cães Adultos Raças Mini e Pequenas - 7kg',
    price: 159.90,
    compareAtPrice: 179.90,
    images: [
      {
        url: '/products/farmina-fresh-meat.png',
        alt: 'Ração Farmina N&D Fresh Meat'
      }
    ],
    category: 'Ração',
    brand: 'Farmina',
    rating: 4.9,
    reviewCount: 76,
    stock: 5,
    tags: ['cães', 'ração', 'farmina']
  },
  {
    id: 'fn-life-ad-port-med-gr-15',
    name: 'FN LIFE AD PORT MED/GR 15KG',
    description: 'Ração Life para cães adultos de porte médio e grande',
    price: 159.90,
    category: 'racoes',
    subcategory: 'caes',
    subsubcategory: 'adulto',
    brand: 'FN Life',
    image: '/images/products/racoes/caes/fn-life-ad-port-med-gr-15.jpg',
    weight: '15kg',
    stock: 6,
    rating: 4.7,
    reviewCount: 18
  },
  {
    id: 'fn-pro-caes-ad-med-gr-15',
    name: 'FN PRO CAES AD MED/GR 15KG',
    description: 'Ração Pro para cães adultos de porte médio e grande',
    price: 179.90,
    category: 'racoes',
    subcategory: 'caes',
    subsubcategory: 'adulto',
    brand: 'FN Pro',
    image: '/images/products/racoes/caes/fn-pro-caes-ad-med-gr-15.jpg',
    weight: '15kg',
    stock: 4,
    rating: 4.9,
    reviewCount: 25
  },
  {
    id: 'golden-caes-adult-carne-15',
    name: 'Ração GOLDEN CAES ADULT CARNE 15 KG',
    slug: 'golden-caes-adult-carne-15',
    description: 'Ração Golden Special Sabor Carne e Arroz para Cães Adultos - 15kg',
    price: 159.90,
    compareAtPrice: 179.90,
    images: [
      {
        url: '/products/golden-special-adult-carne.png',
        alt: 'Ração Golden Special Sabor Carne e Arroz para Cães Adultos'
      }
    ],
    category: 'Ração',
    brand: 'Golden',
    rating: 4.8,
    reviewCount: 89,
    stock: 15,
    tags: ['cães', 'ração', 'golden']
  },
  {
    id: 'golden-caes-adult-frango-20',
    name: 'GOLDEN CAES ADULT FRANGO 20 K',
    description: 'Ração Golden sabor frango para cães adultos',
    price: 199.90,
    category: 'racoes',
    subcategory: 'caes',
    subsubcategory: 'adulto',
    brand: 'Golden',
    image: '/images/products/racoes/caes/golden-caes-adult-frango-20.jpg',
    weight: '20kg',
    stock: 8,
    rating: 4.8,
    reviewCount: 28
  },
  {
    id: 'golden-caes-adult-light-15',
    name: 'GOLDEN CAES ADULT LIGHT 15 KG',
    description: 'Ração Golden Light para cães adultos com tendência a obesidade',
    price: 179.90,
    category: 'racoes',
    subcategory: 'caes',
    subsubcategory: 'adulto',
    brand: 'Golden',
    image: '/images/products/racoes/caes/golden-caes-adult-light-15.jpg',
    weight: '15kg',
    stock: 6,
    rating: 4.7,
    reviewCount: 22
  },
  {
    id: 'golden-caes-adult-senior-15',
    name: 'Ração GOLDEN CAES ADULT SENIOR 15 KG',
    slug: 'golden-caes-adult-senior-15',
    description: 'Ração Golden Special para Cães Adultos Sênior - 15kg',
    price: 169.90,
    compareAtPrice: 189.90,
    images: [
      {
        url: '/products/golden-special-senior.png',
        alt: 'Ração Golden Special para Cães Adultos Sênior'
      }
    ],
    category: 'Ração',
    brand: 'Golden',
    rating: 4.7,
    reviewCount: 64,
    stock: 8,
    tags: ['cães', 'ração', 'golden', 'sênior']
  },
  {
    id: 'premier-formula-caes-filhotes-15',
    name: 'Ração PREMIER FORMULA CAES FILHOTES 15 KG',
    slug: 'premier-formula-caes-filhotes-15',
    description: 'Ração Premier Pet Formula Cães Filhotes Raças Médias e Grandes - 15kg',
    price: 199.90,
    compareAtPrice: 219.90,
    images: [
      {
        url: '/products/premier-formula-filhotes.png',
        alt: 'Ração Premier Pet Formula Cães Filhotes'
      }
    ],
    category: 'Ração',
    brand: 'Premier',
    rating: 4.9,
    reviewCount: 127,
    stock: 12,
    tags: ['cães', 'ração', 'premier', 'filhotes']
  }
];

// Categorias principais
export const categories: Categories = {
  racoes: {
    name: 'Rações',
    icone: 'Package',
    subcategories: {
      caes: {
        name: 'Cães',
        subsubcategories: ['adulto', 'filhotes', 'senior']
      },
      gatos: {
        name: 'Gatos',
        subsubcategories: ['adulto', 'castrados', 'filhotes']
      },
      passaros: {
        name: 'Pássaros',
        subsubcategories: ['calopsita', 'periquito', 'canario', 'papagaio', 'passaros-livres']
      },
      roedores: {
        name: 'Roedores',
        subsubcategories: ['hamster']
      }
    }
  },
  veterinaria: {
    name: 'Veterinária',
    icone: 'FirstAid',
    subcategories: {
      caes_gatos: {
        name: 'Cães & Gatos',
        subsubcategories: [
          'anti-pulgas-carrapatos',
          'vermifugos',
          'anti-inflamatorios',
          'suplementos',
          'antibioticos',
          'outros'
        ]
      },
      passaros: {
        name: 'Pássaros',
        subsubcategories: ['suplementos']
      }
    }
  },
  acessorios: {
    name: 'Acessórios & Brinquedos',
    subcategories: {
      caes: {
        name: 'Cães',
        subsubcategories: ['camas', 'coleiras-peitorais', 'brinquedos']
      },
      gatos: {
        name: 'Gatos',
        subsubcategories: ['brinquedos', 'arranhadores-ninhos']
      },
      passaros: {
        name: 'Pássaros',
        subsubcategories: ['gaiolas-acessorios']
      }
    }
  },
  higiene: {
    name: 'Higiene & Limpeza',
    subcategories: {
      caes_gatos: {
        name: 'Cães & Gatos',
        subsubcategories: ['granulados', 'tapetes', 'shampoos']
      }
    }
  },
  petiscos: {
    name: 'Petiscos & Ossos',
    subcategories: {
      caes: {
        name: 'Cães',
        subsubcategories: ['petiscos', 'biscoitos']
      },
      gatos: {
        name: 'Gatos',
        subsubcategories: ['petiscos']
      }
    }
  },
  outros: {
    name: 'Outros',
    subcategories: {
      roedores: {
        name: 'Roedores',
        subsubcategories: ['feno', 'maravalha']
      }
    }
  }
} 