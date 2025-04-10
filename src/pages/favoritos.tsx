import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useCart } from '../context/CartContext';
import { HeartIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  preco_promocional?: number;
  em_promocao: boolean;
  descricao: string;
  imagem_url: string;
  quantidade_disponivel: number;
  categoria: string;
  marca: string;
}

const FavoritosPage: React.FC = () => {
  const { favorites, removeFromFavorites, addToCart } = useCart();
  const [favoriteProdutos, setFavoriteProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setFavoriteProdutos([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(`/api/produtos`);
        const allProdutos = await res.json();
        
        // Filtrar apenas os produtos marcados como favoritos
        const favoriteItems = allProdutos.filter(
          (produto: Produto) => favorites.some(fav => fav.id === produto.id)
        );
        
        setFavoriteProdutos(favoriteItems);
      } catch (error) {
        console.error('Erro ao buscar produtos favoritos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  const handleAddToCart = (produto: Produto) => {
    if (produto.quantidade_disponivel <= 0) {
      return;
    }

    const precoAtual = produto.em_promocao && produto.preco_promocional 
      ? produto.preco_promocional 
      : produto.preco;

    addToCart({
      id: produto.id,
      name: produto.nome,
      price: precoAtual,
      quantity: 1
    });
  };

  const handleRemoveFavorite = (id: string) => {
    removeFromFavorites(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Meus Favoritos | Rottava Agro Pet</title>
        <meta name="description" content="Produtos favoritos na Rottava Agro Pet." />
      </Head>
      
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Navegação */}
          <div className="mb-6">
            <Link href="/">
              <a className="text-blue-600 hover:underline">Voltar para a loja</a>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <HeartIconSolid className="h-6 w-6 text-red-500 mr-2" />
              <h1 className="text-2xl font-bold">Meus Favoritos</h1>
            </div>
            
            {favoriteProdutos.length === 0 ? (
              <div className="text-center py-10">
                <HeartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-500 mb-2">Nenhum favorito ainda</h2>
                <p className="text-gray-500 mb-6">Você ainda não adicionou produtos aos seus favoritos</p>
                <Link href="/">
                  <a className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Explorar produtos
                  </a>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProdutos.map((produto) => (
                  <div key={produto.id} className="border rounded-lg overflow-hidden bg-white">
                    <div className="relative">
                      <Link href={`/produtos/${produto.id}`}>
                        <a>
                          <img 
                            src={produto.imagem_url || 'https://via.placeholder.com/300'} 
                            alt={produto.nome}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/300';
                            }}
                          />
                        </a>
                      </Link>
                      <button 
                        onClick={() => handleRemoveFavorite(produto.id)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                        aria-label="Remover dos favoritos"
                      >
                        <XIcon className="h-5 w-5 text-red-500" />
                      </button>
                      
                      {produto.em_promocao && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                          Promoção
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Link href={`/produtos/${produto.id}`}>
                        <a>
                          <h3 className="font-semibold text-lg mb-1 truncate">{produto.nome}</h3>
                        </a>
                      </Link>
                      <p className="text-gray-600 text-sm mb-2 truncate">{produto.descricao}</p>
                      
                      {produto.em_promocao && produto.preco_promocional ? (
                        <div className="flex flex-col mb-4">
                          <span className="text-gray-500 line-through text-sm">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                          <span className="font-bold text-lg text-red-600">
                            R$ {produto.preco_promocional.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <span className="font-bold text-lg">R$ {produto.preco.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddToCart(produto)}
                          disabled={produto.quantidade_disponivel <= 0}
                          className={`flex-1 py-2 rounded flex items-center justify-center ${
                            produto.quantidade_disponivel <= 0 
                              ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <ShoppingCartIcon className="h-5 w-5 mr-1" />
                          {produto.quantidade_disponivel <= 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritosPage; 