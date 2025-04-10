import React from 'react';
import { useCart } from '../context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalItems } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Seu Carrinho</h1>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
          <Link href="/">
            <a className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Continuar Comprando
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Seu Carrinho ({totalItems} items)</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b">
          <div className="grid grid-cols-12 gap-4 font-semibold text-gray-600">
            <div className="col-span-6">Produto</div>
            <div className="col-span-2">Preço</div>
            <div className="col-span-2">Quantidade</div>
            <div className="col-span-2">Total</div>
          </div>
        </div>
        
        {cart.map((item) => (
          <div key={item.id} className="p-4 border-b">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-6">
                <div className="flex items-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 mr-2"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <span className="font-medium">{item.name}</span>
                </div>
              </div>
              <div className="col-span-2">R$ {item.price.toFixed(2)}</div>
              <div className="col-span-2">
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="bg-gray-200 rounded-full p-1"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 rounded-full p-1"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="col-span-2 font-semibold">
                R$ {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
        
        <div className="p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-xl">R$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link href="/">
          <a className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Continuar Comprando
          </a>
        </Link>
        <Link href="/checkout">
          <a className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Finalizar Compra
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CartPage; 