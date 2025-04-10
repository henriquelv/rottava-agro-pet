import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

interface CategoriaPageProps {
  params: {
    slug: string
  }
}

interface Produto {
  codigo: string;
  nome: string;
  slug: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagem: string;
}

const CATEGORIAS = {
  'cao': {
    nome: 'Produtos para Cães',
    slug: 'cao',
    descricao: 'Encontre aqui tudo para o seu melhor amigo: rações, acessórios, brinquedos e muito mais!'
  },
  'gato': {
    nome: 'Produtos para Gatos',
    slug: 'gato',
    descricao: 'Alimentos premium, camas confortáveis, arranhadores e todos os produtos para o bem-estar do seu felino.'
  },
  'acessorios': {
    nome: 'Acessórios Pet',
    slug: 'acessorios',
    descricao: 'Coleiras, guias, camas, comedouros, bebedouros e muito mais para o seu pet.'
  },
  'higiene': {
    nome: 'Higiene e Bem-estar',
    slug: 'higiene',
    descricao: 'Produtos para banho, tosa, limpeza dental e todo o cuidado que seu pet merece.'
  }
};

// Função para carregar os produtos do arquivo JSON
function getProdutos(): Produto[] {
  try {
    const filePath = path.join(process.cwd(), 'src/data/produtos.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
}

export async function generateMetadata({ params }: CategoriaPageProps): Promise<Metadata> {
  const categoria = CATEGORIAS[params.slug as keyof typeof CATEGORIAS];

  if (!categoria) {
    return {
      title: 'Categoria não encontrada | Rottava Agro Pet',
      description: 'Categoria não encontrada'
    }
  }

  return {
    title: `${categoria.nome} | Rottava Agro Pet`,
    description: categoria.descricao
  }
}

export default function CategoriaPage({ params }: CategoriaPageProps) {
  // Obter a categoria
  const categoria = CATEGORIAS[params.slug as keyof typeof CATEGORIAS];
  
  if (!categoria) {
    notFound();
  }

  // Carregar todos os produtos e filtrar pela categoria atual
  const todosProdutos = getProdutos();
  const produtosDaCategoria = todosProdutos.filter(
    produto => produto.categoria.toLowerCase() === params.slug.toLowerCase() ||
               (params.slug === 'cao' && produto.categoria.toLowerCase().includes('cao'))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-green-700">{categoria.nome}</h1>
      <p className="text-gray-600 mb-8">{categoria.descricao}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtosDaCategoria.map((produto) => (
          <Link href={`/produtos/${produto.codigo}`} key={produto.codigo} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow p-4 border border-gray-100">
              <div className="relative h-48 w-full mb-4 bg-gray-50 rounded-lg overflow-hidden">
                <Image 
                  src={produto.imagem || '/images/placeholder.jpg'} 
                  alt={produto.nome}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">{produto.nome}</h2>
              <p className="text-green-700 font-bold">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {produtosDaCategoria.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">Nenhum produto encontrado nesta categoria.</p>
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
            Voltar para a página inicial
          </Link>
        </div>
      )}
    </div>
  )
} 