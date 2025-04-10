'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Heart, Share } from 'phosphor-react'
import { toast } from 'sonner'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ensureProductImage } from '@/utils/ensureProductImages'
import type { Metadata, ResolvingMetadata } from 'next'
import fs from 'fs'
import path from 'path'
import AddToCartButton from '@/components/buttons/AddToCartButton'

interface ProdutoPageProps {
  params: {
    id: string
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

// Função para encontrar um produto pelo código
function getProdutoPorCodigo(codigo: string): Produto | undefined {
  const produtos = getProdutos();
  return produtos.find(produto => produto.codigo === codigo);
}

export async function generateMetadata({ params }: ProdutoPageProps): Promise<Metadata> {
  const produto = getProdutoPorCodigo(params.id);

  if (!produto) {
    return {
      title: 'Produto não encontrado | Rottava Agro Pet',
      description: 'Produto não encontrado'
    };
  }

  return {
    title: `${produto.nome} | Rottava Agro Pet`,
    description: produto.descricao.substring(0, 160),
    openGraph: {
      title: produto.nome,
      description: produto.descricao.substring(0, 160),
      images: [produto.imagem || '/images/placeholder.jpg'],
    },
  };
}

export default function ProdutoPage({ params }: ProdutoPageProps) {
  const produto = getProdutoPorCodigo(params.id);

  if (!produto) {
    notFound();
  }

  // Obter produtos relacionados (mesma categoria)
  const todosProdutos = getProdutos();
  const produtosRelacionados = todosProdutos
    .filter(p => p.categoria === produto.categoria && p.codigo !== produto.codigo)
    .slice(0, 4); // Limitar a 4 produtos relacionados

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* Imagem do produto */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 aspect-square relative overflow-hidden">
            <Image
              src={produto.imagem || '/images/placeholder.jpg'}
              alt={produto.nome}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
        </div>

        {/* Detalhes do produto */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full">
            <div className="mb-6">
              <Link 
                href={`/produtos/categoria/${produto.categoria.toLowerCase()}`}
                className="text-green-600 hover:text-green-700 text-sm mb-2 inline-block"
              >
                {produto.categoria}
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{produto.nome}</h1>
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-green-600">
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Descrição</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{produto.descricao}</p>
            </div>

            {/* Botão de adicionar ao carrinho */}
            <div className="mt-auto">
              <AddToCartButton produto={produto} />
              
              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Código:</span> {produto.codigo}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Disponibilidade:</span> Em estoque
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos relacionados */}
      {produtosRelacionados.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Produtos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosRelacionados.map((produtoRelacionado) => (
              <Link href={`/produtos/${produtoRelacionado.codigo}`} key={produtoRelacionado.codigo} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow p-4 border border-gray-100">
                  <div className="relative h-40 w-full mb-4 bg-gray-50 rounded-lg overflow-hidden">
                    <Image 
                      src={produtoRelacionado.imagem || '/images/placeholder.jpg'} 
                      alt={produtoRelacionado.nome}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">{produtoRelacionado.nome}</h3>
                  <p className="text-green-700 font-bold">
                    R$ {produtoRelacionado.preco.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 