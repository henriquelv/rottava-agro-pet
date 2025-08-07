'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import prisma from '@/lib/prisma';
import { useCart } from '@/hooks/useCart';

export async function getServerSideProps() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    take: 6,
    include: { variants: true },
  });
  return {
    props: { categories, products },
  };
}

export default function Home({ categories, products }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addItem, removeItem, items } = useCart();

  const availableProducts = products.filter((product) =>
    product.variants?.some((v) => v.stockQuantity > 0)
  );

  const filteredProducts = selectedCategory
    ? availableProducts.filter(
        (product) => product.categoryId === selectedCategory.id
      )
    : availableProducts;

  const recommendedProducts = [...availableProducts]
    .sort((a, b) => {
      const stockA = a.variants?.reduce(
        (sum, v) => sum + v.stockQuantity,
        0
      );
      const stockB = b.variants?.reduce(
        (sum, v) => sum + v.stockQuantity,
        0
      );
      return (stockB || 0) - (stockA || 0);
    })
    .slice(0, 4);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 mt-24">
        <h1 className="text-2xl font-bold mb-4">Categorias</h1>
        <div className="flex space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${selectedCategory?.id === category.id ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4">Produtos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const stock = product.variants?.reduce(
              (sum, v) => sum + v.stockQuantity,
              0
            );
            const inCart = items.find((i) => i.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">Estoque: {stock}</p>
                <p className="text-gray-700 mb-2">{product.price}</p>
                <div className="flex gap-2">
                  <button
                    disabled={!stock}
                    onClick={() =>
                      addItem({
                        id: product.id,
                        nome: product.name,
                        preco: product.price,
                        imagem: product.imageUrl || '',
                        stock,
                      })
                    }
                    className={`flex-1 py-1 rounded ${!stock ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark'}`}
                  >
                    Adicionar
                  </button>
                  {inCart && (
                    <button
                      onClick={() => removeItem(product.id)}
                      className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Remover
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {recommendedProducts.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-10 mb-4">Recomendados</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
                >
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-700">{product.price}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
