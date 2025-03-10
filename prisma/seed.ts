import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    name: 'Ração Premium para Cães Adultos',
    slug: 'racao-premium-caes-adultos',
    description: 'Ração super premium formulada para cães adultos de porte médio. Contém proteínas de alta qualidade, ômega-3 e ômega-6 para pele e pelagem saudáveis, além de antioxidantes para fortalecer o sistema imunológico. Ideal para cães ativos e saudáveis.',
    category: 'Ração para Cães',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,cachorro,adulto,premium',
    images: [
      {
        url: '/products/racao-premium-caes-adultos.jpg',
        alt: 'Ração Premium para Cães Adultos',
        isMain: true
      }
    ],
    variants: [
      {
        name: '10kg',
        price: 120.00,
        sku: 'RAC-PREM-10KG',
        stockQuantity: 50
      }
    ]
  },
  {
    name: 'Ração Light para Cães',
    slug: 'racao-light-caes',
    description: 'Ração desenvolvida para cães acima do peso ou com tendência à obesidade. Possui baixo teor de gordura e calorias, mas mantém todos os nutrientes essenciais. Auxilia no controle de peso e na manutenção da saúde articular.',
    category: 'Ração para Cães',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,cachorro,light,dieta',
    images: [
      {
        url: '/products/racao-light-caes.jpg',
        alt: 'Ração Light para Cães',
        isMain: true
      }
    ],
    variants: [
      {
        name: '15kg',
        price: 150.00,
        sku: 'RAC-LIGHT-15KG',
        stockQuantity: 40
      }
    ]
  },
  {
    name: 'Ração Filhotes Raças Pequenas',
    slug: 'racao-filhotes-racas-pequenas',
    description: 'Ração específica para filhotes de raças pequenas, com croquetes menores para facilitar a mastigação. Rica em DHA para o desenvolvimento cerebral e proteínas para o crescimento saudável dos músculos e ossos.',
    category: 'Ração para Cães',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,cachorro,filhote,raças pequenas',
    images: [
      {
        url: '/products/racao-filhotes-racas-pequenas.jpg',
        alt: 'Ração Filhotes Raças Pequenas',
        isMain: true
      }
    ],
    variants: [
      {
        name: '3kg',
        price: 45.00,
        sku: 'RAC-FILH-3KG',
        stockQuantity: 60
      }
    ]
  },
  {
    name: 'Ração para Coelhos com Problemas Dentários',
    slug: 'racao-coelhos-problemas-dentarios',
    description: 'Ração para coelhos com dentes sensíveis',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,coelho,problemas dentários,sensível',
    images: [
      {
        url: '/products/racao-coelhos-problemas-dentarios.jpg',
        alt: 'Ração para Coelhos com Problemas Dentários',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1kg',
        price: 25.00,
        sku: 'RAC-COEL-DENT-1KG',
        stockQuantity: 30
      }
    ]
  },
  {
    name: 'Ração Senior para Cães',
    slug: 'racao-senior-caes',
    description: 'Ração para cães idosos, com nutrientes essenciais',
    category: 'Ração para Cães',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,cachorro,senior,idoso',
    images: [
      {
        url: '/products/racao-senior-caes.jpg',
        alt: 'Ração Senior para Cães',
        isMain: true
      }
    ],
    variants: [
      {
        name: '12kg',
        price: 130.00,
        sku: 'RAC-SEN-12KG',
        stockQuantity: 35
      }
    ]
  },
  {
    name: 'Ração para Gatos Castrados',
    slug: 'racao-gatos-castrados',
    description: 'Ração para gatos castrados, controle de peso',
    category: 'Ração para Gatos',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,gato,castrado,controle de peso',
    images: [
      {
        url: '/products/racao-gatos-castrados.jpg',
        alt: 'Ração para Gatos Castrados',
        isMain: true
      }
    ],
    variants: [
      {
        name: '5kg',
        price: 80.00,
        sku: 'RAC-GAT-CAST-5KG',
        stockQuantity: 45
      }
    ]
  },
  {
    name: 'Ração para Gatos Filhotes',
    slug: 'racao-gatos-filhotes',
    description: 'Ração rica em proteínas para gatos filhotes',
    category: 'Ração para Gatos',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,gato,filhote,proteína',
    images: [
      {
        url: '/products/racao-gatos-filhotes.jpg',
        alt: 'Ração para Gatos Filhotes',
        isMain: true
      }
    ],
    variants: [
      {
        name: '2kg',
        price: 40.00,
        sku: 'RAC-GAT-FIL-2KG',
        stockQuantity: 55
      }
    ]
  },
  {
    name: 'Ração para Gatos Sensíveis',
    slug: 'racao-gatos-sensiveis',
    description: 'Ração hipoalergênica para gatos com sensibilidade',
    category: 'Ração para Gatos',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,gato,sensível,hipoalergênico',
    images: [
      {
        url: '/products/racao-gatos-sensiveis.jpg',
        alt: 'Ração para Gatos Sensíveis',
        isMain: true
      }
    ],
    variants: [
      {
        name: '7kg',
        price: 90.00,
        sku: 'RAC-GAT-SENS-7KG',
        stockQuantity: 40
      }
    ]
  },
  {
    name: 'Ração para Pássaros Canários',
    slug: 'racao-passaros-canarios',
    description: 'Ração enriquecida com vitaminas para canários',
    category: 'Ração para Pássaros',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,pássaro,canário,vitaminas',
    images: [
      {
        url: '/products/racao-passaros-canarios.jpg',
        alt: 'Ração para Pássaros Canários',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1kg',
        price: 20.00,
        sku: 'RAC-PAS-CAN-1KG',
        stockQuantity: 60
      }
    ]
  },
  {
    name: 'Ração para Pássaros Calopsitas',
    slug: 'racao-passaros-calopsitas',
    description: 'Ração balanceada para calopsitas, com mistura de sementes, grãos e nutrientes essenciais. Ajuda a manter a saúde das penas, o sistema imunológico e a energia do pássaro.',
    category: 'Ração para Pássaros',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,pássaro,calopsita',
    images: [
      {
        url: '/products/racao-passaros-calopsitas.jpg',
        alt: 'Ração para Pássaros Calopsitas',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1kg',
        price: 25.00,
        sku: 'RAC-PAS-CAL-1KG',
        stockQuantity: 50
      }
    ]
  },
  {
    name: 'Ração para Pássaros Silvestres',
    slug: 'racao-passaros-silvestres',
    description: 'Ração completa para pássaros silvestres de pequeno porte, com sementes, frutas desidratadas e vitaminas. Ideal para manter a saúde e a vitalidade dos pássaros.',
    category: 'Ração para Pássaros',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,pássaro,silvestre',
    images: [
      {
        url: '/products/racao-passaros-silvestres.jpg',
        alt: 'Ração para Pássaros Silvestres',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1kg',
        price: 18.00,
        sku: 'RAC-PAS-SIL-1KG',
        stockQuantity: 70
      }
    ]
  },
  {
    name: 'Ração para Peixes Tropicais',
    slug: 'racao-peixes-tropicais',
    description: 'Ração em flocos para peixes tropicais, com alta digestibilidade e nutrientes essenciais. Mantém as cores vibrantes e a saúde dos peixes.',
    category: 'Ração para Peixes',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,peixe,tropical,flocos',
    images: [
      {
        url: '/products/racao-peixes-tropicais.jpg',
        alt: 'Ração para Peixes Tropicais',
        isMain: true
      }
    ],
    variants: [
      {
        name: '500g',
        price: 15.00,
        sku: 'RAC-PEI-TRO-500G',
        stockQuantity: 80
      }
    ]
  },
  {
    name: 'Ração para Peixes de Água Fria',
    slug: 'racao-peixes-agua-fria',
    description: 'Ração em grãos para peixes de água fria, como kinguios e carpas. Contém proteínas e vitaminas para promover o crescimento e a saúde dos peixes.',
    category: 'Ração para Peixes',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,peixe,água fria,grãos',
    images: [
      {
        url: '/products/racao-peixes-agua-fria.jpg',
        alt: 'Ração para Peixes de Água Fria',
        isMain: true
      }
    ],
    variants: [
      {
        name: '500g',
        price: 12.00,
        sku: 'RAC-PEI-FRI-500G',
        stockQuantity: 75
      }
    ]
  },
  {
    name: 'Ração para Coelhos',
    slug: 'racao-coelhos',
    description: 'Ração com alto teor de fibras para coelhos, feita com ingredientes naturais como feno, vegetais e grãos. Promove a saúde digestiva e dental.',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,coelho,fibras',
    images: [
      {
        url: '/products/racao-coelhos.jpg',
        alt: 'Ração para Coelhos',
        isMain: true
      }
    ],
    variants: [
      {
        name: '2kg',
        price: 30.00,
        sku: 'RAC-COE-2KG',
        stockQuantity: 45
      }
    ]
  },
  {
    name: 'Ração para Hamsters',
    slug: 'racao-hamsters',
    description: 'Ração balanceada para hamsters, com mistura de sementes, grãos e frutas desidratadas. Proporciona uma dieta completa e nutritiva.',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,hamster,balanceada',
    images: [
      {
        url: '/products/racao-hamsters.jpg',
        alt: 'Ração para Hamsters',
        isMain: true
      }
    ],
    variants: [
      {
        name: '500g',
        price: 10.00,
        sku: 'RAC-HAM-500G',
        stockQuantity: 60
      }
    ]
  },
  {
    name: 'Ração para Porquinhos-da-Índia',
    slug: 'racao-porquinhos-india',
    description: 'Ração enriquecida com vitamina C',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,porquinho da índia,vitamina c',
    images: [
      {
        url: '/products/racao-porquinhos-india.jpg',
        alt: 'Ração para Porquinhos-da-Índia',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1kg',
        price: 25.00,
        sku: 'RAC-POR-1KG',
        stockQuantity: 40
      }
    ]
  },
  {
    name: 'Ração para Tartarugas',
    slug: 'racao-tartarugas',
    description: 'Ração em pellets para tartarugas aquáticas',
    category: 'Ração para Répteis',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,tartaruga,aquática,pellets',
    images: [
      {
        url: '/products/racao-tartarugas.jpg',
        alt: 'Ração para Tartarugas',
        isMain: true
      }
    ],
    variants: [
      {
        name: '500g',
        price: 18.00,
        sku: 'RAC-TAR-500G',
        stockQuantity: 35
      }
    ]
  },
  {
    name: 'Ração para Chinchilas',
    slug: 'racao-chinchilas',
    description: 'Ração específica para chinchilas',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,chinchila',
    images: [
      {
        url: '/products/racao-chinchilas.jpg',
        alt: 'Ração para Chinchilas',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1kg',
        price: 35.00,
        sku: 'RAC-CHI-1KG',
        stockQuantity: 30
      }
    ]
  },
  {
    name: 'Ração para Furões',
    slug: 'racao-furoes',
    description: 'Ração rica em proteínas para furões',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,furão,proteína',
    images: [
      {
        url: '/products/racao-furoes.jpg',
        alt: 'Ração para Furões',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1.5kg',
        price: 50.00,
        sku: 'RAC-FUR-1.5KG',
        stockQuantity: 25
      }
    ]
  },
  {
    name: 'Ração para Cães Raças Grandes',
    slug: 'racao-caes-racas-grandes',
    description: 'Ração para cães de raças grandes, com glucosamina',
    category: 'Ração para Cães',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,cachorro,raças grandes,glucosamina',
    images: [
      {
        url: '/products/racao-caes-racas-grandes.jpg',
        alt: 'Ração para Cães Raças Grandes',
        isMain: true
      }
    ],
    variants: [
      {
        name: '20kg',
        price: 200.00,
        sku: 'RAC-CAE-GRA-20KG',
        stockQuantity: 30
      }
    ]
  },
  {
    name: 'Ração para Cães Raças Pequenas',
    slug: 'racao-caes-racas-pequenas',
    description: 'Ração para cães de raças pequenas, croquetes pequenos',
    category: 'Ração para Cães',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,cachorro,raças pequenas,croquetes pequenos',
    images: [
      {
        url: '/products/racao-caes-racas-pequenas.jpg',
        alt: 'Ração para Cães Raças Pequenas',
        isMain: true
      }
    ],
    variants: [
      {
        name: '4kg',
        price: 60.00,
        sku: 'RAC-CAE-PEQ-4KG',
        stockQuantity: 40
      }
    ]
  },
  {
    name: 'Ração para Gatos Sênior',
    slug: 'racao-gatos-senior',
    description: 'Ração para gatos idosos, com ômega-3',
    category: 'Ração para Gatos',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,gato,sênior,ômega-3',
    images: [
      {
        url: '/products/racao-gatos-senior.jpg',
        alt: 'Ração para Gatos Sênior',
        isMain: true
      }
    ],
    variants: [
      {
        name: '3kg',
        price: 70.00,
        sku: 'RAC-GAT-SEN-3KG',
        stockQuantity: 35
      }
    ]
  },
  {
    name: 'Ração para Gatos Urinários',
    slug: 'racao-gatos-urinarios',
    description: 'Ração para saúde do trato urinário',
    category: 'Ração para Gatos',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,gato,urinário,saúde',
    images: [
      {
        url: '/products/racao-gatos-urinarios.jpg',
        alt: 'Ração para Gatos Urinários',
        isMain: true
      }
    ],
    variants: [
      {
        name: '5kg',
        price: 85.00,
        sku: 'RAC-GAT-URI-5KG',
        stockQuantity: 40
      }
    ]
  },
  {
    name: 'Ração para Pássaros Grandes',
    slug: 'racao-passaros-grandes',
    description: 'Ração para papagaios e araras',
    category: 'Ração para Pássaros',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,pássaro,papagaio,arara',
    images: [
      {
        url: '/products/racao-passaros-grandes.jpg',
        alt: 'Ração para Pássaros Grandes',
        isMain: true
      }
    ],
    variants: [
      {
        name: '2kg',
        price: 40.00,
        sku: 'RAC-PAS-GRA-2KG',
        stockQuantity: 30
      }
    ]
  },
  {
    name: 'Ração para Pássaros Exóticos',
    slug: 'racao-passaros-exoticos',
    description: 'Ração para pássaros exóticos de médio porte',
    category: 'Ração para Pássaros',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,pássaro,exótico',
    images: [
      {
        url: '/products/racao-passaros-exoticos.jpg',
        alt: 'Ração para Pássaros Exóticos',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1.5kg',
        price: 35.00,
        sku: 'RAC-PAS-EXO-1.5KG',
        stockQuantity: 25
      }
    ]
  },
  {
    name: 'Ração para Peixes Betta',
    slug: 'racao-peixes-betta',
    description: 'Ração específica para peixes Betta',
    category: 'Ração para Peixes',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,peixe,betta',
    images: [
      {
        url: '/products/racao-peixes-betta.jpg',
        alt: 'Ração para Peixes Betta',
        isMain: true
      }
    ],
    variants: [
      {
        name: '100g',
        price: 8.00,
        sku: 'RAC-PEI-BET-100G',
        stockQuantity: 100
      }
    ]
  },
  {
    name: 'Ração para Peixes Koi',
    slug: 'racao-peixes-koi',
    description: 'Ração em pellets para peixes Koi',
    category: 'Ração para Peixes',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,peixe,koi,pellets',
    images: [
      {
        url: '/products/racao-peixes-koi.jpg',
        alt: 'Ração para Peixes Koi',
        isMain: true
      }
    ],
    variants: [
      {
        name: '5kg',
        price: 120.00,
        sku: 'RAC-PEI-KOI-5KG',
        stockQuantity: 20
      }
    ]
  },
  {
    name: 'Ração para Coelhos Anões',
    slug: 'racao-coelhos-anoes',
    description: 'Ração para coelhos anões, com baixo teor de cálcio',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,coelho,anão,cálcio',
    images: [
      {
        url: '/products/racao-coelhos-anoes.jpg',
        alt: 'Ração para Coelhos Anões',
        isMain: true
      }
    ],
    variants: [
      {
        name: '1kg',
        price: 22.00,
        sku: 'RAC-COE-ANO-1KG',
        stockQuantity: 45
      }
    ]
  },
  {
    name: 'Ração para Ratos',
    slug: 'racao-ratos',
    description: 'Ração balanceada para ratos de estimação',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,rato,balanceada',
    images: [
      {
        url: '/products/racao-ratos.jpg',
        alt: 'Ração para Ratos',
        isMain: true
      }
    ],
    variants: [
      {
        name: '500g',
        price: 15.00,
        sku: 'RAC-RAT-500G',
        stockQuantity: 50
      }
    ]
  },
  {
    name: 'Ração para Esquilos',
    slug: 'racao-esquilos',
    description: 'Ração para esquilos, com nozes e sementes',
    category: 'Ração para Roedores',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,esquilo,nozes,sementes',
    images: [
      {
        url: '/products/racao-esquilos.jpg',
        alt: 'Ração para Esquilos',
        isMain: true
      }
    ],
    variants: [
      {
        name: '500g',
        price: 18.00,
        sku: 'RAC-ESQ-500G',
        stockQuantity: 40
      }
    ]
  },
  {
    name: 'Ração para Iguanas',
    slug: 'racao-iguanas',
    description: 'Ração em pó para iguanas, com vegetais desidratados',
    category: 'Ração para Répteis',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,iguana,vegetais',
    images: [
      {
        url: '/products/racao-iguanas.jpg',
        alt: 'Ração para Iguanas',
        isMain: true
      }
    ],
    variants: [
      {
        name: '300g',
        price: 25.00,
        sku: 'RAC-IGU-300G',
        stockQuantity: 30
      }
    ]
  },
  {
    name: 'Ração para Cães Ativos',
    slug: 'racao-caes-ativos',
    description: 'Ração para cães com alta energia, rica em proteínas',
    category: 'Ração para Cães',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,cachorro,ativo,energia,proteína',
    images: [
      {
        url: '/products/racao-caes-ativos.jpg',
        alt: 'Ração para Cães Ativos',
        isMain: true
      }
    ],
    variants: [
      {
        name: '15kg',
        price: 160.00,
        sku: 'RAC-CAE-ATI-15KG',
        stockQuantity: 35
      }
    ]
  },
  {
    name: 'Ração para Cães com Alergias',
    slug: 'racao-caes-alergias',
    description: 'Ração hipoalergênica para cães com alergias',
    category: 'Ração para Cães',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,cachorro,alergia,hipoalergênico',
    images: [
      {
        url: '/products/racao-caes-alergias.jpg',
        alt: 'Ração para Cães com Alergias',
        isMain: true
      }
    ],
    variants: [
      {
        name: '10kg',
        price: 140.00,
        sku: 'RAC-CAE-ALE-10KG',
        stockQuantity: 30
      }
    ]
  },
  {
    name: 'Ração para Gatos com Pelos Longos',
    slug: 'racao-gatos-pelos-longos',
    description: 'Ração para gatos de pelos longos, com óleo de peixe',
    category: 'Ração para Gatos',
    brand: 'PremiumPet',
    rating: 0,
    reviewCount: 0,
    tags: 'ração,gato,pelos longos,óleo de peixe',
    images: [
      {
        url: '/products/racao-gatos-pelos-longos.jpg',
        alt: 'Ração para Gatos com Pelos Longos',
        isMain: true
      }
    ],
    variants: [
      {
        name: '4kg',
        price: 75.00,
        sku: 'RAC-GAT-PEL-4KG',
        stockQuantity: 35
      }
    ]
  }
]

async function main() {
  // Limpa o banco de dados
  await prisma.productImage.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()

  // Cria os produtos
  for (const product of products) {
    const { images, variants, ...productData } = product
    
    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images
        },
        variants: {
          create: variants
        }
      }
    })
    
    console.log(`Criado produto ${createdProduct.name}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })