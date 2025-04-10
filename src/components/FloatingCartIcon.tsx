import React from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/outline';

const FloatingCartIcon: React.FC = () => {
  const { totalItems } = useCart();
  const router = useRouter();

  // Não exibir o ícone flutuante na página do carrinho
  if (router.pathname === '/cart') {
    return null;
  }

  const handleClick = () => {
    router.push('/cart');
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300"
      onClick={handleClick}
      aria-label="Ver carrinho"
      role="button"
      tabIndex={0}
    >
      <ShoppingCartIcon className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default FloatingCartIcon; 