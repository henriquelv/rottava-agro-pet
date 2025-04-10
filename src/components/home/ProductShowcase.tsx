'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CaretRight } from 'phosphor-react'
import { formatPrice } from '@/utils/format'
import { ensureProductImage } from '@/utils/ensureProductImages'

interface Product {
  id: string
  nome: string
  preco: number
  preco_promocional?: number | null
  em_promocao: boolean
  imagem_url: string
  categoria: string
  descricao: string
}

interface ProductShowcaseProps {
  title: string
  category: string
  subcategory?: string
}

export function ProductShowcase({ title, category, subcategory }: ProductShowcaseProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Função para buscar produtos da API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/produtos');
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        
        const data = await response.json();
        
        // Filtra produtos por categoria
        const filteredProducts = data.filter((product: Product) => 
          product.categoria.toLowerCase() === category.toLowerCase() ||
          (subcategory && product.categoria.toLowerCase().includes(subcategory.toLowerCase()))
        ).slice(0, 4); // Limita a 4 produtos
        
        // Para cada produto, garante que a imagem foi baixada localmente
        const productsWithLocalImages = await Promise.all(
          filteredProducts.map(async (product: Product) => {
            // Apenas tenta baixar se for uma URL externa
            if (product.imagem_url && product.imagem_url.startsWith('http')) {
              try {
                const localImageUrl = await ensureProductImage(product);
                return { ...product, imagem_url: localImageUrl };
              } catch (error) {
                console.error(`Erro ao processar imagem para produto ${product.id}:`, error);
                return product;
              }
            }
            return product;
          })
        );
        
        setProducts(productsWithLocalImages);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, subcategory]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6 w-1/4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-300 aspect-square"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Link 
          href={`/produtos?categoria=${category}${subcategory ? `&subcategoria=${subcategory}` : ''}`}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          Ver todos
          <CaretRight className="ml-1" weight="bold" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/produtos/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={product.imagem_url || '/images/fallback-image.jpg'}
                  alt={product.nome}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/images/fallback-image.jpg';
                  }}
                />
                {product.em_promocao && product.preco_promocional && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {Math.round(((product.preco - product.preco_promocional) / product.preco) * 100)}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-medium line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.nome}
                </h3>
                {product.em_promocao && product.preco_promocional ? (
                  <div>
                    <span className="text-gray-500 line-through text-sm">
                      {formatPrice(product.preco)}
                    </span>
                    <p className="text-lg font-bold text-red-600">
                      {formatPrice(product.preco_promocional)}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(product.preco)}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 