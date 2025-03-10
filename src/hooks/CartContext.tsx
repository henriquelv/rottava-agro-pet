"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BaseCartItem {
  id: string;
  nome: string;
  preco: number;
}

interface ProdutoCartItem extends BaseCartItem {
  imagem: string;
  variante: string;
  quantidade: number;
  tipo: 'produto';
  preco: number;
}

interface AgendamentoCartItem extends BaseCartItem {
  data: string;
  horario: string;
  tipo: 'agendamento';
  preco: number;
}

export type CartItem = ProdutoCartItem | AgendamentoCartItem;

interface CartContextProps {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantidade: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      if (item.tipo === 'produto') {
        const existingItem = prevItems.find(
          (i) => i.tipo === 'produto' && i.id === item.id && (i as ProdutoCartItem).variante === (item as ProdutoCartItem).variante
        );

        if (existingItem) {
          return prevItems.map((i) =>
            i.id === item.id && i.tipo === 'produto'
              ? { ...i, quantidade: (i as ProdutoCartItem).quantidade + item.quantidade }
              : i
          );
        }
      }

      return [...prevItems, item];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantidade: number) => {
    setItems((prevItems) =>
      prevItems.map((i) => (i.id === itemId ? { ...i, quantidade } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export type { AgendamentoCartItem };

export { CartContext }; 