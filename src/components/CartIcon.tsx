import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/outline';

const CartIcon: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <div className="relative">
      <ShoppingCartIcon className="h-8 w-8 text-gray-700" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon; 