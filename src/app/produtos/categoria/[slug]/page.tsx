import React from 'react';
import { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import { notFound } from 'next/navigation';

interface Produto {
  codigo: string;
  nome: string;
  slug: string;
  categoria: string;
  descricao: string;
  preco: number;
  preco_promocional?: number;
  imagem: string;
}

interface Categoria {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  imagem: string;
  produtos: Produto[];
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Buscar dados da categoria pelo slug
async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/categorias/${slug}`, { 
      cache: 'no-store' 
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    return null;
  }
}

// Gerar metadados dinamicamente
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoria = await getCategoriaBySlug(params.slug);
  
  if (!categoria) {
    return {
      title: 'Categoria não encontrada',
      description: 'A categoria que você está procurando não foi encontrada.'
    };
  }
  
  return {
    title: `${categoria.nome} | Rottava Agro Pet`,
    description: categoria.descricao,
    openGraph: {
      title: `${categoria.nome} | Rottava Agro Pet`,
      description: categoria.descricao,
      images: [{ url: categoria.imagem || '/images/og-image.jpg' }]
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoria = await getCategoriaBySlug(params.slug);
  
  if (!categoria) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{categoria.nome}</h1>
        <p className="mt-2 text-gray-600">{categoria.descricao}</p>
      </header>
      
      {categoria.produtos.length > 0 ? (
        <ProductGrid produtos={categoria.produtos} />
      ) : (
        <div className="py-8 text-center">
          <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
        </div>
      )}
    </div>
  );
} 