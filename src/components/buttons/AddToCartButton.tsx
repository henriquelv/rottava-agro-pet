'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Produto {
  codigo: string;
  nome: string;
  preco: number;
  imagem: string;
}

interface AddToCartButtonProps {
  produto: Produto;
  className?: string;
}

export default function AddToCartButton({ produto, className }: AddToCartButtonProps) {
  const [quantidade, setQuantidade] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulação de adição ao carrinho
    setTimeout(() => {
      try {
        // Aqui você adicionaria a lógica real de carrinho
        // Exemplo: dispatch(addToCart({ ...produto, quantidade }));
        
        // Para fins de demonstração:
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Verificar se o produto já está no carrinho
        const existingProductIndex = cart.findIndex((item: any) => item.codigo === produto.codigo);
        
        if (existingProductIndex >= 0) {
          // Atualizar a quantidade se já existir
          cart[existingProductIndex].quantidade += quantidade;
        } else {
          // Adicionar novo item ao carrinho
          cart.push({
            ...produto,
            quantidade
          });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        toast.success('Produto adicionado ao carrinho!');
      } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        toast.error('Erro ao adicionar ao carrinho. Tente novamente.');
      } finally {
        setIsAdding(false);
      }
    }, 600);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="text-gray-700 mr-3">Quantidade:</span>
        <div className="flex items-center border rounded">
          <button 
            onClick={() => setQuantidade(Math.max(1, quantidade - 1))} 
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-l transition-colors"
          >
            -
          </button>
          <span className="px-4 py-1 font-medium">{quantidade}</span>
          <button 
            onClick={() => setQuantidade(quantidade + 1)} 
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-r transition-colors"
          >
            +
          </button>
        </div>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center transition-colors ${isAdding ? 'opacity-70 cursor-not-allowed' : ''} ${className || ''}`}
      >
        {isAdding ? (
          <>
            <div className="h-5 w-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
            Adicionando...
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5 mr-2" />
            Adicionar ao Carrinho
          </>
        )}
      </button>
    </div>
  );
} 