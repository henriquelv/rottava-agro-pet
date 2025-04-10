import React from 'react';
import CartPage from '../components/CartPage';
import { CartProvider } from '../context/CartContext';

const Cart = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <CartPage />
      </div>
    </CartProvider>
  );
};

export default Cart; 